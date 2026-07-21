<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController extends Controller
{
    // Menampilkan halaman "Produk Saya"
    public function index(Request $request)
    {
        // Ambil produk yang HANYA dimiliki oleh UMKM yang sedang login
        $produkList = Product::where('user_id', $request->user()->id)->latest()->get();

        return Inertia::render('umkm/ProdukSaya', [
            'produkList' => $produkList
        ]);
    }

    // Memproses penyimpanan produk baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'kategori'    => 'required|string',
            'harga'       => 'required|numeric|min:0',
            'deskripsi'   => 'nullable|string',
            'foto'        => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Maksimal 2MB
        ]);

        $fotoPath = null;

        // Jika UMKM mengunggah foto, simpan ke folder public/uploads/produk
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');
            $namaFoto = time() . '_' . $foto->getClientOriginalName();
            $foto->move(public_path('uploads/produk'), $namaFoto);
            $fotoPath = 'uploads/produk/' . $namaFoto;
        }

        // Simpan data produk ke database
        Product::create([
            'user_id'     => $request->user()->id, // Kunci produk ke akun UMKM ini
            'nama_produk' => $request->nama_produk,
            'deskripsi'   => $request->deskripsi,
            'harga'       => $request->harga,
            'kategori'    => $request->kategori,
            'foto'        => $fotoPath,
        ]);

        return redirect()->back(); // Kembali ke halaman tanpa error
    }
}