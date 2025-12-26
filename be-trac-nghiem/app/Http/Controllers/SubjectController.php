<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Test;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    // Lấy danh sách tất cả môn học
    public function index()
    {
        return Subject::all();
    }

    // (Tuỳ chọn) Tạo môn học mới
    public function store(Request $request)
    {
        $subject = Subject::create($request->only(['name', 'description']));
        return response()->json($subject, 201);
    }

    public function activeTests()
    {
        $subjects = Subject::all();

        $result = $subjects->map(function ($subject) {
            $test = Test::where('subject_id', $subject->id)
                ->latest()
                ->first();
            return [
                'id' => $subject->id,
                'name' => $subject->name,
                'test_id' => $test ? $test->id : null,
                'type' => 'subject'
            ];
        })->toArray();

        // Thêm môn tổng hợp
        $combinedTest = Test::whereNull('subject_id') // hoặc dùng 1 cách xác định khác
            ->latest()
            ->first();
        $result[] = [
            'id' => null,
            'name' => 'Tổng hợp',
            'test_id' => $combinedTest ? $combinedTest->id : null,
            'type' => 'combined'
        ];

        return response()->json($result);
    }
}
