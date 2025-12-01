<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestSeeder extends Seeder
{
    public function run(): void
    {
        $subjectId = 1; // môn mặc định
        $testId = DB::table('tests')->insertGetId([
            'title' => 'Đề mặc định',
            'duration' => 45,
            'subject_id' => $subjectId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Lấy tất cả topic của môn này
        $topics = DB::table('topics')
            ->where('subject_id', $subjectId)
            ->pluck('id')
            ->toArray();

        $totalQuestions = 30;
        $topicCount = count($topics);

        // Phân bổ đều số câu cho mỗi topic
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
