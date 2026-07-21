import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    LogOut,
    Package,
    Store,
    Tag,
    ShoppingBag,
    Search,
    Edit2,
    Trash2,
    X,
    AlertTriangle
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Product {
    id: number;
    user_id: number;
    nama_produk: string;
    harga: number;
    kategori: string;
    deskripsi?: string;
    foto: string | null;
}

export default function DaftarProdukSaya({ produkList = [] }: Readonly<{ produkList?: Product[] }>) {
    const { auth } = usePage<SharedData>().props;
    const [searchQuery, setSearchQuery] = useState('');

    // State untuk Modal Edit
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // State untuk Modal Pop-up Hapus
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

    // Form Inertia untuk Edit Produk (Termasuk Deskripsi)
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        nama_produk: '',
        kategori: '',
        harga: '',
        deskripsi: '', // 🛠️ Ditambahkan field deskripsi
        foto: null as File | null,
    });

    // 🛠️ FUNGSI BUKA MODAL EDIT (Isi deskripsi produk)
    const handleEdit = (product: Product, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setEditingProduct(product);
        setData({
            _method: 'PUT',
            nama_produk: product.nama_produk,
            kategori: product.kategori,
            harga: Math.floor(Number(product.harga)).toString(),
            deskripsi: product.deskripsi || '', // 🛠️ Bind deskripsi lama
            foto: null,
        });
    };

    // FUNGSI TRIGGER MODAL HAPUS
    const handleDeleteClick = (product: Product, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setDeletingProduct(product);
    };

    // FUNGSI SUBMIT UPDATE PRODUK
    const handleUpdateSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!editingProduct) return;

        post(route('umkm.produk.update', editingProduct.id), {
            forceFormData: true,
            onSuccess: () => {
                setEditingProduct(null);
                reset();
            },
        });
    };

    // FUNGSI KONFIRMASI HAPUS PRODUK
    const confirmDelete = () => {
        if (!deletingProduct) return;

        router.delete(route('umkm.produk.destroy', deletingProduct.id), {
            onSuccess: () => {
                setDeletingProduct(null);
            },
        });
    };

    // Filter produk berdasarkan pencarian
    const filteredProduk = (produkList || []).filter((item) =>
        item.nama_produk?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kategori?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Daftar Produk Saya" />
            <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">

                {/* SIDEBAR PANEL TOKO */}
                <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100">
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shrink-0">
                            <Store className="size-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Panel Toko</p>
                            <p className="text-base font-bold leading-tight text-white truncate">{auth.user?.name}</p>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        <Link
                            href={route('umkm.dashboard')}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <LayoutDashboard className="size-4" />
                            <span>Dashboard Toko</span>
                        </Link>

                        <Link
                            href={route('umkm.produk.index')}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <Package className="size-4" />
                            <span>Produk Saya</span>
                        </Link>

                        <Link
                            href={route('umkm.produk.daftar')}
                            className="flex w-full items-center gap-3 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/40"
                        >
                            <ShoppingBag className="size-4" />
                            <span>Daftar Produk Saya</span>
                        </Link>

                        <Link
                            href={route('umkm.profil.edit')}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <Tag className="size-4" />
                            <span>Profil Toko</span>
                        </Link>
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-white/5 hover:text-rose-200"
                        >
                            <LogOut className="size-4" />
                            <span>Keluar</span>
                        </Link>
                    </div>
                </aside>

                {/* KONTEN UTAMA */}
                <div className="ml-72 flex-1 flex flex-col min-h-screen">
                    <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center sticky top-0 z-30">
                        <h1 className="text-xl font-bold text-slate-900">Daftar Produk Saya</h1>
                    </header>

                    <main className="p-8 flex-1 space-y-6">
                        {/* Toolbar Pencarian */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                                <ShoppingBag className="size-4 text-emerald-600" />
                                <span>Total Produk ({filteredProduk.length})</span>
                            </div>

                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari produk atau kategori..."
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-2 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                />
                            </div>
                        </div>

                        {/* LIST KATALOG PRODUK */}
                        {filteredProduk.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {filteredProduk.map((p) => (
                                    <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition relative">
                                        <div className="h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center text-slate-400">
                                            {p.foto ? (
                                                <img
                                                    src={`/${p.foto}`}
                                                    alt={p.nama_produk}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                />
                                            ) : (
                                                <Package className="size-10 text-slate-300" />
                                            )}
                                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-600 shadow-sm">
                                                {p.kategori}
                                            </span>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-base">{p.nama_produk}</h3>
                                                {p.deskripsi && (
                                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.deskripsi}</p>
                                                )}
                                                <p className="text-emerald-600 font-extrabold text-lg mt-2">
                                                    Rp {Math.floor(Number(p.harga)).toLocaleString('id-ID')}
                                                </p>
                                            </div>

                                            {/* TOMBOL EDIT & HAPUS */}
                                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2 relative z-20">
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleEdit(p, e)}
                                                    className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 transition cursor-pointer shadow-sm active:scale-95"
                                                    title="Ubah Produk"
                                                >
                                                    <Edit2 className="size-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleDeleteClick(p, e)}
                                                    className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-rose-500 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer shadow-sm active:scale-95"
                                                    title="Hapus Produk"
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                                <div className="flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mx-auto mb-3">
                                    <Package className="size-6" />
                                </div>
                                <h3 className="font-bold text-slate-800 text-base">Belum Ada Produk</h3>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* ========================================================
                MODAL POPUP EDIT PRODUK (DENGAN DESKRIPSI)
               ======================================================== */}
            {editingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                            <h3 className="font-bold text-slate-900">Ubah Produk</h3>
                            <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="edit-nama-produk" className="block text-xs font-bold uppercase text-slate-500 mb-1">Nama Produk</label>
                                <input
                                    id="edit-nama-produk"
                                    type="text"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    value={data.nama_produk}
                                    onChange={e => setData('nama_produk', e.target.value)}
                                    autoComplete="off"
                                    spellCheck={false}
                                    data-gramm="false"
                                    required
                                />
                                {errors.nama_produk && <p className="text-xs text-rose-500 mt-1">{errors.nama_produk}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="edit-kategori" className="block text-xs font-bold uppercase text-slate-500 mb-1">Kategori</label>
                                    <select
                                        id="edit-kategori"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        value={data.kategori}
                                        onChange={e => setData('kategori', e.target.value)}
                                        required
                                    >
                                        <option value="Makanan & Minuman">Makanan & Minuman</option>
                                        <option value="Kerajinan">Kerajinan</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="edit-harga" className="block text-xs font-bold uppercase text-slate-500 mb-1">Harga (Rp)</label>
                                    <input
                                        id="edit-harga"
                                        type="number"
                                        step="1"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                        value={data.harga}
                                        onChange={e => setData('harga', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="edit-foto" className="block text-xs font-bold uppercase text-slate-500 mb-1">Ganti Foto (Opsional)</label>
                                <input
                                    id="edit-foto"
                                    type="file"
                                    accept="image/*"
                                    className="w-full rounded-xl border border-slate-200 bg-white p-1.5 text-xs text-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition cursor-pointer"
                                    onChange={e => setData('foto', e.target.files?.[0] || null)}
                                />
                            </div>

                            {/* 🛠️ DITAMBAHKAN: FIELD DESKRIPSI PRODUK */}
                            <div>
                                <label htmlFor="edit-deskripsi" className="block text-xs font-bold uppercase text-slate-500 mb-1">Deskripsi Produk</label>
                                <textarea
                                    id="edit-deskripsi"
                                    rows={3}
                                    placeholder="Tuliskan deskripsi ringkas..."
                                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition resize-none"
                                    value={data.deskripsi}
                                    onChange={e => setData('deskripsi', e.target.value)}
                                />
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL POPUP KONFIRMASI HAPUS PRODUK */}
            {deletingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100 text-center">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-4">
                            <AlertTriangle className="size-6" />
                        </div>

                        <h3 className="text-lg font-bold text-slate-900">Hapus Produk?</h3>
                        <p className="text-xs text-slate-500 mt-2">
                            Apakah Anda yakin ingin menghapus produk <span className="font-bold text-slate-800">"{deletingProduct.nama_produk}"</span>? Tindakan ini tidak dapat dibatalkan.
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingProduct(null)}
                                className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="w-1/2 rounded-xl bg-rose-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-rose-700 transition"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
