import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Search, Store, ChevronRight, ChevronDown, 
    RotateCcw, MapPin, Sprout, ArrowRight, MessageCircle, 
    Facebook, Instagram, Check
} from 'lucide-react';

// 1. DATA DUMMY DIKOSONGKAN
const DUMMY_UMKM: any[] = [];
const DUMMY_PRODUCTS: any[] = [];

// 2. KATEGORI DENGAN TOTAL 0 (Tampilan dipertahankan)
const categories = [
    { label: 'Semua Kategori', count: 0 },
    { label: 'Makanan & Minuman', count: 0 },
    { label: 'Kerajinan', count: 0 },
    { label: 'Pertanian', count: 0 },
    { label: 'Fashion', count: 0 },
];

export default function ProdukPage() {
    const [selectedUmkm, setSelectedUmkm] = useState('semua');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('terbaru');
    const [maxPrice, setMaxPrice] = useState(500000);

    const filteredProducts = useMemo(() => {
        return DUMMY_PRODUCTS.filter((item) => {
            const matchUmkm = selectedUmkm === 'semua' || item.umkmId === selectedUmkm;
            const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
            const matchSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchPrice = item.price <= maxPrice;
            return matchUmkm && matchCategory && matchSearch && matchPrice;
        });
    }, [selectedUmkm, selectedCategory, searchQuery, sortBy, maxPrice]);

    const handleReset = () => {
        setSelectedUmkm('semua');
        setSelectedCategory('Semua');
        setSearchQuery('');
        setSortBy('terbaru');
        setMaxPrice(500000);
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] font-sans text-slate-900">
            <Head title="Produk UMKM - Desa Mandalamekar" />

            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-white/80 bg-white/80 backdrop-blur-xl transition-all">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"><Sprout className="size-6" /></div>
                        <div><p className="text-xs font-bold uppercase tracking-wider text-emerald-600">UMKM</p><p className="text-base font-extrabold text-slate-900 leading-none">Desa Mandalamekar</p></div>
                    </Link>
                    <nav className="hidden items-center gap-8 md:flex">
                        <Link href="/" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Beranda</Link>
                        <Link href="/umkm" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">UMKM</Link>
                        <Link href="/produk" className="text-sm font-semibold text-emerald-600">Produk</Link>
                        <Link href="#tentang" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Tentang Desa</Link>
                        <Link href="#kontak" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Kontak</Link>
                    </nav>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:bg-emerald-700">Login <ArrowRight className="size-4" /></button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8">
                {/* HERO BANNER */}
                <div className="relative overflow-hidden rounded-[2rem] bg-[#0a1426] px-10 py-12 text-white mb-8 border border-white/10">
                    <div className="flex items-center gap-2 mb-4"><span className="size-2 rounded-full bg-emerald-400" /><span className="text-xs text-emerald-400 font-medium">Katalog Produk Desa</span></div>
                    <h1 className="text-4xl font-extrabold mb-3">Produk <span className="text-emerald-400">UMKM</span></h1>
                    <p className="text-sm text-slate-300 max-w-lg mb-6">Temukan berbagai produk olahan, kerajinan tangan, dan komoditas unggulan terbaik dari para pelaku UMKM Desa Mandalamekar.</p>
                    <div className="absolute bottom-6 right-8 flex items-center gap-2 text-xs text-slate-400"><Link href="/">Beranda</Link> <ChevronRight className="size-3" /> <span className="text-emerald-400">Produk</span></div>
                </div>

                {/* FILTER ETALASE */}
                <div className="mb-6 rounded-[1.75rem] border bg-white p-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                        <div>
                            <div className="flex items-center gap-2 mb-4 text-emerald-700 text-xs font-bold bg-emerald-50 w-fit px-3 py-1 rounded-full"><Store className="size-3"/> Step 1: Pilih UMKM</div>
                            <p className="text-sm font-bold text-slate-900 mb-4">Filter Etalase Berdasarkan Toko UMKM</p>
                        </div>
                        
                        {/* DROPDOWN PILIH UMKM */}
                        <div className="relative min-w-[260px]">
                            <select
                                value={selectedUmkm}
                                onChange={(e) => setSelectedUmkm(e.target.value)}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-xs sm:text-sm font-semibold text-slate-700 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 cursor-pointer"
                            >
                                <option value="semua">Semua UMKM (0 Produk)</option>
                                {/* Opsi UMKM lain akan muncul di sini jika ada datanya */}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>

                    {/* CHIPS PILIHAN CEPAT */}
                    <div className="mt-5 flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                        <button
                            onClick={() => setSelectedUmkm('semua')}
                            className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition duration-200 ${
                                selectedUmkm === 'semua'
                                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 -translate-y-0.5'
                                    : 'border-slate-200/80 bg-slate-50/80 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900'
                            }`}
                        >
                            <Store className={`size-3.5 ${selectedUmkm === 'semua' ? 'text-white' : 'text-emerald-600'}`} />
                            <span>Semua UMKM</span>
                            <span className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${selectedUmkm === 'semua' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-600 shadow-2xs'}`}>
                                0
                            </span>
                        </button>
                        {/* Chips UMKM lain akan muncul di sini jika ada datanya */}
                    </div>
                </div>

                {/* SEARCH BAR & SORTING */}
                <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-lg shadow-slate-200/40">
                    <div className="relative w-full sm:flex-1">
                        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari produk, contoh: keripik, kopi, madu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>
                    <div className="flex w-full sm:w-auto items-center justify-end gap-3 shrink-0">
                        <span className="text-xs font-semibold text-slate-500">Urutkan:</span>
                        <div className="relative min-w-[170px]">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 pr-8 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:border-emerald-500"
                            >
                                <option value="terbaru">Terbaru</option>
                                <option value="termurah">Harga: Rendah ke Tinggi</option>
                                <option value="termahal">Harga: Tinggi ke Rendah</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* SIDEBAR FILTER */}
                    <div className="rounded-[1.75rem] border bg-white p-6 shadow-xl space-y-6">
                        <h3 className="font-extrabold text-sm mb-4">Kategori</h3>
                        <div className="space-y-1.5">
                            {categories.map((cat) => {
                                const active = selectedCategory === cat.label || (selectedCategory === 'Semua' && cat.label === 'Semua Kategori');
                                return (
                                    <button
                                        key={cat.label}
                                        onClick={() => setSelectedCategory(cat.label === 'Semua Kategori' ? 'Semua' : cat.label)}
                                        className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs transition duration-200 ${
                                            active
                                                ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60'
                                                : 'text-slate-600 hover:bg-slate-50 font-medium'
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {active && <Check className="size-3 text-emerald-600" />}
                                            {cat.label}
                                        </span>
                                        <span className={`rounded-md px-2 py-0.5 text-[10px] ${active ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-500'}`}>
                                            {cat.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        <hr />
                        <h3 className="font-extrabold text-sm mb-4">Rentang Harga</h3>
                        <input type="range" className="w-full accent-emerald-600" min="0" max="500000" step="10000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                        <div className="flex justify-between text-xs mt-2 font-bold text-slate-700">
                            <span className="bg-slate-100 px-2 py-1 rounded-md">Rp 0</span>
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">Rp {maxPrice.toLocaleString('id-ID')}</span>
                        </div>
                        <hr />
                        <h3 className="font-extrabold text-sm mb-4">Lokasi UMKM</h3>
                        <div className="relative">
                            <select className="w-full appearance-none rounded-xl border p-2.5 text-xs cursor-pointer bg-slate-50">
                                <option>Pilih Lokasi</option>
                                <option>Cimenyan</option>
                                <option>Mandalamekar Utara</option>
                                <option>Mandalamekar Selatan</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                        </div>
                        
                        <div className="flex gap-2 mt-4 pt-2">
                            <button onClick={handleReset} className="flex items-center gap-1 border rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50">
                                <RotateCcw className="size-3.5" /> Reset
                            </button>
                            <button className="flex-1 bg-emerald-600 rounded-xl text-white text-xs font-bold shadow-lg hover:bg-emerald-700">Terapkan Filter</button>
                        </div>
                    </div>

                    {/* GRID PRODUK KOSONG */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border mb-6 shadow-2xs">
                            <p className="text-sm font-medium text-slate-600">Menampilkan <span className="font-bold text-slate-900">0 Produk</span></p>
                        </div>
                        <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[1.75rem] text-slate-500 bg-white">
                            <div className="bg-slate-50 p-4 rounded-full mb-4 border border-slate-100 shadow-inner">
                                <Store className="size-8 text-slate-300" />
                            </div>
                            <h3 className="font-extrabold text-slate-800 text-base mb-1">Belum ada data produk yang tersedia.</h3>
                            <p className="text-xs text-slate-500 max-w-sm text-center">Silakan sesuaikan filter Anda atau kembali lagi nanti saat produk sudah ditambahkan oleh UMKM.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER MODERN & CLEAN (SERASI DENGAN WELCOME & UMKM) */}
            <footer id="kontak" className="mt-20 border-t border-slate-200 bg-white">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                                <Sprout className="size-5" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">UMKM Desa Mandalamekar</p>
                                <p className="text-xs font-medium text-slate-500">Portal produk lokal desa</p>
                            </div>
                        </div>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
                            Situs ini dibuat untuk memperkenalkan produk unggulan, membantu promosi, dan memperluas jangkauan pasar UMKM
                            Desa Mandalamekar secara digital.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5 shadow-2xs">
                            <p className="text-sm font-bold text-slate-900">Kontak Resmi</p>
                            <p className="mt-2 text-xs leading-relaxed text-slate-500">Hubungi perangkat desa atau pengelola UMKM melalui kanal resmi.</p>
                            <div className="mt-4 flex gap-3 text-emerald-600">
                                <a href="#" className="rounded-lg bg-white p-2 shadow-2xs hover:text-emerald-700 transition"><Facebook className="size-4" /></a>
                                <a href="#" className="rounded-lg bg-white p-2 shadow-2xs hover:text-emerald-700 transition"><Instagram className="size-4" /></a>
                                <a href="#" className="rounded-lg bg-white p-2 shadow-2xs hover:text-emerald-700 transition"><MessageCircle className="size-4" /></a>
                            </div>
                        </div>

                        <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50/70 p-5">
                            <p className="text-sm font-bold text-emerald-900">Dukungan Lokal</p>
                            <p className="mt-2 text-xs leading-relaxed text-emerald-900/75">Dukung produk lokal, bagikan ke warga, dan ikut memajukan ekonomi desa bersama.</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200/80 py-6 text-center text-xs font-medium text-slate-500">
                    © 2026 UMKM Desa Mandalamekar. Universitas Yarsi.               </div>
            </footer>
        </div>
    );
}