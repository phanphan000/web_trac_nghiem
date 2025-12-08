<?php

namespace App\Http\Controllers;

use App\Models\TestResult;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ResultController extends Controller
{
    public function show($test_id)
    {
        return TestResult::where('test_id', $test_id)->with('user', 'answers')->get();
    }

    public function showForUser($test_id)
    {
        $userId = auth()->id(); // lấy user hiện tại
        return TestResult::where('test_id', $test_id)
            ->where('user_id', $userId)
            ->with('answers')
            ->get();
    }

    // public function leaderboard($test_id)
    // {
    //     $results = TestResult::where('test_id', $test_id)
    //         ->with('user')
    //         ->orderByDesc('score')
    //         // Nếu muốn ưu tiên ai làm nhanh hơn khi điểm bằng nhau:
    //         ->orderByRaw('TIMESTAMPDIFF(SECOND, created_at, COALESCE(submitted_at, updated_at)) ASC')
    //         ->take(5)
    //         ->get();

    //     // Tính duration_used cho FE hiển thị
    //     return $results->map(function ($result) {
    //         $created = Carbon::parse($result->created_at);
    //         $submittedOrUpdated = $result->submitted_at
    //             ? Carbon::parse($result->submitted_at)
    //             : Carbon::parse($result->updated_at);

    //         $result->duration_used = $submittedOrUpdated->diffInSeconds($created);
    //         return $result;
    //     });
    // }


    public function leaderboard($test_id)
    {
        $results = TestResult::where('test_id', $test_id)
            ->with('user')
            ->orderByDesc('score')          // Ưu tiên điểm cao
            ->orderBy('time_spent', 'asc')  // Nếu bằng điểm thì ai làm nhanh hơn đứng trên
            ->take(5)
            ->get();

        // Trả về thêm field duration_used cho FE hiển thị (chính là time_spent)
        return $results->map(function ($result) {
            $result->duration_used = $result->time_spent; // đã lưu sẵn trong DB
            return $result;
        });
    }

}
