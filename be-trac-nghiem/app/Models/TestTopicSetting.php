<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TestTopicSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'test_id',
        'topic_id',
        'total_questions',
        'easy_count',
        'medium_count',
        'hard_count',
        'is_active',
    ];

    public function test()
    {
        return $this->belongsTo(Test::class);
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}
