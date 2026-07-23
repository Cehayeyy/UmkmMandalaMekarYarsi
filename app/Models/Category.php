<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Relasi: 1 Kategori bisa memiliki banyak Produk
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
