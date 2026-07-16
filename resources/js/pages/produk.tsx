import { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Search, Heart, MessageCircle, Store, ChevronRight,
    ChevronDown, RotateCcw, SlidersHorizontal, MapPin,
    Instagram, Facebook, Phone, Check, ArrowRight, Sprout
} from 'lucide-react';

// 1. DATA DUMMY UMKM (TETAP SAMA)
const DUMMY_UMKM = [
    { id: 'semua', name: 'Semua UMKM', total: 56, location: 'Cimenyan' },
    { id: 'umkm-1', name: 'Keripik Mandala', total: 15, location: 'Mandalamekar Utara' },
    { id: 'umkm-2', name: 'Kopi Mandala', total: 10, location: 'Mandalamekar Selatan' },
    { id: 'umkm-3', name: 'Madu Mandala', total: 8, location: 'Cimenyan' },
    { id: 'umkm-4', name: 'Anyaman Mandala', total: 12, location: 'Mandalamekar Timur' },
    { id: 'umkm-5', name: 'Batik Mandala', total: 5, location: 'Mandalamekar Barat' },
    { id: 'umkm-6', name: 'Bumbu Mandala', total: 6, location: 'Cimenyan' },
];

// 2. DATA DUMMY PRODUK (TETAP SAMA)
const DUMMY_PRODUCTS = [
    { id: 1, title: 'Keripik Singkong', umkmId: 'umkm-1', umkmName: 'Keripik Mandala', category: 'Makanan & Minuman', price: 15000, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Kopi Bubuk Premium', umkmId: 'umkm-2', umkmName: 'Kopi Mandala', category: 'Makanan & Minuman', price: 25000, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Madu Hutan Murni', umkmId: 'umkm-3', umkmName: 'Madu Mandala', category: 'Makanan & Minuman', price: 60000, image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Anyaman Bambu', umkmId: 'umkm-4', umkmName: 'Anyaman Mandala', category: 'Kerajinan', price: 35000, image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80' },
    { id: 5, title: 'Batik Mandala', umkmId: 'umkm-5', umkmName: 'Batik Mandala', category: 'Fashion', price: 120000, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80' },
    { id: 6, title: 'Bumbu Mandala', umkmId: 'umkm-6', umkmName: 'Bumbu Mandala', category: 'Pertanian', price: 20000, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80' },
    { id: 7, title: 'Teh Daun Kelor', umkmId: 'umkm-2', umkmName: 'Kopi Mandala', category: 'Makanan & Minuman', price: 18000, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
    { id: 8, title: 'Sambal Mandala', umkmId: 'umkm-6', umkmName: 'Bumbu Mandala', category: 'Makanan & Minuman', price: 15000, image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=600&q=80' },
];

export default function ProdukPage() {
    // STATE LOGIKA FILTER (TETAP SAMA)
    const [selectedUmkm, setSelectedUmkm] = useState('semua');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('terbaru');
    const [maxPrice, setMaxPrice] = useState(500000);

    // FILTERING LOGIC DENGAN USEMEMO (TETAP SAMA)
    const filteredProducts = useMemo(() => {
        return DUMMY_PRODUCTS.filter((item) => {
            const matchUmkm = selectedUmkm === 'semua' || item.umkmId === selectedUmkm;
            const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
            const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.umkmName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchPrice = item.price <= maxPrice;
            return matchUmkm && matchCategory && matchSearch && matchPrice;
        }).sort((a, b) => {
            if (sortBy === 'termurah') return a.price - b.price;
            if (sortBy === 'termahal') return b.price - a.price;
            return b.id - a.id;
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

            {/* NAVBAR YANG SERASI DENGAN BERANDA & UMKM */}
            <header className="sticky top-0 z-50 border-b border-white/80 bg-white/80 backdrop-blur-xl transition-all">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                            <Sprout className="size-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">UMKM</p>
                            <p className="text-base font-extrabold tracking-tight text-slate-900 leading-none">Desa Mandalamekar</p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        <Link href="/" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            Beranda
                        </Link>
                        <Link href="/umkm" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            UMKM
                        </Link>
                        <Link href="/produk" className="text-sm font-semibold text-emerald-600">
                            Produk
                        </Link>
                        <Link href="#tentang" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            Tentang Desa
                        </Link>
                        <Link href="#kontak" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            Kontak
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                             href="/admin/dashboard"
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                        >
                            <span>Login</span>
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO BANNER ATAS (DENGAN STYLE GRADIENT & SHADOW KHAS) */}
            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-900 px-6 py-12 text-white shadow-[0_20px_60px_rgba(15,23,42,0.15)] sm:px-10 sm:py-16">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.3),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(132,204,22,0.2),transparent_30%)]" />
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

                    <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md">
                                <span className="size-2 rounded-full bg-emerald-400" />
                                Katalog Produk Desa
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                                Produk <span className="text-emerald-400">UMKM</span>
                            </h1>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                                Temukan berbagai produk olahan, kerajinan tangan, dan komoditas unggulan terbaik dari para pelaku UMKM Desa Mandalamekar.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-md">
                            <Link href="/welcome" className="hover:text-white transition">Beranda</Link>
                            <ChevronRight className="size-3.5 text-slate-500" />
                            <span className="text-emerald-400 font-semibold">Produk</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* KONTEN UTAMA */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* 1. BAGIAN LOGIKA BARU: FILTER KHUSUS PILIH UMKM (STYLE PILL HARMONIS) */}
                <div className="mb-6 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                        <div>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 mb-1.5 border border-emerald-200/60">
                                <Store className="size-3" /> Step 1: Pilih UMKM
                            </span>
                            <h2 className="text-base font-bold text-slate-900 sm:text-lg">Filter Etalase Berdasarkan Toko UMKM</h2>
                        </div>

                        {/* DROPDOWN PILIH UMKM */}
                        <div className="relative min-w-[260px]">
                            <select
                                value={selectedUmkm}
                                onChange={(e) => setSelectedUmkm(e.target.value)}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-xs sm:text-sm font-semibold text-slate-700 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 cursor-pointer"
                            >
                                {DUMMY_UMKM.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name} ({u.total} Produk)
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>

                    {/* CHIPS PILIHAN CEPAT */}
                    <div className="mt-5 flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                        {DUMMY_UMKM.map((u) => {
                            const isSelected = selectedUmkm === u.id;
                            return (
                                <button
                                    key={u.id}
                                    onClick={() => setSelectedUmkm(u.id)}
                                    className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition duration-200 ${
                                        isSelected
                                            ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 -translate-y-0.5'
                                            : 'border-slate-200/80 bg-slate-50/80 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900'
                                    }`}
                                >
                                    <Store className={`size-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                                    <span>{u.name}</span>
                                    <span className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${isSelected ? 'bg-emerald-700 text-white' : 'bg-white text-slate-600 shadow-2xs'}`}>
                                        {u.total}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
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

                {/* 3. LAYOUT UTAMA: SIDEBAR KIRI & GRID PRODUK KANAN */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

                    {/* SIDEBAR FILTER KIRI */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 space-y-6">

                            {/* Filter Kategori */}
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-sm mb-3.5 flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-emerald-500" />
                                    Kategori
                                </h3>
                                <div className="space-y-1.5">
                                    {[
                                        { label: 'Semua Kategori', count: 56, val: 'Semua' },
                                        { label: 'Makanan & Minuman', count: 28, val: 'Makanan & Minuman' },
                                        { label: 'Kerajinan', count: 12, val: 'Kerajinan' },
                                        { label: 'Pertanian', count: 8, val: 'Pertanian' },
                                        { label: 'Fashion', count: 5, val: 'Fashion' },
                                    ].map((cat) => {
                                        const active = selectedCategory === cat.val;
                                        return (
                                            <button
                                                key={cat.val}
                                                onClick={() => setSelectedCategory(cat.val)}
                                                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs transition duration-200 ${
                                                    active
                                                        ? 'bg-emerald-50 text-emerald-700 font-bold shadow-2xs border border-emerald-200/60'
                                                        : 'text-slate-600 hover:bg-slate-50 font-medium hover:text-slate-900'
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
                            </div>

                            <hr className="border-slate-100" />

                            {/* Filter Rentang Harga */}
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-sm mb-3.5 flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-emerald-500" />
                                    Rentang Harga
                                </h3>
                                <input
                                    type="range"
                                    min="10000"
                                    max="500000"
                                    step="10000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full accent-emerald-600 cursor-pointer"
                                />
                                <div className="mt-2.5 flex items-center justify-between text-xs font-bold text-slate-700">
                                    <span className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] text-slate-600">Rp 0</span>
                                    <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700 border border-emerald-200/60">
                                        Rp {maxPrice.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Filter Lokasi UMKM */}
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-sm mb-3.5 flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-emerald-500" />
                                    Lokasi UMKM
                                </h3>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 pr-8 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 cursor-pointer">
                                        <option>Pilih Lokasi</option>
                                        <option>Cimenyan</option>
                                        <option>Mandalamekar Utara</option>
                                        <option>Mandalamekar Selatan</option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Action Buttons: Reset & Terapkan */}
                            <div className="flex gap-2 pt-1">
                                <button
                                    onClick={handleReset}
                                    className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                                >
                                    <RotateCcw className="size-3.5" />
                                    <span>Reset</span>
                                </button>
                                <button className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700">
                                    Terapkan Filter
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* GRID PRODUK KANAN */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-slate-200/60 shadow-2xs">
                            <p className="text-xs sm:text-sm font-medium text-slate-600">
                                Menampilkan <span className="font-extrabold text-slate-900">{filteredProducts.length} Produk</span>
                                {selectedUmkm !== 'semua' && (
                                    <span> dari toko <span className="font-bold text-emerald-600 underline decoration-emerald-300 underline-offset-4">"{DUMMY_UMKM.find(u => u.id === selectedUmkm)?.name}"</span></span>
                                )}
                            </p>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">
                                <div className="flex size-16 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 mb-4 border border-slate-100 shadow-inner">
                                    <Store className="size-8 text-slate-300" />
                                </div>
                                <h3 className="font-extrabold text-slate-800 text-base">Produk Tidak Ditemukan</h3>
                                <p className="mt-1.5 text-xs text-slate-500 max-w-sm leading-relaxed">
                                    Belum ada produk di etalase ini atau tidak ada yang sesuai dengan kriteria filter yang Anda pasang.
                                </p>
                                <button
                                    onClick={handleReset}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                                >
                                    <RotateCcw className="size-3.5" />
                                    <span>Reset Semua Filter</span>
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Grid 4 Kolom di layar besar (lg:grid-cols-3 xl:grid-cols-4) dengan Card Style Mandalamekar */}
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {filteredProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="group flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-300/60 hover:border-emerald-200/60"
                                        >
                                            <div>
                                                <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem] bg-slate-100">
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="size-full object-cover object-center transition duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                                    <button className="absolute right-3 top-3 rounded-full bg-white/85 p-2 text-slate-600 shadow-md backdrop-blur-md transition hover:bg-white hover:text-red-500 hover:scale-110">
                                                        <Heart className="size-4" />
                                                    </button>
                                                    <span className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-800 shadow-sm backdrop-blur-md">
                                                        {product.category}
                                                    </span>
                                                </div>

                                                <div className="px-1 pb-1 pt-4">
                                                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition line-clamp-1 text-base">
                                                        {product.title}
                                                    </h4>
                                                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-slate-500">
                                                        <Store className="size-3 text-emerald-600" />
                                                        {product.umkmName}
                                                    </p>
                                                    <p className="mt-3 text-base font-extrabold text-slate-900">
                                                        Rp {product.price.toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="pt-3">
                                                <button
                                                    onClick={() => window.open(`https://wa.me/628123456789?text=Halo,%20saya%20tertarik%20dengan%20produk%20${product.title}`, '_blank')}
                                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-emerald-50/50 py-2.5 text-xs font-bold text-emerald-700 transition duration-200 hover:bg-emerald-600 hover:text-white hover:shadow-md hover:shadow-emerald-600/20"
                                                >
                                                    <MessageCircle className="size-3.5" />
                                                    <span>Chat WhatsApp</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* PAGINATION YANG LEBIH MODERN & HARMONIS */}
                                <div className="mt-10 flex items-center justify-center gap-2 pt-4">
                                    <button className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-400 transition hover:bg-slate-50 hover:text-slate-600 disabled:opacity-50" disabled>&lt;</button>
                                    <button className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-xs font-extrabold text-white shadow-lg shadow-emerald-600/25">1</button>
                                    <button className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">2</button>
                                    <button className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">3</button>
                                    <span className="px-1 text-xs font-bold text-slate-400">...</span>
                                    <button className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">&gt;</button>
                                </div>
                            </>
                        )}
                    </div>

                </div>

                {/* BANNER CTA BAWAH (STYLE GRADIENT KHAS DESA MANDALAMEKAR) */}
                <div className="mt-16 overflow-hidden rounded-[2rem] bg-emerald-900 text-white shadow-[0_20px_60px_rgba(6,95,70,0.22)] relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.3),transparent_40%)]" />
                    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10">
                        <div className="flex items-center gap-5 text-center sm:text-left flex-col sm:flex-row">
                            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                                <Store className="size-7" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">Punya produk unggulan di desa?</h3>
                                <p className="mt-1 text-xs text-emerald-100/80 sm:text-sm max-w-lg leading-relaxed">
                                    Daftarkan produk dan usaha UMKM Anda sekarang pada portal resmi desa untuk memperluas jangkauan pasar hingga ke luar daerah.
                                </p>
                            </div>
                        </div>
                        <button className="w-full sm:w-auto shrink-0 rounded-xl bg-white px-6 py-3.5 text-xs font-bold text-emerald-900 shadow-lg transition hover:bg-emerald-50">
                            Daftarkan UMKM Anda
                        </button>
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
                    © 2026 UMKM Desa Mandalamekar. Universitas Yarsi.               </div>
            </footer>
        </div>
    );
}
