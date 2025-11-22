<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TestAnswer extends Model
{
    use HasFactory;

    protected $fillable = ['test_result_id', 'question_id', 'selected_answer', 'is_correct'];

    public function result()
    {
        return $this->belongsTo(TestResult::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
