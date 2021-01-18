<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobPosting extends Model
{
    protected $fillable = [
        'title',
        'company',
        'salary',
        'description',
        'user_id',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($jobPosting) {
            $jobPosting->user_id = auth()->id();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
