<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Subject;
use App\Models\Topic;

class TestSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = Subject::with('topics')->get();
        foreach ($subjects as $subject) {

            $topics = $subject->topics->pluck('id')->toArray();
            $topicCount = count($topics);

            if ($topicCount === 0) {
                continue;
            }

            if (
                DB::table('tests')
                    ->where('subject_id', $subject->id)
                    ->exists()
            ) {
                continue;
            }

            $totalQuestions = 30;

            $testId = DB::table('tests')->insertGetId([
                'title' => 'Đề mặc định cho môn ' . $subject->name,
                'duration' => 45,
                'subject_id' => $subject->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $perTopic = intdiv($totalQuestions, $topicCount);
            $remaining = $totalQuestions % $topicCount;

            foreach ($topics as $index => $topicId) {
                $count = $perTopic + ($index < $remaining ? 1 : 0);

                DB::table('test_topic_settings')->insert([
                    'test_id' => $testId,
                    'topic_id' => $topicId,
                    'total_questions' => $count,
                    'easy_count' => floor($count / 3),
                    'hard_count' => floor($count / 3),
                    'medium_count' => $count - 2 * floor($count / 3),
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
        //                  TẠO ĐỀ TỔNG HỢP
//              ======================

        // Lấy topic của 3 môn
        $topics = Topic::whereHas('subject', function ($q) {
            $q->whereIn('name', ['Toán', 'Tin học', 'Science']);
        })->pluck('id')->toArray();

        if (count($topics) === 0) {
            return;
        }

        // Tránh seed trùng
        $exists = DB::table('tests')
            ->where('title', 'Đề tổng hợp')
            ->exists();

        if ($exists) {
            return;
        }

        // Tạo test tổng hợp
        $testId = DB::table('tests')->insertGetId([
            'title' => 'Đề tổng hợp',
            'duration' => 45,
            'subject_id' => null, // RẤT QUAN TRỌNG
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $totalQuestions = 30;
        $topicCount = count($topics);

        $perTopic = intdiv($totalQuestions, $topicCount);
        $remaining = $totalQuestions % $topicCount;

        foreach ($topics as $index => $topicId) {
            $count = $perTopic + ($index < $remaining ? 1 : 0);

            DB::table('test_topic_settings')->insert([
                'test_id' => $testId,
                'topic_id' => $topicId,
                'total_questions' => $count,
                'easy_count' => floor($count / 3),
                'hard_count' => floor($count / 3),
                'medium_count' => $count - 2 * floor($count / 3),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

}
