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
        Schema::table('users', function (Blueprint $table) {
            // Menambahkan kolom foto_toko (untuk banner) dan deskripsi_toko
            $table->string('foto_toko')->nullable()->after('role');
            $table->text('deskripsi_toko')->nullable()->after('foto_toko');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['foto_toko', 'deskripsi_toko']);
        });
    }
};