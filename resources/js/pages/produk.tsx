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

// 2. KATEGORI DENGAN TOTAL 0 (Hanya menyisakan "Semua Kategori")
const categories = [
    { label: 'Semua Kategori', count: 0 },
];

export default function ProdukPage() {
    const [selectedUmkm, setSelectedUmkm] = useState('semua');
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('terbaru');
    const [maxPrice, setMaxPrice] = useState(500000);

    const filteredProducts = useMemo(() => {
        return DUMMY_PRODUCTS.filter((item) => {
            const matchUmkm = selectedUmkm === 'semua' || item.umkmId === selectedUmkm;
            const matchCategory = selectedCategory === 'Semua Kategori' || item.category === selectedCategory;
            const matchSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchUmkm && matchCategory && matchSearch;
        });
    }, [selectedUmkm, selectedCategory, searchQuery, sortBy]);

    const handleReset = () => {
        setSelectedUmkm('semua');
        setSelectedCategory('Semua Kategori');
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
                        <Link href="/" className="text-sm font-medium text-slate-600">Beranda</Link>
                        <Link href="/umkm" className="text-sm font-medium text-slate-600">UMKM</Link>
                        <Link href="/produk" className="text-sm font-semibold text-emerald-600">Produk</Link>
                        <Link href="#tentang" className="text-sm font-medium text-slate-600">Tentang Desa</Link>
                        <Link href="#kontak" className="text-sm font-medium text-slate-600">Kontak</Link>
                    </nav>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:bg-emerald-700">Login <ArrowRight className="size-4" /></button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8">
                {/* HERO BANNER */}
                <div className="relative overflow-hidden rounded-[2rem] bg-[#0a1426] px-10 py-12 text-white mb-8 border border-white/10">
                    <div className="flex items-center gap-2 mb-4"><span className="size-2 rounded-full bg-emerald-400" /><span className="text-xs text-emerald-400 font-medium">Katalog Produk Desa</span></div>
                    <h1 className="text-4xl font-extrabold mb-3">Produk <span className="text-emerald-400">UMKM</span></h1>
                    <p className="text-sm text-slate-300 max-w-lg mb-6">Temukan berbagai produk unggulan terbaik dari para pelaku UMKM Desa Mandalamekar.</p>
                    <div className="absolute bottom-6 right-8 flex items-center gap-2 text-xs text-slate-400"><Link href="/">Beranda</Link> <ChevronRight className="size-3" /> <span className="text-emerald-400">Produk</span></div>
                </div>

                {/* FILTER ETALASE */}
                <div className="mb-6 rounded-[1.75rem] border bg-white p-6 shadow-xl">
                    <div className="flex items-center gap-2 mb-4 text-emerald-700 text-xs font-bold bg-emerald-50 w-fit px-3 py-1 rounded-full"><Store className="size-3"/> Step 1: Pilih UMKM</div>
                    <p className="text-sm font-bold text-slate-900 mb-4">Filter Etalase Berdasarkan Toko UMKM</p>
                    <select className="w-full rounded-xl border p-2.5 text-sm cursor-pointer">
                        <option>Semua UMKM (0 Produk)</option>
                    </select>
                </div>

                {/* 2. SEARCH BAR & SORTING (STYLE ROUNDED-2XL & SHADOW HALUS) */}
                <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200/80 bg-white p-4 shadow-lg shadow-slate-200/40">
                    <div className="relative w-full sm:flex-1">
                        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari produk, contoh: keripik, kopi, madu..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
                        />
                    </div>

                    <div className="flex w-full sm:w-auto items-center justify-end gap-3 shrink-0">
                        <span className="text-xs font-semibold text-slate-500">Urutkan:</span>
                        <div className="relative min-w-[170px]">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 pr-8 text-xs font-semibold text-slate-700 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 cursor-pointer"
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
                        {categories.map(c => (
                            <div key={c.label} className="flex justify-between py-2 text-xs text-slate-600">{c.label} <span>{c.count}</span></div>
                        ))}
                        <hr />
                        <h3 className="font-extrabold text-sm mb-4">Rentang Harga</h3>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-2"><span>Rp 0</span><span>Rp 500.000</span></div>
                        <input type="range" className="w-full accent-emerald-600 cursor-pointer" />
                        <hr />
                        <h3 className="font-extrabold text-sm mb-4">Lokasi UMKM</h3>
                        <select className="w-full rounded-xl border p-2 text-xs cursor-pointer"><option>Pilih Lokasi</option><option>Cimenyan</option><option>Mandalamekar Utara</option><option>Mandalamekar Selatan</option></select>
                        <div className="flex gap-2 mt-4">
                            <button onClick={handleReset} className="flex items-center gap-1 border rounded-xl px-3 py-2 text-xs"><RotateCcw className="size-3" /> Reset</button>
                            <button className="flex-1 bg-emerald-600 rounded-xl text-white text-xs font-bold py-2.5">Terapkan Filter</button>
                        </div>
                    </div>

                    {/* GRID PRODUK */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border mb-6 shadow-2xs">
                            <p className="text-sm font-medium text-slate-600">Menampilkan <span className="font-bold text-slate-900">0 Produk</span></p>
                        </div>
                        <div className="py-16 text-center border-2 border-dashed rounded-[1.75rem] text-slate-500">
                            <Store className="mx-auto size-12 mb-4 text-slate-300" />
                            <p>Belum ada data produk yang tersedia.</p>
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