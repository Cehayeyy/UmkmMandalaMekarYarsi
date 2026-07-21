import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    LogOut,
    Package,
    Store,
    Tag,
    ShoppingBag
} from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ProdukSaya() {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, processing, reset, errors } = useForm({
        nama_produk: '',
        kategori: '',
        harga: '',
        deskripsi: '',
        foto: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('umkm.produk.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                // 🛠️ Otomatis alihkan halaman ke Daftar Produk Saya setelah simpan
                router.get(route('umkm.produk.daftar'));
            },
        });
    };

    return (
        <>
            <Head title="Produk Saya - Panel Toko" />
            <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">

                {/* ==========================================
                    SIDEBAR PANEL TOKO
                   ========================================== */}
                <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100">
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shrink-0">
                            <Store className="size-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Panel Toko</p>
                            <p className="text-base font-bold leading-tight text-white truncate">
                                {auth.user?.name ?? 'Pemilik UMKM'}
                            </p>
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

                        {/* Menu Aktif saat ini */}
                        <Link
                            href={route('umkm.produk.index')}
                            className="flex w-full items-center gap-3 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/40"
                        >
                            <Package className="size-4" />
                            <span>Produk Saya</span>
                        </Link>

                        {/* Menu Link ke Daftar Produk Saya */}
                        <Link
                            href={route('umkm.produk.daftar')}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
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

                {/* ==========================================
                    AREA KONTEN UTAMA (KHUSUS FORM INPUT)
                   ========================================== */}
                <div className="ml-72 flex-1 flex flex-col min-h-screen">
                    <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30">
                        <h1 className="text-xl font-bold text-slate-900">Produk Saya</h1>
                    </header>

                    <main className="p-8 space-y-8 flex-1">

                        {/* FORM TAMBAH PRODUK BARU */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm w-full">
                            <div className="border-b border-slate-100 pb-4 mb-6">
                                <h2 className="text-base font-bold text-slate-900">Tambah Produk Baru</h2>
                                <p className="text-xs text-slate-500 mt-0.5">Lengkapi formulir di bawah ini untuk menambahkan produk ke toko Anda.</p>
                            </div>

                            <form onSubmit={submit} encType="multipart/form-data" className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {/* 1. Nama Produk */}
                                    <div>
                                        <label htmlFor="nama-produk" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                            Nama Produk
                                        </label>
                                        <input
                                            id="nama-produk"
                                            type="text"
                                            placeholder="Nama Produk"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            value={data.nama_produk}
                                            onChange={e => setData('nama_produk', e.target.value)}
                                            autoComplete="off"     // 🛠️ Mencegah saran "Saved info" dari browser
                                            spellCheck={false}     // 🛠️ Mematikan garis merah dan saran ejaan
                                            data-gramm="false"
                                            required
                                        />
                                        {errors.nama_produk && <p className="text-xs text-rose-500 mt-1">{errors.nama_produk}</p>}
                                    </div>

                                    {/* 2. Kategori */}
                                    <div>
                                        <label htmlFor="kategori" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                            Kategori
                                        </label>
                                        <select
                                            id="kategori"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            value={data.kategori}
                                            onChange={e => setData('kategori', e.target.value)}
                                            required
                                        >
                                            <option value="" disabled hidden>
                                                Pilih Kategori
                                            </option>
                                            <option value="Makanan & Minuman">Makanan & Minuman</option>
                                            <option value="Kerajinan">Kerajinan</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                        {errors.kategori && <p className="text-xs text-rose-500 mt-1">{errors.kategori}</p>}
                                    </div>

                                    {/* 3. Harga */}
                                    <div>
                                        <label htmlFor="harga" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                            Harga (Rp)
                                        </label>
                                        <input
                                            id="harga"
                                            type="number"
                                            step="1"
                                            placeholder="Harga"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            value={data.harga}
                                            onChange={e => setData('harga', e.target.value)}
                                            required
                                        />
                                        {errors.harga && <p className="text-xs text-rose-500 mt-1">{errors.harga}</p>}
                                    </div>

                                    {/* 4. Foto Produk */}
                                    <div>
                                        <label htmlFor="foto-produk" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                            Foto Produk
                                        </label>
                                        <input
                                            id="foto-produk"
                                            type="file"
                                            accept="image/*"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2 text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition cursor-pointer"
                                            onChange={e => setData('foto', e.target.files?.[0] || null)}
                                        />
                                        {errors.foto && <p className="text-xs text-rose-500 mt-1">{errors.foto}</p>}
                                    </div>

                                    {/* 5. Deskripsi Produk */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="deskripsi-produk" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                            Deskripsi Produk
                                        </label>
                                        <textarea
                                            id="deskripsi-produk"
                                            rows={3}
                                            placeholder="Tuliskan detail atau deskripsi ringkas mengenai produk ini..."
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition resize-none"
                                            value={data.deskripsi}
                                            onChange={e => setData('deskripsi', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* TOMBOL SIMPAN */}
                                <div className="pt-3 border-t border-slate-100 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Produk'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </main>
                </div>
            </div>
        </>
    );
}
