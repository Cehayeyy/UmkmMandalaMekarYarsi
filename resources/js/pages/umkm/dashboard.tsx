import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    LogOut,
    Package,
    Store,
    Tag,
    Sprout,
    ShoppingBag
} from 'lucide-react';

interface Product {
    id: number;
    nama_produk: string;
    harga: number;
    kategori: string;
    deskripsi?: string;
    foto: string | null;
}

export default function UmkmDashboard({ produkList = [] }: Readonly<{ produkList?: Product[] }>) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Panel Toko - UMKM Mandalamekar" />
            <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">

                {/* SIDEBAR PANEL TOKO */}
                <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100">
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shrink-0">
                            <Store className="size-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Panel Toko</p>
                            <p className="text-base font-bold leading-tight text-white truncate">{auth.user?.name ?? 'Pemilik Toko'}</p>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                        {/* 1. Dashboard Toko (Aktif) */}
                        <Link
                            href={route('umkm.dashboard')}
                            className="flex w-full items-center gap-3 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/40"
                        >
                            <LayoutDashboard className="size-4" />
                            <span>Dashboard Toko</span>
                        </Link>

                        {/* 2. Produk Saya (Ke halaman Form Tambah Produk) */}
                        <Link
                            href={route('umkm.produk.index')}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <Package className="size-4" />
                            <span>Produk Saya</span>
                        </Link>

                        {/* 3. Daftar Produk Saya (Ke halaman Katalog Produk) */}
                        <Link
                            href={route('umkm.produk.daftar')}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <ShoppingBag className="size-4" />
                            <span>Daftar Produk Saya</span>
                        </Link>

                        {/* 4. Profil Toko */}
                        <Link
                            href={route('umkm.profil.edit')}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <Tag className="size-4" />
                            <span>Profil Toko</span>
                        </Link>
                    </nav>

                    {/* Tombol Keluar */}
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

                {/* KONTEN UTAMA DASHBOARD */}
                <div className="ml-72 flex-1 flex flex-col min-h-screen">
                    <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center sticky top-0 z-30">
                        <h1 className="text-xl font-bold text-slate-900">Dashboard Toko</h1>
                    </header>

                    <main className="p-8 flex-1 space-y-6">
                        <div className="animate-fadeIn">
                            {/* Banner Papan Ucapan Selamat Datang */}
                            <div className="rounded-[1.75rem] bg-emerald-900 p-8 text-white shadow-xl shadow-emerald-900/20 mb-8">
                                <h1 className="text-3xl font-extrabold">Selamat Datang, {auth.user?.name}! 👋</h1>
                                <p className="mt-2 text-emerald-100/80 max-w-xl">Kelola produk dan informasi toko Anda dengan mudah di sini.</p>
                            </div>

                            {/* Statistik Ringkas Toko */}
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                            <Sprout className="size-5" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-500">Status Toko</p>
                                    </div>
                                    <p className="text-lg font-bold text-emerald-600">Aktif & Terverifikasi</p>
                                </div>

                                <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                            <Package className="size-5" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-500">Total Produk</p>
                                    </div>
                                    <p className="text-3xl font-bold text-slate-900">{produkList.length}</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
