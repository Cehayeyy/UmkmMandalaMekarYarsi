<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController extends Controller
{
    // 1. Menampilkan Form Tambah Produk (Murni hanya render Form)
    public function index()
    {
        return Inertia::render('umkm/ProdukSaya');
    }

    // 2. Menampilkan Halaman Daftar Produk Saya (Mengambil data dari DB)
    public function daftar(Request $request)
    {
        // Ambil data produk terbaru khusus UMKM yang sedang login
        $produkList = Product::where('user_id', $request->user()->id)->latest()->get();

        return Inertia::render('umkm/DaftarProdukSaya', [
            'produkList' => $produkList
        ]);
    }

    // 3. Memproses Simpan Produk Baru
    public function store(Request $request)
    {
        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'kategori'    => 'required|string',
            'harga'       => 'required|numeric|min:0',
            'deskripsi'   => 'nullable|string',
            'foto'        => 'nullable|image|mimes:jpeg,png,jpg,webp,jfif|max:2048',
        ]);

        $fotoPath = null;
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');
            $namaFoto = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $foto->getClientOriginalName());
            $foto->move(public_path('uploads/produk'), $namaFoto);
            $fotoPath = 'uploads/produk/' . $namaFoto;
        }

        Product::create([
            'user_id'     => $request->user()->id,
            'nama_produk' => $request->nama_produk,
            'deskripsi'   => $request->deskripsi,
            'harga'       => $request->harga,
            'kategori'    => $request->kategori,
            'foto'        => $fotoPath,
        ]);

        // Redirect langsung ke route Daftar Produk Saya
        return redirect()->route('umkm.produk.daftar')->with('success', 'Produk berhasil ditambahkan!');

    }
    // 🛠️ TAMBAHKAN DUA METHOD INI DI PRODUKCONTROLLER:

// Update data produk
public function update(Request $request, Product $product)
{
    // Cek agar user lain tidak bisa mengubah produk milik toko orang lain
    if ($product->user_id !== $request->user()->id) {
        abort(403);
    }

    $request->validate([
        'nama_produk' => 'required|string|max:255',
        'kategori'    => 'required|string',
        'harga'       => 'required|numeric|min:0',
        'deskripsi'   => 'nullable|string',
        'foto'        => 'nullable|image|mimes:jpeg,png,jpg,webp,jfif|max:2048',
    ]);

    $fotoPath = $product->foto; // Pertahankan foto lama jika tidak diganti

    if ($request->hasFile('foto')) {
        // Hapus foto lama jika ada di server
        if ($product->foto && file_exists(public_path($product->foto))) {
            unlink(public_path($product->foto));
        }

        $foto = $request->file('foto');
        $namaFoto = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', $foto->getClientOriginalName());
        $foto->move(public_path('uploads/produk'), $namaFoto);
        $fotoPath = 'uploads/produk/' . $namaFoto;
    }

    $product->update([
        'nama_produk' => $request->nama_produk,
        'deskripsi'   => $request->deskripsi,
        'harga'       => $request->harga,
        'kategori'    => $request->kategori,
        'foto'        => $fotoPath,
    ]);

    return redirect()->back();
}

// Hapus produk
public function destroy(Request $request, Product $product)
{
    // Cek otorisasi milik UMKM sendiri
    if ($product->user_id !== $request->user()->id) {
        abort(403);
    }

    // Hapus file foto produk dari folder server jika ada
    if ($product->foto && file_exists(public_path($product->foto))) {
        unlink(public_path($product->foto));
    }

    $product->delete();

    return redirect()->back();
}
}
