<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UmkmController extends Controller
{
    // Menampilkan halaman Edit Profil Toko
    public function edit(Request $request)
    {
        return Inertia::render('umkm/ProfilToko', [
            // Kirim data user yang SEDANG LOGIN ke React
            'user' => $request->user(),
        ]);
    }

    // Memproses perubahan data Toko
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            // Jika nanti ada kolom deskripsi toko, no hp, dll, tambahkan validasinya di sini
        ]);

        // Kunci UTAMA: Update data HANYA milik user yang sedang login
        $request->user()->update([
            'name' => $request->name,
            // 'deskripsi' => $request->deskripsi, (contoh jika ada kolom lain)
        ]);

        return redirect()->back(); // Kembali ke halaman sebelumnya tanpa error
    }
}