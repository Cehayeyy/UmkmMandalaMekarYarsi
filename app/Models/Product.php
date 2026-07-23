<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Mengizinkan semua kolom diisi (atau sesuaikan dengan $fillable milikmu)
    protected $guarded = ['id'];

    /**
     * Relasi ke pemilik produk (User / UMKM)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function category()
{
    return $this->belongsTo(Category::class);
}
}
