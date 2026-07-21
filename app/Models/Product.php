<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Kolom-kolom yang diizinkan untuk diisi secara massal (Mass Assignment)
    protected $fillable = [
        'user_id', 
        'nama_produk', 
        'deskripsi', 
        'harga', 
        'kategori', 
        'foto'
    ];

    // Relasi: 1 Produk dimiliki oleh 1 User (UMKM)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}