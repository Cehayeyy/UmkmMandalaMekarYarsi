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
        $fotoPath = $user->foto_toko; 

        if ($request->hasFile('foto_toko')) {
            
            // Hapus foto lama jika ada di public_html
            if ($fotoPath && file_exists('/home/manb5952/public_html/' . $fotoPath)) {
                @unlink('/home/manb5952/public_html/' . $fotoPath);
            }

            $file = $request->file('foto_toko');
            $filename = time() . '_' . preg_replace('/\s+/', '_', $file->getClientOriginalName());
            
            // Simpan langsung secara absolut ke folder public_html/uploads/
            $destinationPath = '/home/manb5952/public_html/uploads';
            
            // Pastikan folder tujuan ada
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
            
            $file->move($destinationPath, $filename);
            
            // Path yang disimpan ke database
            $fotoPath = 'uploads/' . $filename;
        }

        $user->update([
            'name' => $request->name,
            'deskripsi_toko' => $request->deskripsi_toko,
            'no_whatsapp' => $request->no_whatsapp,
            'alamat_toko' => $request->alamat_toko,
            'foto_toko' => $fotoPath,
        ]);

        return redirect()->back()->with('success', 'Profil berhasil diperbarui!');
    }
}