import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    FolderPlus,
    Search,
    Edit2,
    Trash2,
    Folder,
    Layers
} from 'lucide-react';

export default function KategoriProduk() {
    const [searchQuery, setSearchQuery] = useState('');

    // Dummy data untuk contoh tampilan kategori produk Desa Mandalamekar
    const [kategoriList] = useState([
        { id: 1, nama: 'Olahan Fermentasi', slug: 'olahan-fermentasi', jumlah_produk: 8 },
        { id: 2, nama: 'Anyaman Bambu', slug: 'anyaman-bambu', jumlah_produk: 12 },
        { id: 3, nama: 'Kerajinan Tangan', slug: 'kerajinan-tangan', jumlah_produk: 5 },
        { id: 4, nama: 'Komoditas Pertanian', slug: 'komoditas-pertanian', jumlah_produk: 14 },
    ]);

    // Filter data berdasarkan input pencarian
    const filteredKategori = kategoriList.filter(item =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto font-sans text-slate-900">
            <Head title="Kategori Produk - Admin Mandalamekar" />

            {/* HEADER HALAMAN */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">Kategori Produk</h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Kelola kelompok kategori untuk mempermudah pemetaan produk unggulan UMKM desa.
                    </p>
                </div>
                <div>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition">
                        <FolderPlus className="size-4" />
                        <span>Tambah Kategori</span>
                    </button>
                </div>
            </div>

            {/* AREA UTAMA / KARTU KONTEN */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm shadow-slate-100/50 overflow-hidden">

                {/* TOOLBAR: JUDUL DAFTAR & SEARCH BAR */}
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <Layers className="size-4" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm">Daftar Kategori Produk</h3>
                    </div>

                    {/* Input Pencarian Kategori */}
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama kategori..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-2 text-xs focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                        />
                    </div>
                </div>

                {/* TABEL DATA KATEGORI */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/40 text-xs font-semibold text-slate-500 tracking-wider">
                                <th className="px-6 py-4">Nama Kategori</th>
                                <th className="px-6 py-4">Slug URL</th>
                                <th className="px-6 py-4">Total Produk</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredKategori.length > 0 ? (
                                filteredKategori.map((kategori) => (
                                    <tr key={kategori.id} className="hover:bg-slate-50/50 transition">
                                        {/* Nama Kategori */}
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                                    <Folder className="size-4" />
                                                </div>
                                                <span>{kategori.nama}</span>
                                            </div>
                                        </td>
                                        {/* Slug */}
                                        <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                            {kategori.slug}
                                        </td>
                                        {/* Jumlah Produk */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                                                {kategori.jumlah_produk} Produk
                                            </span>
                                        </td>
                                        {/* Tombol Aksi */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    title="Ubah Kategori"
                                                    className="flex size-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition"
                                                >
                                                    <Edit2 className="size-3.5" />
                                                </button>
                                                <button
                                                    title="Hapus Kategori"
                                                    className="flex size-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:border-rose-500 hover:bg-rose-50 hover:text-rose-600 transition"
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-xs text-slate-400">
                                        Tidak ada kategori produk yang cocok dengan pencarian Anda.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
