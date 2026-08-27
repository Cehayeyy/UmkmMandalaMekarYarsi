<?php

namespace App\Http\Controllers;

use App\Models\PesanKontak;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KontakController extends Controller
{
    /**
     * Menampilkan daftar pesan di Dashboard Admin
     */
    public function indexAdmin()
    {
        // Ambil semua pesan dari database, urutkan dari yang paling baru
        $pesanMasuk = PesanKontak::latest()->get(); 
        
        // Render ke file resources/js/Pages/admin/KontakAdmin.tsx
        return Inertia::render('admin/KontakAdmin', [
            'pesanMasuk' => $pesanMasuk
        ]);
    }

    /**
     * Menyimpan data pesan baru dari form publik (kontak.tsx)
     */
    public function store(Request $request)
    {
        // Validasi data yang masuk
        $request->validate([
            'nama'   => 'required|string|max:255',
            'email'  => 'required|email|max:255',
            'nohp'   => 'required|string|max:20',
            'subjek' => 'required|string|max:255',
            'pesan'  => 'required|string',
        ]);

        // Simpan data ke database
        PesanKontak::create($request->all());

        // Kembalikan ke halaman form dengan pesan sukses
        return redirect()->back()->with('success', 'Pesan Anda berhasil dikirim!');
    }
}