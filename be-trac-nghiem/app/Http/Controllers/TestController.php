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
        // Hủy active của tất cả cấu hình trước đó
        TestTopicSetting::where('is_active', true)->update(['is_active' => false]);
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
        Log::info('Submit bắt đầu', [
            'test_id' => $id,
            'user_id' => $request->user()->id,
            'payload' => $request->all()
        ]);

        $test = Test::findOrFail($id);
        $userId = $request->user()->id;

        $score = 0;
        $answers = $request->answers ?? [];

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
            ]);
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

        // Update điểm và thời điểm nộp
        $result->update([
            'score' => $score,
            'submitted_at' => now(),
        ]);

        return response()->json($result->load('answers'), 201);
    }


}
