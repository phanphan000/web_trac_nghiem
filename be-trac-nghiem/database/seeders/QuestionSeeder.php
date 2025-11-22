<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        // Lấy tất cả topic_id và subject_id từ bảng topics
        $topics = DB::table('topics')->get();

        foreach ($topics as $topic) {
            for ($i = 0; $i < 50; $i++) {
                $difficulty = $faker->randomElement(['easy', 'medium', 'hard']);
                $correctAnswer = $faker->randomElement(['A', 'B', 'C', 'D']);

                DB::table('questions')->insert([
                    'topic_id' => $topic->id,
                    'subject_id' => $topic->subject_id, // giả sử bảng topics có subject_id
                    'question_text' => $faker->sentence(12),
                    'option_a' => $faker->sentence(4),
                    'option_b' => $faker->sentence(4),
                    'option_c' => $faker->sentence(4),
                    'option_d' => $faker->sentence(4),
                    'correct_answer' => $correctAnswer,
                    'difficulty' => $difficulty,
                    'source' => $faker->randomElement(['manual', 'ai']),
                    'question_type' => 'text',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
