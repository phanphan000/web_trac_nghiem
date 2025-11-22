<?php

namespace App\Http\Controllers;

use App\Models\Subject;
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
}
