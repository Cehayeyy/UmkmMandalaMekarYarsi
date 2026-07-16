import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, LogOut, Package, Store, Tag, Sprout, TrendingUp
} from 'lucide-react';

export default function UmkmDashboard() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Dashboard Toko" />
            <div className="flex min-h-screen bg-slate-50 text-slate-900">
                {/* SIDEBAR (Warna disamakan dengan Admin: Emerald-950) */}
                <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100">
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                            <Store className="size-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Panel Toko</p>
                            <p className="text-base font-bold leading-tight text-white truncate w-48">{auth.user?.name}</p>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1">
                        <Link href={route('umkm.dashboard')} className="flex w-full items-center gap-3 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/40">
                            <LayoutDashboard className="size-4" /> Dashboard Toko
                        </Link>
                        <a href="#" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition">
                            <Package className="size-4" /> Produk Saya
                        </a>
                        <a href="#" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition">
                            <Tag className="size-4" /> Profil Toko
                        </a>
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <Link href={route('logout')} method="post" as="button" className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-white/5">
                            <LogOut className="size-4" /> Keluar
                        </Link>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <div className="ml-72 flex-1">
                    <header className="bg-white border-b border-slate-200 px-8 py-6">
                        <h1 className="text-xl font-bold text-slate-900">Dashboard Toko</h1>
                    </header>

                    <main className="p-8">
                        {/* HERO BANNER (Disesuaikan dengan warna Emerald) */}
                        <div className="rounded-[1.75rem] bg-emerald-900 p-8 text-white shadow-xl shadow-emerald-900/20 mb-8">
                            <h1 className="text-3xl font-extrabold">Selamat Datang, {auth.user?.name}! 👋</h1>
                            <p className="mt-2 text-emerald-100/80 max-w-xl">Kelola produk dan informasi toko Anda dengan mudah di sini.</p>
                        </div>

                        {/* STAT CARDS (Disesuaikan dengan gaya Admin) */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                        <Sprout className="size-5" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-500">Status Toko</p>
                                </div>
                                <p className="text-lg font-bold text-emerald-600">Aktif & Terverifikasi</p>
                            </div>

                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                        <Package className="size-5" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-500">Total Produk</p>
                                </div>
                                <p className="text-3xl font-bold text-slate-900">0</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
