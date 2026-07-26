import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    LayoutGrid,
    List,
    LogOut,
    MoreHorizontal,
    Package,
    Plus,
    Search,
    Settings,
    Shield,
    Store,
    Tag,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const sidebarSections = [
    {
        title: 'MANAJEMEN',
        items: [
            { label: 'Manajemen UMKM', icon: Store, hasSubmenu: false, href: '/admin/manajemen-umkm', active: false },
            { label: 'Manajemen Akun', icon: Users, hasSubmenu: false, href: '/admin/manajemen-akun', active: false },
            { label: 'Kategori Produk', icon: Tag, hasSubmenu: false, href: '/admin/kategori-produk', active: false },
            { label: 'Produk', icon: Package, hasSubmenu: false, href: '/admin/produk', active: true },
        ],
    },
    {
        title: 'PENGATURAN',
        items: [
            { label: 'Pengaturan Website', icon: Settings, hasSubmenu: false, href: '/admin/pengaturan', active: false },
        ],
    },
];

interface ProductData {
    id: number;
    name?: string;
    price?: number | string;
    stock?: number | string;
    stok?: number | string;
    qty?: number | string;
    image?: string | null;
    status?: string;
    umkm_name?: string;
    category_name?: string;
    created_at?: string;
}

// Struktur data link pagination dari Laravel
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Struktur data object paginated
interface PaginatedProducts {
    data: ProductData[];
    links: PaginationLink[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
}

export default function Produk({ products }: { products?: PaginatedProducts | ProductData[] }) {
    const { auth } = usePage<SharedData>().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // STATE UNTUK TOGGLE VIEW: 'details' (Tabel) atau 'grid' (Large Icons)
    const [viewMode, setViewMode] = useState<'details' | 'grid'>('details');

    // FITUR REAL-TIME AUTO-POLLING (15 Detik)
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['products'] });
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    // BACKWARD COMPATIBILITY: Normalisasi data apakah berbentuk Paginator atau Array biasa
    const productList: ProductData[] = !Array.isArray(products) && products?.data ? products.data : (Array.isArray(products) ? products : []);
    const paginationLinks: PaginationLink[] = !Array.isArray(products) && products?.links ? products.links : [];
    const totalItems: number = !Array.isArray(products) && products?.total !== undefined ? products.total : productList.length;

    // Filter Pencarian di Halaman Aktif
    const filteredProducts = productList.filter((p) => {
        const name = (p.name || '').toLowerCase();
        const umkmName = (p.umkm_name || '').toLowerCase();
        const categoryName = (p.category_name || '').toLowerCase();
        const query = searchQuery.toLowerCase();

        return name.includes(query) || umkmName.includes(query) || categoryName.includes(query);
    });

    // Helper Formatter Rupiah
    const formatRupiah = (number: number | string | undefined) => {
        const num = Number(number) || 0;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(num);
    };

    // Helper Pembaca URL Gambar
    const getImageUrl = (imagePath?: string | null) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `/storage/${imagePath.replace(/^\//, '')}`;
    };

    // Helper Pembaca Nilai Stok Multi-Nama
    const getStockValue = (p: ProductData) => {
        return Number(p.stock !== undefined ? p.stock : (p.stok !== undefined ? p.stok : (p.qty !== undefined ? p.qty : 0))) || 0;
    };

    return (
        <>
            <Head title="Manajemen Produk - Admin Mandalamekar" />

            <div className="flex min-h-screen bg-slate-50 text-slate-900">
                {/* SIDEBAR */}
                <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100">
                    <div className="flex items-center gap-3 px-6 py-6">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-900/50">
                            <Package className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">UMKM</p>
                            <p className="text-base font-bold leading-tight text-white">Desa Mandalamekar</p>
                            <p className="text-xs text-emerald-300">Admin Dashboard</p>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-4 pb-4">
                        <Link
                            href="/dashboard"
                            className="mb-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-emerald-100/90 transition hover:bg-white/5"
                        >
                            <LayoutDashboard className="size-4" />
                            Dashboard
                        </Link>

                        {sidebarSections.map((section) => (
                            <div key={section.title} className="mb-5">
                                <p className="px-3 text-xs font-semibold tracking-[0.15em] text-emerald-400/70">{section.title}</p>
                                <div className="mt-2 space-y-1">
                                    {section.items.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href || '#'}
                                                className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
                                                    item.active
                                                        ? 'bg-emerald-600 font-semibold text-white shadow-md shadow-emerald-900/40'
                                                        : 'text-emerald-100/90 hover:bg-white/5'
                                                }`}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <Icon className="size-4" />
                                                    {item.label}
                                                </span>
                                                {item.active && <ChevronRight className="size-4 text-emerald-200" />}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-white/5"
                        >
                            <LogOut className="size-4" />
                            Keluar
                        </Link>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <div className="ml-72 flex-1">
                    {/* TOPBAR */}
                    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-8 py-5 backdrop-blur-xl">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">Manajemen Katalog Produk</h1>
                                <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500">
                                    Pantau seluruh barang dagangan dari seluruh UMKM Desa Mandalamekar.
                                    <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold animate-pulse bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                                        <span className="size-1.5 rounded-full bg-emerald-500"></span> Real-time Terhubung
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button type="button" className="relative flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50">
                                    <Bell className="size-5" />
                                    <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                                        {totalItems}
                                    </span>
                                </button>
                                <div className="h-8 w-px bg-slate-200" />

                                <div className="relative">
                                    <button type="button" onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                            <Shield className="size-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-slate-900">{auth.user?.name ?? 'Super Admin'}</p>
                                            <p className="text-xs text-slate-500 uppercase">{auth.user?.role ?? 'Admin Desa'}</p>
                                        </div>
                                        <ChevronDown className={`size-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isProfileOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                                            <div className="absolute right-0 z-20 mt-3 w-48 overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-xl shadow-slate-200/70">
                                                <Link href="/profile" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                                                    Profil Saya
                                                </Link>
                                                <Link
                                                    href="/logout"
                                                    method="post"
                                                    as="button"
                                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <LogOut className="size-4" /> Keluar
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="p-8 space-y-6">
                        {/* STATS KARTU TUNGGAL BERKURSOR (FULL WIDTH) */}
                        <div className="rounded-[1.5rem] border border-emerald-100 bg-gradient-to-r from-emerald-500/10 via-white to-white p-6 shadow-sm shadow-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-5">
                                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                                    <Package className="size-7" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold uppercase tracking-wider text-emerald-800">Total Item Produk</p>
                                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                                            Terdaftar
                                        </span>
                                    </div>
                                    <p className="mt-1 text-3xl font-extrabold text-slate-900 tracking-tight">
                                        {totalItems} <span className="text-lg font-semibold text-slate-500">Barang Dagangan</span>
                                    </p>
                                </div>
                            </div>
                            <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 w-full sm:w-auto">
                                <p className="text-xs font-medium text-slate-500">Status Indeks Katalog:</p>
                                <p className="text-sm font-bold text-emerald-700 flex items-center sm:justify-end gap-1.5 mt-0.5">
                                    <span className="size-2 rounded-full bg-emerald-500 animate-ping"></span>
                                    Aktif & Terpaginasi
                                </p>
                            </div>
                        </div>

                        {/* KONTEN UTAMA DENGAN TOOLBAR TOGGLE VIEW */}
                        <div className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 overflow-hidden">
                            <div className="border-b border-slate-100 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/50">
                                <div className="flex items-center justify-between sm:justify-start gap-4">
                                    <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                        <Package className="size-5 text-emerald-600" /> Katalog Seluruh Desa
                                    </h2>

                                    {/* BUTTON TOGGLE VIEW: DETAILS VS LARGE ICONS */}
                                    <div className="flex items-center bg-slate-200/70 p-1 rounded-xl border border-slate-200">
                                        <button
                                            type="button"
                                            onClick={() => setViewMode('details')}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                                                viewMode === 'details'
                                                    ? 'bg-white text-slate-900 shadow-sm'
                                                    : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                            title="Tampilan Rinci (Details Table)"
                                        >
                                            <List className="size-3.5" /> Details
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setViewMode('grid')}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                                                viewMode === 'grid'
                                                    ? 'bg-white text-emerald-700 shadow-sm font-bold'
                                                    : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                            title="Tampilan Gambar Besar (Large Icons Grid)"
                                        >
                                            <LayoutGrid className="size-3.5" /> Large Icons
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <div className="relative w-full sm:w-72">
                                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Cari produk di halaman ini..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => alert("Untuk menambah produk baru beserta fotonya, silakan login melalui dashboard akun masing-masing UMKM.")}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
                                    >
                                        <Plus className="size-4" /> Info Tambah
                                    </button>
                                </div>
                            </div>

                            {/* CONDITIONAL RENDERING: DETAILS TABLE VS LARGE ICONS GRID */}
                            {viewMode === 'details' ? (
                                /* MODE 1: DETAILS (TABEL RINCI) */
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-white text-slate-500 border-b border-slate-100">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Nama Produk</th>
                                                <th className="px-6 py-4 font-semibold">Toko UMKM (Pemilik)</th>
                                                <th className="px-6 py-4 font-semibold">Kategori</th>
                                                <th className="px-6 py-4 font-semibold">Harga Satuan</th>
                                                <th className="px-6 py-4 font-semibold text-center">Stok</th>
                                                <th className="px-6 py-4 font-semibold">Status</th>
                                                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((p) => {
                                                    const imgUrl = getImageUrl(p.image);
                                                    const stockValue = getStockValue(p);
                                                    return (
                                                        <tr key={p.id} className="transition hover:bg-slate-50/50 group">
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 overflow-hidden shadow-sm">
                                                                        {imgUrl ? (
                                                                            <img src={imgUrl} alt={p.name} className="size-full object-cover" />
                                                                        ) : (
                                                                            <Package className="size-5" />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition">
                                                                            {p.name || 'Tanpa Nama'}
                                                                        </p>
                                                                        <p className="text-xs text-slate-400">ID: #{p.id} • Ditambahkan {p.created_at || '-'}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg text-xs border border-slate-200/60">
                                                                    <Store className="size-3.5 text-emerald-600" /> {p.umkm_name || 'UMKM Desa'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                                                                    <Tag className="size-3" /> {p.category_name || 'Tanpa Kategori'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 font-bold text-slate-800">
                                                                {formatRupiah(p.price)}
                                                            </td>
                                                            <td className="px-6 py-4 text-center">
                                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                                                                    stockValue <= 10 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                                                                }`}>
                                                                    {stockValue}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                                    p.status === 'Aktif'
                                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                                                        : 'bg-red-50 text-red-600 border border-red-200/60'
                                                                }`}>
                                                                    <span className={`size-1.5 rounded-full ${p.status === 'Aktif' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                                                    {p.status || 'Nonaktif'}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-emerald-600 transition"
                                                                    title="Detail Produk"
                                                                >
                                                                    <MoreHorizontal className="size-4" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan={7} className="py-12 text-center">
                                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                                            <Package className="size-10 mb-3 opacity-20" />
                                                            <p className="text-base font-medium text-slate-600">Produk tidak ditemukan</p>
                                                            <p className="text-sm mt-1">Belum ada barang dagangan yang terindeks dari UMKM.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                /* MODE 2: LARGE ICONS (KARTU GAMBAR BESAR) */
                                <div className="p-6 bg-slate-50/50">
                                    {filteredProducts.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                                            {filteredProducts.map((p) => {
                                                const imgUrl = getImageUrl(p.image);
                                                const stockValue = getStockValue(p);
                                                return (
                                                    <div
                                                        key={p.id}
                                                        className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md hover:shadow-emerald-900/5"
                                                    >
                                                        <div>
                                                            {/* Box Gambar Produk */}
                                                            <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-100 flex items-center justify-center">
                                                                {imgUrl ? (
                                                                    <img
                                                                        src={imgUrl}
                                                                        alt={p.name}
                                                                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                                    />
                                                                ) : (
                                                                    <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                                                                        <Package className="size-8 opacity-40 text-emerald-600" />
                                                                        <span className="text-[11px] font-medium">No Image</span>
                                                                    </div>
                                                                )}

                                                                {/* Badge Status */}
                                                                <div className="absolute top-2 left-2 flex gap-1">
                                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm backdrop-blur-md ${
                                                                        p.status === 'Aktif'
                                                                            ? 'bg-emerald-600/90 text-white'
                                                                            : 'bg-red-600/90 text-white'
                                                                    }`}>
                                                                        {p.status || 'Nonaktif'}
                                                                    </span>
                                                                </div>

                                                                {/* Badge Stok */}
                                                                <div className="absolute bottom-2 right-2">
                                                                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
                                                                        Stok: {stockValue}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Informasi Produk */}
                                                            <div className="space-y-1.5">
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 truncate max-w-[150px]">
                                                                        <Tag className="size-2.5 shrink-0" /> {p.category_name || 'UMKM Desa'}
                                                                    </span>
                                                                    <span className="text-[11px] text-slate-400">#{p.id}</span>
                                                                </div>

                                                                <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1 text-base" title={p.name}>
                                                                    {p.name || 'Tanpa Nama'}
                                                                </h3>

                                                                <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                                                                    <Store className="size-3.5 text-emerald-600 shrink-0" /> {p.umkm_name || 'UMKM Desa'}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Footer Harga & Aksi */}
                                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                                            <div>
                                                                <p className="text-[10px] text-slate-400 uppercase font-bold">Harga Satuan</p>
                                                                <p className="text-base font-extrabold text-emerald-700">
                                                                    {formatRupiah(p.price)}
                                                                </p>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-emerald-600 hover:text-white transition shadow-sm"
                                                            >
                                                                Kelola
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="py-16 text-center">
                                            <Package className="size-12 mx-auto mb-3 text-slate-300" />
                                            <p className="text-base font-semibold text-slate-600">Belum Ada Katalog Gambar</p>
                                            <p className="text-sm text-slate-400 mt-1">Produk dari UMKM akan otomatis muncul di sini sebagai kartu gambar.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* BARIS PAGINATION OTOMATIS */}
                            {paginationLinks.length > 3 && (
                                <div className="border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
                                    <p className="text-xs text-slate-500">
                                        Menampilkan <span className="font-bold text-slate-700">{productList.length}</span> produk di halaman ini dari total <span className="font-bold text-emerald-700">{totalItems}</span> barang
                                    </p>
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {paginationLinks.map((link, idx) => {
                                            return link.url ? (
                                                <Link
                                                    key={idx}
                                                    href={link.url}
                                                    preserveScroll
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
                                                        link.active
                                                            ? 'bg-emerald-600 text-white font-bold'
                                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
