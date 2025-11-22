<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    // Lấy danh sách topic theo subject
    public function bySubject($id)
    {
        return Topic::where('subject_id', $id)->get();
    }

    // (Tuỳ chọn) Tạo topic mới
    public function store(Request $request)
    {
        $topic = Topic::create($request->only(['subject_id', 'name', 'description']));
        return response()->json($topic, 201);
    }
}
