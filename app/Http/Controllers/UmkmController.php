<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File; // 🛠️ Tambahkan import ini untuk menghapus file lama

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
                'no_whatsapp' => $request->user()->no_whatsapp,
                'alamat_toko' => $request->user()->alamat_toko,
            ]
        ]);
    }

    // Memproses update data dan foto
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'deskripsi_toko' => 'nullable|string',
            'no_whatsapp' => 'nullable|string|max:20',
            'foto_toko' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'alamat_toko' => 'nullable|string|max:255',
        ]);

        $user = \App\Models\User::findOrFail(auth()->id());
        $fotoPath = $user->foto_toko; // Simpan rute foto lama sebagai default

        // 🛠️ LOGIKA UPLOAD FOTO YANG BENAR
        if ($request->hasFile('foto_toko')) {
            
            // 1. Hapus foto lama dari folder jika ada (menghemat ruang penyimpanan)
            if ($fotoPath && File::exists(public_path($fotoPath))) {
                File::delete(public_path($fotoPath));
            }

            // 2. Ambil file yang baru diunggah
            $file = $request->file('foto_toko');
            
            // 3. Buat nama file unik agar tidak bentrok (Waktu saat ini + Nama asli file)
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            
            // 4. Pindahkan file tersebut ke folder public/uploads/toko/
            $file->move(public_path('uploads/toko'), $filename);
            
            // 5. Perbarui variabel $fotoPath untuk disimpan ke dalam database
            $fotoPath = 'uploads/toko/' . $filename;
        }

        $user->update([
            'name' => $request->name,
            'deskripsi_toko' => $request->deskripsi_toko,
            'no_whatsapp' => $request->no_whatsapp,
            'alamat_toko' => $request->alamat_toko,
            'foto_toko' => $fotoPath, // 🛠️ Simpan rute foto ke tabel users
        ]);

        return redirect()->back()->with('success', 'Profil berhasil diperbarui!');
    }
}