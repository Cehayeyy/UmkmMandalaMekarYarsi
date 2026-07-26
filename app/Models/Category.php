<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $guarded = [];

    public function products(): HasMany
    {
        // Replace 'kategori_id' with whatever column name connects products to categories in your database
        return $this->hasMany(Product::class, 'kategori_id');
    }
}
