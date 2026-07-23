import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    ChevronDown,
    ChevronRight,
    Coins,
    LayoutDashboard,
    LogOut,
    MoreHorizontal,
    Package,
    Plus,
    Search,
    Settings,
    Shield,
    Store,
    Tag,
    TrendingUp,
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
            { label: 'Pengaturan Website', icon: Settings, hasSubmenu: false, href: '#', active: false },
        ],
    },
];

interface ProductData {
    id: number;
    name?: string;
    price?: number;
    stock?: number;
    status?: string;
    umkm_name?: string;
    category_name?: string;
    created_at?: string;
}

export default function Produk({ products = [] }: { products?: ProductData[] }) {
    const { auth } = usePage<SharedData>().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // FITUR REAL-TIME AUTO-POLLING
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['products'] });
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    // 👇 INI BAGIAN YANG DIPERBAIKI: Menggunakan fallback (|| '') agar anti-crash jika ada data null dari database
    const filteredProducts = products.filter((p) => {
        const name = (p.name || '').toLowerCase();
        const umkmName = (p.umkm_name || '').toLowerCase();
        const categoryName = (p.category_name || '').toLowerCase();
        const query = searchQuery.toLowerCase();

        return name.includes(query) || umkmName.includes(query) || categoryName.includes(query);
    });

    // Perhitungan statistik real-time dari data tabel (dengan pengamanan angka null)
    const totalStock = products.reduce((acc, curr) => acc + (curr.stock || 0), 0);
    const totalValuation = products.reduce((acc, curr) => acc + ((curr.price || 0) * (curr.stock || 0)), 0);

    // Helper formatter Rupiah
    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number || 0);
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
                                        {products.length}
                                    </span>
                                </button>
                                <div className="h-8 w-px bg-slate-200" />

                                <div className="relative">
                                    <button type="button" onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                            <Shield className="size-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-slate-900">{auth.user?.name ?? 'Admin Desa'}</p>
                                            <p className="text-xs text-slate-500 uppercase">{auth.user?.role ?? 'Super Admin'}</p>
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
                        {/* STATS KARTU MINI */}
                        <div className="grid gap-5 sm:grid-cols-3">
                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                        <Package className="size-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Total Item Produk</p>
                                        <p className="text-2xl font-bold text-slate-900">{products.length} Barang</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Terdaftar</span>
                            </div>

                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <TrendingUp className="size-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Stok Keseluruhan</p>
                                        <p className="text-2xl font-bold text-slate-900">{totalStock} Unit</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Siap Kirim</span>
                            </div>

                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                                        <Coins className="size-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">Valuasi Stok</p>
                                        <p className="text-lg font-bold text-slate-900">{formatRupiah(totalValuation)}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Estimasi</span>
                            </div>
                        </div>

                        {/* TABEL DATA PRODUK */}
                        <div className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 overflow-hidden">
                            <div className="border-b border-slate-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                    <Package className="size-5 text-emerald-600" /> Katalog Seluruh Desa
                                </h2>

                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <div className="relative w-full sm:w-72">
                                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Cari produk / toko / kategori..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => alert("Untuk menambah produk, silakan login melalui akun masing-masing UMKM.")}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
                                    >
                                        <Plus className="size-4" /> Info Tambah
                                    </button>
                                </div>
                            </div>

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
                                            filteredProducts.map((p) => (
                                                <tr key={p.id} className="transition hover:bg-slate-50/50 group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 font-bold">
                                                                <Package className="size-5" />
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
                                                        {formatRupiah(p.price || 0)}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                                                            (p.stock || 0) <= 10 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                                                        }`}>
                                                            {p.stock || 0}
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
                                            ))
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
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
