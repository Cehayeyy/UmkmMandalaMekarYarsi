<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisitorActivity extends Model
{
    public $timestamps = false;

    protected $guarded = ['id'];

    protected $casts = ['first_seen_at' => 'datetime', 'last_seen_at' => 'datetime'];
}
