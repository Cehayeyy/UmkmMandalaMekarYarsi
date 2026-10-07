import { useState, useMemo, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { CategoryDropdown } from '@/components/CategoryDropdown';
import { PublicMobileNav } from '@/components/PublicMobileNav';
import { useCart } from '@/context/CartContext';
import {
    Search, Store, ChevronRight, RotateCcw, MapPin, Sprout, ArrowRight, MessageCircle, Facebook, Instagram, Check, Package, Plus, ShoppingBag, Minus, Trash2, X, Phone
} from 'lucide-react';

interface Product { id: number; nama_produk: string; harga: number; kategori: string; foto: string | null; deskripsi: string; umkm_id: number; seller: string; seller_username: string; no_whatsapp: string | null; }
interface UmkmUser { id: number; name: string; username: string; }
interface CategoryData { label: string; count: number; }
interface PageProps extends SharedData { products: Product[]; umkmList: UmkmUser[]; categoriesData: CategoryData[]; }

export default function ProdukPage() {
    const { auth, products = [], umkmList = [], categoriesData = [] } = usePage<PageProps>().props;

    // Integrasi Cart Global
    const { cartItems, addToCart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    // State Filter & Sort
    const [selectedUmkm, setSelectedUmkm] = useState<string>('semua');
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('terbaru');

    // Rentang Harga Dinamis
    const absoluteMaxPrice = products.length > 0 ? Math.max(...products.map(p => p.harga)) : 500000;
    const [maxPrice, setMaxPrice] = useState<number>(absoluteMaxPrice);

    useEffect(() => {
        if (products.length > 0) setMaxPrice(absoluteMaxPrice);
    }, [products]);

    // LOGIKA FILTER DAN PENGURUTAN (REAL-TIME)
    const filteredProducts = useMemo(() => {
        let result = products.filter((item) => {
            const matchUmkm = selectedUmkm === 'semua' || item.umkm_id.toString() === selectedUmkm;
            const matchCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
            const matchSearch = item.nama_produk.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                item.kategori.toLowerCase().includes(searchQuery.toLowerCase());
            const matchPrice = item.harga <= maxPrice;

            return matchUmkm && matchCategory && matchSearch && matchPrice;
        });

        if (sortBy === 'termurah') {
            result.sort((a, b) => a.harga - b.harga);
        } else if (sortBy === 'termahal') {
            result.sort((a, b) => b.harga - a.harga);
        }

        return result;
    }, [products, selectedUmkm, selectedCategory, searchQuery, sortBy, maxPrice]);

    const handleReset = () => {
        setSelectedUmkm('semua');
        setSelectedCategory('Semua');
        setSearchQuery('');
        setSortBy('terbaru');
        setMaxPrice(absoluteMaxPrice);
    };

    const cartByStore = useMemo(() => {
        const stores = new Map<string, { name: string; phone: string | null; items: typeof cartItems }>();

        cartItems.forEach((item) => {
            const name = item.seller || 'Toko tidak diketahui';
            const phone = item.no_whatsapp || null;
            const key = `${name}-${phone ?? 'no-phone'}`;
            const store = stores.get(key) ?? { name, phone, items: [] };
            store.items.push(item);
            stores.set(key, store);
        });

        return Array.from(stores.values());
    }, [cartItems]);

    const orderStoreViaWhatsApp = (store: { name: string; phone: string | null; items: typeof cartItems }) => {
        if (!store.phone) {
            alert(`Mohon maaf, ${store.name} belum mengatur nomor WhatsApp.`);
            return;
        }

        let phone = store.phone.replace(/\D/g, '');
        if (phone.startsWith('0')) phone = `62${phone.substring(1)}`;
        else if (!phone.startsWith('62')) phone = `62${phone}`;

        const subtotal = store.items.reduce((sum, item) => sum + item.harga * item.quantity, 0);
        let message = `Halo *${store.name}*, saya ingin memesan produk berikut:\n\n`;
        store.items.forEach((item, index) => {
            message += `${index + 1}. ${item.nama_produk} (${item.quantity}x) - Rp ${(item.harga * item.quantity).toLocaleString('id-ID')}\n`;
        });
        message += `\n*Total Pesanan: Rp ${subtotal.toLocaleString('id-ID')}*`;
        message += '\n\nMohon informasi ketersediaan, ongkos kirim, dan cara pembayarannya. Terima kasih!';

        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] font-sans text-slate-900 relative">
            <Head title="Katalog Produk - Desa Mandalamekar" />

            {/* HEADER PUBLIK */}
            <header className="sticky top-0 z-40 border-b border-white/80 bg-white/80 backdrop-blur-xl transition-all">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    {/* LOGO DESA DI HEADER (UKURAN FONT DISAMAKAN DENGAN UMKM INDEX) */}
                    <Link href={route('home')} className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="flex size-10 sm:size-11 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-md border border-slate-100 shrink-0">
                            <img
                                src="/images/Logo DesaMandalamekar.png"
                                alt="Logo Desa Mandalamekar"
                                style={{ imageRendering: '-webkit-optimize-contrast' }}
                                className="size-full object-contain drop-shadow-xs"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-emerald-700">UMKM</p>
                            <p className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 truncate">
                                <span className="hidden sm:inline">Desa Mandalamekar, </span>Kab. Bandung
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-8 lg:flex">
                        <Link href={route('home')} className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Beranda</Link>
                        <Link href={route('umkm.umkmPage')} className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">UMKM</Link>
                        <Link href={route('produk')} className="text-sm font-semibold text-emerald-600">Produk</Link>
                        <Link href={route('tentangdesa')} className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Tentang Desa</Link>
                        <Link href={route('kontak')} className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Kontak</Link>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <PublicMobileNav activeRouteName="produk" />
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative flex size-9 sm:size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-xs"
                            title="Buka Keranjang"
                        >
                            <ShoppingBag className="size-4.5 sm:size-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex size-4.5 sm:size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white animate-bounce">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* TOMBOL LOGIN MURNI - MEMAKAI TAG <a> AGAR FULL REFRESH */}
                        <a href={route('login')} className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-600 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700">
                            <span>Login</span>
                            <ArrowRight className="size-3.5 sm:size-4" />
                        </a>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 pb-24">
                {/* HERO BANNER PRODUK */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-900 text-white mb-8 shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
                    {/* GAMBAR BANNER KUALITAS HD */}
                    <img
                        src="/images/Banner Produk.jpg"
                        alt="Banner Produk Desa Mandalamekar"
                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                        className="absolute inset-0 size-full object-cover object-[60%_center] sm:object-center"
                    />

                    {/* OVERLAY DENGAN GRADIENT DARI KANAN KE KIRI */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent sm:bg-gradient-to-l sm:from-slate-950/80 sm:via-slate-950/40" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_40%)]" />

                    {/* BADGE LOGO DESA & YARSI DIPINDAHKAN KE KIRI ATAS */}
                    <div className="absolute top-6 left-6 z-10 hidden sm:inline-flex items-center gap-4 rounded-full border border-white/30 bg-slate-950/60 px-6 py-3 backdrop-blur-md shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="size-12 sm:size-14 overflow-hidden rounded-full bg-white p-1.5 shrink-0 shadow-md ring-2 ring-white/20">
                                <img
                                    src="/images/Logo DesaMandalamekar.png"
                                    alt="Logo Desa"
                                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                                    className="size-full object-contain"
                                />
                            </div>
                            <div className="size-12 sm:size-14 overflow-hidden rounded-full bg-white p-1.5 shrink-0 shadow-md ring-2 ring-white/20">
                                <img
                                    src="/images/logo-universitas-yarsi.png"
                                    alt="Logo Yarsi"
                                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                                    className="size-full object-contain"
                                />
                            </div>
                        </div>
                        <span className="text-xs sm:text-sm font-bold tracking-wide text-emerald-200 border-l border-white/20 pl-4">
                            Desa Mandalamekar & Universitas Yarsi
                        </span>
                    </div>

                    {/* CONTAINER GRID TEKS BANNER (POSISI TEKS DIPINDAHKAN KE SEBELAH KANAN) */}
                    <div className="relative grid min-h-[460px] items-end pb-8 sm:min-h-[540px] sm:pb-12 px-6 sm:px-10 lg:grid-cols-2 lg:px-12 z-10">
                        <div className="max-w-2xl lg:col-start-2 lg:justify-self-end text-left lg:text-right">
                            <div className="flex items-center gap-2 mb-4 lg:justify-end">
                                <span className="size-2 rounded-full bg-emerald-400 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                </span>
                                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider drop-shadow-md">Katalog UMKM Desa</span>
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-3 drop-shadow-md">
                                Produk <span className="block text-emerald-300 drop-shadow-md">Desa Mandalamekar</span>
                            </h1>
                            <p className="mt-5 text-base leading-7 text-slate-100 sm:text-lg font-medium drop-shadow-sm ml-auto">
                                Temukan berbagai produk olahan, kerajinan tangan, dan komoditas unggulan terbaik langsung dari para pelaku UMKM Desa Mandalamekar <span className="whitespace-nowrap">Kecamatan Cimenyan</span> <span className="whitespace-nowrap">Kabupaten Bandung</span> <span className="whitespace-nowrap">Provinsi Jawa Barat</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FILTER PILIH UMKM */}
                <div className="mb-6 rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-sm mb-3">
                                <Store className="size-3" />
                                <span>Step 1: Pilih UMKM</span>
                            </div>
                            <p className="text-sm font-bold text-slate-900">Filter Etalase Berdasarkan Toko UMKM</p>
                        </div>

                        <div className="min-w-[260px]">
                            <CategoryDropdown
                                value={selectedUmkm}
                                options={[
                                    { value: 'semua', label: `Semua UMKM (${products.length} Produk)` },
                                    ...umkmList.map((u) => ({ value: u.id.toString(), label: u.name })),
                                ]}
                                onChange={setSelectedUmkm}
                                placeholder="Pilih UMKM"
                            />
                        </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                        <button
                            onClick={() => setSelectedUmkm('semua')}
                            className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition duration-200 cursor-pointer ${
                                selectedUmkm === 'semua' ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg -translate-y-0.5' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                            }`}
                        >
                            <Store className="size-3.5" /> Semua UMKM
                        </button>
                        {umkmList.map((u) => (
                            <button
                                key={u.id}
                                onClick={() => setSelectedUmkm(u.id.toString())}
                                className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition duration-200 cursor-pointer ${
                                    selectedUmkm === u.id.toString() ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg -translate-y-0.5' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                                }`}
                            >
                                <Store className="size-3.5" /> {u.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SEARCH BAR & SORTING */}
                <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-lg shadow-slate-200/40">
                    <div className="relative w-full sm:flex-1">
                        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari nama produk atau kategori..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>
                    <div className="flex w-full sm:w-auto items-center justify-end gap-3 shrink-0">
                        <span className="text-xs font-semibold text-slate-500">Urutkan:</span>
                        <div className="min-w-[170px]">
                            <CategoryDropdown
                                value={sortBy}
                                options={[
                                    { value: 'terbaru', label: 'Terbaru' },
                                    { value: 'termurah', label: 'Harga: Rendah ke Tinggi' },
                                    { value: 'termahal', label: 'Harga: Tinggi ke Rendah' },
                                ]}
                                onChange={setSortBy}
                            />
                        </div>
                    </div>
                </div>

                {/* AREA UTAMA KATALOG (SIDEBAR & GRID PRODUK) */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* SIDEBAR FILTER KIRI */}
                    <div className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-xl h-fit lg:sticky lg:top-28">
                        <h3 className="font-extrabold text-sm mb-4">Kategori</h3>
                        <div className="space-y-1.5 mb-6">
                            {categoriesData.map((cat) => {
                                const active = selectedCategory === cat.label || (selectedCategory === 'Semua' && cat.label === 'Semua Kategori');
                                return (
                                    <button
                                        key={cat.label}
                                        onClick={() => setSelectedCategory(cat.label === 'Semua Kategori' ? 'Semua' : cat.label)}
                                        className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs transition duration-200 cursor-pointer ${
                                            active ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/60' : 'text-slate-600 hover:bg-slate-50 font-medium'
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

                        <hr className="border-slate-100 mb-6" />

                        <h3 className="font-extrabold text-sm mb-4">Rentang Harga Maksimal</h3>
                        <input
                            type="range"
                            className="w-full accent-emerald-600"
                            min="0"
                            max={absoluteMaxPrice || 500000}
                            step="1000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                        />
                        <div className="flex justify-between text-xs mt-2 font-bold text-slate-700">
                            <span className="bg-slate-100 px-2 py-1 rounded-md border border-slate-200">Rp 0</span>
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-200">Rp {maxPrice.toLocaleString('id-ID')}</span>
                        </div>

                        <div className="flex gap-2 mt-8 pt-4 border-t border-slate-100">
                            <button onClick={handleReset} className="flex flex-1 items-center justify-center gap-1 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition">
                                <RotateCcw className="size-3.5" /> Reset Filter
                            </button>
                        </div>
                    </div>

                    {/* GRID PRODUK KANAN */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-slate-100 mb-6 shadow-sm">
                            <p className="text-sm font-medium text-slate-600">Menampilkan <span className="font-bold text-emerald-600">{filteredProducts.length} Produk</span></p>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((p) => {
                                    const cartItem = cartItems.find(item => item.id === p.id);

                                    return (
                                        <article key={p.id} className="group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

                                            <Link href={`/umkm/${p.seller_username}`} className="aspect-[4/3] bg-slate-100 relative overflow-hidden block">
                                                {p.foto ? (
                                                    <img
                                                        src={`/${p.foto}`}
                                                        alt={p.nama_produk}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <Package className="size-12" />
                                                    </div>
                                                )}
                                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 px-3 py-1.5 rounded-full shadow-sm">
                                                    {p.kategori}
                                                </span>
                                            </Link>

                                            <div className="p-5 flex flex-col flex-1">
                                                <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                                    {p.nama_produk}
                                                </h3>

                                                <Link href={`/umkm/${p.seller_username}`} className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1.5 mb-4 mt-1 transition font-medium">
                                                    <Store className="size-3.5" />
                                                    <span className="truncate">{p.seller}</span>
                                                </Link>

                                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                                    <p className="text-base font-extrabold text-emerald-600">
                                                        Rp {Number(p.harga).toLocaleString('id-ID')}
                                                    </p>

                                                    {cartItem ? (
                                                        <div className="flex items-center border border-emerald-200 rounded-xl p-0.5 bg-emerald-50 h-9">
                                                            <button
                                                                onClick={() => {
                                                                    if (cartItem.quantity <= 1) {
                                                                        removeFromCart(p.id);
                                                                    } else {
                                                                        updateQuantity(p.id, -1);
                                                                    }
                                                                }}
                                                                className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition cursor-pointer"
                                                            >
                                                                <Minus className="size-3.5" />
                                                            </button>
                                                            <span className="min-w-[20px] text-center text-xs font-bold text-emerald-800">
                                                                {cartItem.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(p.id, 1)}
                                                                className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition cursor-pointer"
                                                            >
                                                                <Plus className="size-3.5" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => addToCart(p)}
                                                            className="flex items-center justify-center size-9 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-colors active:scale-95 shadow-sm cursor-pointer"
                                                            title="Tambah ke Keranjang"
                                                        >
                                                            <Plus className="size-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[1.75rem] text-slate-500 bg-white">
                                <div className="bg-slate-50 p-4 rounded-full mb-4 border border-slate-100 shadow-inner">
                                    <Store className="size-8 text-slate-300" />
                                </div>
                                <h3 className="font-extrabold text-slate-800 text-base mb-1">Produk tidak ditemukan</h3>
                                <p className="text-xs text-slate-500 max-w-sm text-center">Silakan sesuaikan filter pencarian atau rentang harga yang Anda pilih.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* DRAWER KERANJANG BELANJA */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" />
                    <div className="absolute inset-y-0 right-0 flex max-w-full pl-3 sm:pl-10">
                        <div className="w-screen max-w-md transform bg-white shadow-2xl transition-all duration-300 flex flex-col h-full border-l border-slate-100 rounded-l-[1.5rem] sm:rounded-l-[2rem]">

                            <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-tl-[1.5rem] sm:rounded-tl-[2rem]">
                                <div className="flex items-center gap-2">
                                    <ShoppingBag className="size-5 text-emerald-600" />
                                    <h2 className="text-base sm:text-lg font-bold text-slate-900">Keranjang Belanja ({totalItems})</h2>
                                </div>
                                <button onClick={() => setIsCartOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer">
                                    <X className="size-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                                {cartItems.length > 0 ? (
                                    cartByStore.map((store) => {
                                        const storeSubtotal = store.items.reduce((sum, item) => sum + item.harga * item.quantity, 0);

                                        return (
                                        <section key={`${store.name}-${store.phone ?? 'no-phone'}`} className="overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/30">
                                            <div className="flex items-center justify-between gap-3 border-b border-emerald-100 bg-emerald-50 px-4 py-3">
                                                <div className="min-w-0">
                                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Pesanan dari</p>
                                                    <h3 className="truncate text-sm font-bold text-slate-900">{store.name}</h3>
                                                </div>
                                                <span className="shrink-0 text-xs font-semibold text-emerald-700">{store.items.reduce((sum, item) => sum + item.quantity, 0)} produk</span>
                                            </div>
                                            <div className="space-y-3 p-3">
                                            {store.items.map((item) => (
                                        <div key={item.id} className="flex gap-3 sm:gap-4 items-center border border-slate-100 p-3 rounded-2xl bg-white shadow-xs">
                                            <div className="size-14 sm:size-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center text-slate-300">
                                                {item.foto ? <img src={`/${item.foto}`} alt={item.nama_produk} className="w-full h-full object-cover" /> : <Package className="size-6" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{item.nama_produk}</h4>
                                                <p className="text-[11px] text-slate-400 font-medium mb-1 truncate">{item.seller || item.kategori}</p>
                                                <p className="text-xs sm:text-sm font-extrabold text-emerald-600">Rp {(item.harga * item.quantity).toLocaleString('id-ID')}</p>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 shrink-0">
                                                <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 shadow-inner">
                                                    <button
                                                        onClick={() => {
                                                            if (item.quantity <= 1) {
                                                                removeFromCart(item.id);
                                                            } else {
                                                                updateQuantity(item.id, -1);
                                                            }
                                                        }}
                                                        className="p-1 hover:text-emerald-600 transition cursor-pointer"
                                                    >
                                                        <Minus className="size-3" />
                                                    </button>
                                                    <span className="px-1.5 text-xs font-bold text-slate-800">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-emerald-600 transition cursor-pointer"><Plus className="size-3" /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-500 p-1 transition cursor-pointer" title="Hapus"><Trash2 className="size-3.5" /></button>
                                            </div>
                                        </div>
                                            ))}
                                            </div>
                                            <div className="border-t border-emerald-100 bg-white px-4 py-3">
                                                <div className="mb-3 flex items-center justify-between text-xs">
                                                    <span className="font-semibold text-slate-500">Subtotal {store.name}</span>
                                                    <span className="font-extrabold text-emerald-700">Rp {storeSubtotal.toLocaleString('id-ID')}</span>
                                                </div>
                                                <button onClick={() => orderStoreViaWhatsApp(store)} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700">
                                                    Pesan ke {store.name} <ArrowRight className="size-4" />
                                                </button>
                                            </div>
                                        </section>
                                        );
                                    })
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                                        <ShoppingBag className="size-12 text-slate-200 mb-2" />
                                        <p className="text-sm font-medium">Keranjang belanja kosong</p>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-slate-100 p-4 sm:p-6 bg-slate-50/50 rounded-bl-[1.5rem] sm:rounded-bl-[2rem] space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between text-slate-900">
                                    <span className="text-xs sm:text-sm font-semibold text-slate-500">Total Pembayaran:</span>
                                    <span className="text-lg sm:text-xl font-black text-emerald-700">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                </div>

                                {cartItems.length > 0 && <p className="text-center text-xs leading-relaxed text-slate-500">Pesan setiap toko melalui tombol WhatsApp pada bagian toko masing-masing.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FLOATING CART BUTTON */}
            {totalItems > 0 && !isCartOpen && (
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 sm:px-5 sm:py-4 text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 hover:scale-105 transition-all duration-300 animate-bounce cursor-pointer"
                >
                    <ShoppingBag className="size-4.5 sm:size-5" />
                    <span className="text-xs sm:text-sm font-bold">Keranjang ({totalItems})</span>
                </button>
            )}

            {/* FOOTER PEKAT */}
            <footer id="kontak" className="bg-emerald-950 text-emerald-100">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 border border-slate-200 shadow-xs shrink-0">
                                <img
                                    src="/images/Logo DesaMandalamekar.png"
                                    alt="Logo Desa Mandalamekar"
                                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                                    className="size-full object-contain"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-white">UMKM Desa Mandalamekar</p>
                                <p className="text-xs font-medium text-emerald-200/70">Portal produk lokal desa</p>
                            </div>
                        </div>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-emerald-200/80">
                            Situs ini dibuat untuk memperkenalkan produk unggulan, membantu promosi, dan memperluas jangkauan pasar UMKM Desa Mandalamekar secara digital.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                            <p className="text-sm font-bold text-white">Kontak Resmi</p>
                            <p className="mt-2 text-xs leading-relaxed text-emerald-200/80">Hubungi perangkat desa atau pengelola UMKM melalui kanal resmi.</p>
                            <div className="mt-4 flex gap-3 text-white">
                                <a href="#" className="flex size-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition"><Facebook className="size-4" /></a>
                                <a href="#" className="flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"><Instagram className="size-4" /></a>
                                <a href="#" className="flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"><MessageCircle className="size-4" /></a>
                            </div>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-emerald-900/60 p-5 backdrop-blur-md">
                            <p className="text-sm font-bold text-emerald-300">Dukungan Lokal</p>
                            <p className="mt-2 text-xs leading-relaxed text-emerald-100/80">Dukung produk lokal, bagikan ke warga, dan ikut memajukan ekonomi desa bersama.</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 py-6 text-center text-xs font-medium text-emerald-200/60 px-4">
                    © 2026 UMKM Desa Mandalamekar <span className="whitespace-nowrap">Kecamatan Cimenyan Kabupaten Bandung Provinsi Jawa Barat</span>. Universitas Yarsi.
                </div>
            </footer>
        </div>
    );
}
