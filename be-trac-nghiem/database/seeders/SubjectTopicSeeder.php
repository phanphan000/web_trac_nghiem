<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subject;
use App\Models\Topic;

class SubjectTopicSeeder extends Seeder
{
    public function run()
    {
        // Danh sách môn học và chủ đề riêng
        $data = [
            'Toán' => [
                'numbers',
                'operations',
                'geometry',
                'data',
                'measurement',
                'logical'
            ],
            'Tin học' => [
                'Máy tính và em',
                'Đạo đức, pháp luật trong môi trường số',
                'Lưu trữ, tìm kiếm thông tin',
                'Ứng dụng tin học',
                'Lập trình Scratch',
                'Lập trình Swift PlayGround'
            ],
            'Science' => [
                'living',
                'human',
                'matter',
                'forces',
                'earth',
                'environment'
            ],
        ];

        foreach ($data as $subjectName => $topics) {
            // Tạo subject
            $subject = Subject::create([
                'name' => $subjectName,
                'description' => 'Môn ' . $subjectName,
            ]);

            // Tạo các topic cho subject
            foreach ($topics as $topicName) {
                Topic::create([
                    'subject_id' => $subject->id,
                    'name' => $topicName,
                    'description' => 'Chủ đề ' . $topicName . ' của môn ' . $subjectName,
                ]);
            }
        }
    }
}
