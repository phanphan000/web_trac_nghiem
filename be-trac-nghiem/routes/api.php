<?php

use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TopicController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::get('/me', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::get('/tests/{id}', [TestController::class, 'show']);   // chi tiết bài test
Route::get('/tests/latest', [TestController::class, 'latest']); // chi tiết bài test mới nhất
Route::middleware(['auth:sanctum', 'throttle:30,1'])->group(function () {
    // Test
    Route::get('/tests', [TestController::class, 'index']);       // danh sách bài test
    Route::post('/tests', [TestController::class, 'store']);      // tạo bài test (admin/teacher)
    Route::post('/tests/{id}/submit', [TestController::class, 'submit']); // học sinh nộp bài
    Route::get('/tests/start/{subject_id}', [TestController::class, 'start']);
    Route::get('/tests/start', [TestController::class, 'start']);


    // Question
    Route::get('/questions', [QuestionController::class, 'index']);
    Route::post('/questions', [QuestionController::class, 'store']);

    // Result
    Route::get('/results/me', [ResultController::class, 'showAllForUser']);
    Route::get('/results/{test_id}', [ResultController::class, 'show']);
    Route::get('/results/subject/{subject_id}/leaderboard', [ResultController::class, 'leaderboardBySubject']);
    Route::get('/results/test/{test_id}/leaderboard', [ResultController::class, 'leaderboardByTest']);


    // Subject
    Route::get('/subjects', [SubjectController::class, 'index']);
    Route::get('/subjects/active-tests', [SubjectController::class, 'activeTests']);

    // Topic
    Route::get('/subjects/{id}/topics', [TopicController::class, 'bySubject']);

    //Generate quiz
    Route::post('/generate-quiz', [QuizController::class, 'generateQuiz']);
});