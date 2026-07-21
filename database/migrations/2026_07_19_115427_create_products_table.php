<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            
            // Relasi ke tabel users (siapa pemilik produk ini)
            // cascadeOnDelete() artinya jika akun UMKM dihapus, produknya ikut terhapus
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            
            // Informasi Produk
            $table->string('nama_produk');
            $table->text('deskripsi')->nullable();
            $table->decimal('harga', 12, 2); // Format harga misal: 9999999999.99
            
            // Kategori dan Status
            $table->string('kategori')->default('Lainnya');
            $table->string('foto')->nullable(); // Untuk menyimpan nama file gambar
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};