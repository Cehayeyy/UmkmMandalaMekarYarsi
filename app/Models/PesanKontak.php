<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PesanKontak extends Model
{
    use HasFactory;
    
    // BARIS INI WAJIB ADA AGAR DATA BISA DISIMPAN
    protected $fillable = ['nama', 'email', 'nohp', 'subjek', 'pesan'];
}