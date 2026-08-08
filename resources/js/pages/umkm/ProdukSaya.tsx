import { type SharedData } from '@/types';
import { CategoryDropdown } from '@/components/CategoryDropdown';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    LogOut,
    Menu,
    Package,
    Store,
    Tag,
    ShoppingBag,
    X
} from 'lucide-react';
import { FormEventHandler, useState, useMemo } from 'react';

interface Product { kategori: string; }
interface PageProps extends SharedData { produkList?: Product[]; }

const defaultCategories = [
    'Makanan & Minuman',
    'Fashion & Aksesoris',
    'Kerajinan Tangan',
    'Pertanian & Perkebunan',
    'Aneka Ragam Lainnya',
];

export default function ProdukSaya() {
    const { auth, produkList = [] } = usePage<PageProps>().props;
    const [isCustomCategory, setIsCustomCategory] = useState(false); // 🛠️ State untuk Kategori Kustom
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 🛠️ MENGAMBIL KATEGORI YANG PERNAH DIBUAT UMKM INI (Anti-Duplikat Ketat)
    const categoryOptions = useMemo(() => {
        const catMap = new Map<string, string>();

        defaultCategories.forEach((category) => catMap.set(category.toLowerCase(), category));

        if (produkList && produkList.length > 0) {
            produkList.forEach(p => {
                if (p.kategori) {
                    const cleanCat = p.kategori.trim();
                    const lowerCat = cleanCat.toLowerCase();
                    if (!catMap.has(lowerCat)) {
                        catMap.set(lowerCat, cleanCat);
                    }
                }
            });
        }
        return Array.from(catMap.values());
    }, [produkList]);

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
                setIsCustomCategory(false);
                // Otomatis alihkan halaman ke Daftar Produk Saya setelah simpan
                router.get(route('umkm.produk.daftar'));
            },
        });
    };

    return (
        <>
            <Head title="Produk Saya - Panel Toko" />
            <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
                {isMobileMenuOpen && (
                    <button
                        type="button"
                        aria-label="Tutup navigasi"
                        className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* SIDEBAR PANEL TOKO */}
                <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
                        {/* 🛠️ PERBAIKAN: Menampilkan Foto Toko di Sidebar */}
                        <div className="flex size-11 items-center justify-center overflow-hidden rounded-2xl bg-emerald-600 text-white shadow-md shrink-0">
                            {(auth.user as any)?.foto_toko ? (
                                <img src={`/${(auth.user as any).foto_toko}`} alt="Logo Toko" className="h-full w-full object-cover" />
                            ) : (
                                <Store className="size-6" />
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Panel Toko</p>
                            <p className="text-base font-bold leading-tight text-white truncate">
                                {auth.user?.name ?? 'Pemilik UMKM'}
                            </p>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        <Link href={route('umkm.dashboard')} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition">
                            <LayoutDashboard className="size-4" />
                            <span>Dashboard Toko</span>
                        </Link>
                        <Link href={route('umkm.produk.index')} className="flex w-full items-center gap-3 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/40">
                            <Package className="size-4" />
                            <span>Produk Saya</span>
                        </Link>
                        <Link href={route('umkm.produk.daftar')} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition">
                            <ShoppingBag className="size-4" />
                            <span>Daftar Produk Saya</span>
                        </Link>
                        <Link href={route('umkm.profil.edit')} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition">
                            <Tag className="size-4" />
                            <span>Profil Toko</span>
                        </Link>
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <Link href={route('logout')} method="post" as="button" className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-white/5 hover:text-rose-200">
                            <LogOut className="size-4" />
                            <span>Keluar</span>
                        </Link>
                    </div>
                </aside>

                {/* KONTEN UTAMA */}
                <div className="flex min-w-0 flex-1 flex-col min-h-screen lg:ml-72">
                    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 shadow-sm transition hover:bg-slate-50 lg:hidden"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Buka navigasi"
                        >
                            <Menu className="size-5" />
                        </button>
                        <h1 className="text-xl font-bold text-slate-900">Produk Saya</h1>
                    </header>

                    <main className="min-w-0 space-y-8 flex-1 p-4 sm:p-6 lg:p-8">
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm w-full">
                            <div className="border-b border-slate-100 pb-4 mb-6">
                                <h2 className="text-base font-bold text-slate-900">Tambah Produk Baru</h2>
                                <p className="text-xs text-slate-500 mt-0.5">Lengkapi formulir di bawah ini untuk menambahkan produk ke toko Anda.</p>
                            </div>

                            <form onSubmit={submit} encType="multipart/form-data" className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                    <div>
                                        <label htmlFor="nama-produk" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Nama Produk</label>
                                        <input
                                            id="nama-produk"
                                            type="text"
                                            placeholder="Nama Produk"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            value={data.nama_produk}
                                            onChange={e => setData('nama_produk', e.target.value)}
                                            autoComplete="off"
                                            spellCheck={false}
                                            required
                                        />
                                        {errors.nama_produk && <p className="text-xs text-rose-500 mt-1">{errors.nama_produk}</p>}
                                    </div>

                                    {/* 🛠️ LOGIKA KATEGORI */}
                                    <div>
                                        <label htmlFor="kategori" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Kategori</label>
                                        {!isCustomCategory ? (
                                            <>
                                            <CategoryDropdown
                                                value={data.kategori}
                                                options={categoryOptions}
                                                onChange={(category) => setData('kategori', category)}
                                                onAddCategory={() => {
                                                    setIsCustomCategory(true);
                                                    setData('kategori', '');
                                                }}
                                            />
                                            {/* <select
                                                id="kategori"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition cursor-pointer"
                                                value={data.kategori}
                                                onChange={e => {
                                                    if (e.target.value === 'custom') {
                                                        setIsCustomCategory(true);
                                                        setData('kategori', '');
                                                    } else {
                                                        setData('kategori', e.target.value);
                                                    }
                                                }}
                                                required
                                            >
                                                <option value="" disabled hidden>Pilih Kategori</option>
                                                {categoryOptions.map((cat) => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                                <option value="custom" className="font-bold text-emerald-600">➕ Tambah Kategori Baru...</option>
                                            </select> */}
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Ketik kategori baru..."
                                                    className="w-full rounded-xl border border-emerald-500 bg-emerald-50/30 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                                    value={data.kategori}
                                                    onChange={e => setData('kategori', e.target.value)}
                                                    required
                                                    autoFocus
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsCustomCategory(false);
                                                        setData('kategori', '');
                                                    }}
                                                    className="flex shrink-0 size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition"
                                                    title="Batal Tambah Kategori"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            </div>
                                        )}
                                        {errors.kategori && <p className="text-xs text-rose-500 mt-1">{errors.kategori}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="harga" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Harga (Rp)</label>
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

                                    <div>
                                        <label htmlFor="foto-produk" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Foto Produk</label>
                                        <input
                                            id="foto-produk"
                                            type="file"
                                            accept="image/*"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2 text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition cursor-pointer"
                                            onChange={e => setData('foto', e.target.files?.[0] || null)}
                                        />
                                        {errors.foto && <p className="text-xs text-rose-500 mt-1">{errors.foto}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="deskripsi-produk" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Deskripsi Produk</label>
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

                                <div className="pt-3 border-t border-slate-100 flex justify-end">
                                    <button type="submit" disabled={processing} className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition disabled:opacity-50">
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
