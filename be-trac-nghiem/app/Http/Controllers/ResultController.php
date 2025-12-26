<?php

namespace App\Http\Controllers;

use App\Models\TestResult;
use App\Models\Test;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ResultController extends Controller
{
    public function show($test_id)
    {
        return TestResult::where('test_id', $test_id)->with('user', 'answers')->get();
    }

    public function showAllForUser()
    {
        $userId = auth()->id();
        return TestResult::where('user_id', $userId)->with('answers')->get();
    }

    private function buildLeaderboard(Test $test) // Top 70% điểm vào bảng xếp hạng
    {
        $minScore = ceil($test->max_score * 0.1);

        $results = TestResult::where('test_id', $test->id)
            ->where('score', '>=', $minScore)   //  lọc ≥ 70%
            ->with('user')
            ->orderByDesc('score')
            ->orderBy('time_spent', 'asc')
            ->take(5)
            ->get();

        return $results->map(function ($result) {
            $result->duration_used = $result->time_spent;
            return $result;
        });
    }


    public function leaderboardBySubject($subject_id)
    {
        // Lấy test mới nhất của môn này
        $test = Test::where('subject_id', $subject_id)
            ->latest()
            ->firstOrFail();

        return $this->buildLeaderboard($test);
    }


    public function leaderboardByTest($testId)
    {
        $test = Test::findOrFail($testId);

        return $this->buildLeaderboard($test);
    }


}
