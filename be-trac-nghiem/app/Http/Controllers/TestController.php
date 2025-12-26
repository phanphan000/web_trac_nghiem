<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\TestTopicSetting;
use App\Models\Question;
use App\Models\TestAnswer;
use App\Models\TestResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class TestController extends Controller
{
    public function index()
    {
        return Test::with('subject', 'settings')->get();
    }

    public function latest()
    {
        $test = Test::with([
            'subject',
            'settings' => function ($q) {
                $q->where('is_active', true);
            }
        ])->latest()->firstOrFail();

        $finalQuestions = collect();

        foreach ($test->settings as $setting) {
            $easyCount = $setting->easy_count;
            $mediumCount = $setting->medium_count;
            $hardCount = $setting->hard_count;

            $easyQuestions = Question::where('topic_id', $setting->topic_id)
                ->where('difficulty', 'easy')
                ->inRandomOrder()
                ->limit($easyCount)
                ->get(['id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer', 'difficulty']);

            $mediumQuestions = Question::where('topic_id', $setting->topic_id)
                ->where('difficulty', 'medium')
                ->inRandomOrder()
                ->limit($mediumCount)
                ->get(['id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer', 'difficulty']);

            $hardQuestions = Question::where('topic_id', $setting->topic_id)
                ->where('difficulty', 'hard')
                ->inRandomOrder()
                ->limit($hardCount)
                ->get(['id', 'question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer', 'difficulty']);

            $finalQuestions = $finalQuestions
                ->merge($easyQuestions)
                ->merge($mediumQuestions)
                ->merge($hardQuestions);
        }

        return response()->json([
            'test' => $test,
            'questions' => $finalQuestions
        ]);
    }


    public function store(Request $request)
    {
        // Hủy active của tất cả cấu hình trước đó nhưng chỉ trong cùng môn
        TestTopicSetting::whereHas('test', function ($q) use ($request) {
            $q->where('subject_id', $request->subject_id);
        })->update(['is_active' => false]);

        // $test = Test::create($request->only(['subject_id', 'title', 'duration', 'created_by', 'class_id']));
        $test = Test::create([
            'subject_id' => $request->subject_id,
            'title' => $request->title,
            'duration' => $request->duration,
            // 'class_id' => $request->class_id,
            'created_by' => auth()->id(), // luôn lấy user hiện tại
        ]);
        foreach ($request->settings as $setting) {
            TestTopicSetting::create([
                'test_id' => $test->id,
                'topic_id' => $setting['topic_id'],
                'total_questions' => $setting['total_questions'],
                'easy_count' => $setting['easy_count'],
                'medium_count' => $setting['medium_count'],
                'hard_count' => $setting['hard_count'],
                'is_active' => true, // cấu hình mới sẽ là active
            ]);
        }

        return response()->json($test->load('settings'), 201);
    }

    public function show($id)
    {
        $test = Test::with([
            'subject',
            'settings' => function ($q) {
                $q->where('is_active', true);
            }
        ])->findOrFail($id);
        $finalQuestions = collect();

        foreach ($test->settings as $setting) {
            $easyCount = $setting->easy_count;
            $mediumCount = $setting->medium_count;
            $hardCount = $setting->hard_count;

            $easyQuestions = Question::where('topic_id', $setting->topic_id)
                ->where('difficulty', 'easy')
                ->inRandomOrder()
                ->limit($easyCount)
                ->get();

            $mediumQuestions = Question::where('topic_id', $setting->topic_id)
                ->where('difficulty', 'medium')
                ->inRandomOrder()
                ->limit($mediumCount)
                ->get();

            $hardQuestions = Question::where('topic_id', $setting->topic_id)
                ->where('difficulty', 'hard')
                ->inRandomOrder()
                ->limit($hardCount)
                ->get();

            $finalQuestions = $finalQuestions
                ->merge($easyQuestions)
                ->merge($mediumQuestions)
                ->merge($hardQuestions);
        }

        return response()->json([
            'test' => $test,
            'questions' => $finalQuestions
        ]);
    }



    public function submit(Request $request, $id)
    {
        $test = Test::findOrFail($id);
        $userId = $request->user()->id;

        $score = 0;
        $answers = $request->answers ?? [];
        $timeSpent = $request->time_spent ?? null;

        // Tìm record đã tạo khi bắt đầu test
        $result = TestResult::where('test_id', $test->id)
            ->where('user_id', $userId)
            ->first();

        if (!$result) {
            // fallback: nếu chưa có thì tạo mới
            $result = TestResult::create([
                'test_id' => $test->id,
                'user_id' => $userId,
                'score' => 0,
                'created_at' => now(), // thời điểm bắt đầu
                'time_spent' => $timeSpent,
            ]);
        }

        $validQuestionIds = Question::whereIn('id', collect($answers)->pluck('question_id'))
            ->pluck('id')
            ->toArray();

        // Nếu có question_id không tồn tại hoặc không thuộc subject của test → reject
        foreach ($answers as $ans) {
            if (!in_array($ans['question_id'], $validQuestionIds)) {
                return response()->json([
                    'error' => 'Invalid question submitted'
                ], 422);
            }
        }

        foreach ($answers as $ans) {
            $isCorrect = Question::find($ans['question_id'])->correct_answer === $ans['selected_answer'];
            if ($isCorrect)
                $score++;

            TestAnswer::create([
                'test_result_id' => $result->id,
                'question_id' => $ans['question_id'],
                'selected_answer' => $ans['selected_answer'],
                'is_correct' => $isCorrect,
            ]);
        }

        // Update điểm 
        if ($score > $result->score) {
            $result->update([
                'score' => $score,
                'submitted_at' => now(),
                'time_spent' => $timeSpent,
            ]);
        }

        return response()->json($result->load('answers'), 201);
    }


    public function start(Request $request)
    {
        $request->validate([
            'subject_id' => 'nullable|exists:subjects,id',
            'mode' => 'nullable|in:combined',
        ]);

        if (!$request->subject_id && !$request->mode) {
            abort(400, 'subject_id or mode is required');
        }

        if ($request->subject_id && $request->mode) {
            abort(400, 'Only one of subject_id or mode is allowed');
        }

        // 1️⃣ Xác định test
        if ($request->mode === 'combined') {
            $test = Test::with('settings')
                ->whereNull('subject_id')
                ->latest()
                ->firstOrFail();
        } else {
            $test = Test::with([
                'settings' => fn($q) => $q->where('is_active', true)
            ])
                ->where('subject_id', $request->subject_id)
                ->latest()
                ->firstOrFail();
        }

        // 2️⃣ Sinh câu hỏi (DÙNG CHUNG)
        $finalQuestions = collect();

        foreach ($test->settings as $setting) {
            foreach (['easy', 'medium', 'hard'] as $level) {
                $count = $setting->{$level . '_count'};
                if ($count > 0) {
                    $finalQuestions = $finalQuestions->merge(
                        Question::where('topic_id', $setting->topic_id)
                            ->where('difficulty', $level)
                            ->inRandomOrder()
                            ->limit($count)
                            ->get()
                    );
                }
            }
        }

        return response()->json([
            'test' => $test,
            'questions' => $finalQuestions
        ]);
    }




}
