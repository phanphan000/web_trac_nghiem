<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Test extends Model
{
    use HasFactory;

    protected $fillable = ['subject_id', 'title', 'duration', 'created_by', 'class_id'];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function settings()
    {
        return $this->hasMany(TestTopicSetting::class);
    }

    public function questions()
    {
        return $this->hasMany(TestQuestion::class, 'test_id');
    }

    public function results()
    {
        return $this->hasMany(TestResult::class);
    }
}
