<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UmkmController extends Controller
{
    // Menampilkan halaman Edit Profil Toko
    public function edit(Request $request)
    {
        return Inertia::render('umkm/ProfilToko', [
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'username' => $request->user()->username,
                'foto_toko' => $request->user()->foto_toko,
                'deskripsi_toko' => $request->user()->deskripsi_toko,
                'no_whatsapp' => $request->user()->no_whatsapp, // 🛠️ Tambahkan ini
            ]
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'deskripsi_toko' => 'nullable|string',
            'no_whatsapp' => 'nullable|string|max:20', // 🛠️ Tambahkan validasi ini
            'foto_toko' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
        ]);

        $user = \App\Models\User::findOrFail(auth()->id());
        $fotoPath = $user->foto_toko;

        if ($request->hasFile('foto_toko')) {
            // ... (Kode upload foto biarkan sama seperti sebelumnya) ...
        }

        $user->update([
            'name' => $request->name,
            'deskripsi_toko' => $request->deskripsi_toko,
            'no_whatsapp' => $request->no_whatsapp, // 🛠️ Simpan datanya
            'foto_toko' => $fotoPath,
        ]);

        return redirect()->back()->with('success', 'Profil berhasil diperbarui!');
    }
}