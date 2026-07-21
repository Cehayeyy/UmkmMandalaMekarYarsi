import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, LogOut, Package, Store, Tag, Save, User as UserIcon, ShoppingBag
} from 'lucide-react';
import { FormEventHandler } from 'react';

// Tipe data untuk properti yang dikirim dari Controller
interface UserData {
    id: number;
    name: string;
    username: string;
}

export default function ProfilToko({ user }: { user: UserData }) {
    const { auth } = usePage<SharedData>().props;

    // Inisialisasi useForm Inertia dengan data dari database
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
    });

    // Fungsi saat tombol simpan ditekan
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('umkm.profil.update'));
    };

    return (
        <>
            <Head title="Profil Toko" />
            <div className="flex min-h-screen bg-slate-50 text-slate-900">

                {/* SIDEBAR PANEL TOKO */}
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
                        {/* 1. Dashboard Toko */}
                        <Link
                            href={route('umkm.dashboard')}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <LayoutDashboard className="size-4" /> Dashboard Toko
                        </Link>

                        {/* 2. Produk Saya (Form Tambah Produk) */}
                        <Link
                            href={route('umkm.produk.index')}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <Package className="size-4" /> Produk Saya
                        </Link>

                        {/* 🛠️ 3. DITAMBAHKAN: Link ke Daftar Produk Saya */}
                        <Link
                            href={route('umkm.produk.daftar')}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <ShoppingBag className="size-4" /> Daftar Produk Saya
                        </Link>

                        {/* 4. Profil Toko (Menu Aktif Saat Ini) */}
                        <Link
                            href={route('umkm.profil.edit')}
                            className="flex w-full items-center gap-3 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/40"
                        >
                            <Tag className="size-4" /> Profil Toko
                        </Link>
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-white/5 hover:text-rose-200"
                        >
                            <LogOut className="size-4" /> Keluar
                        </Link>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <div className="ml-72 flex-1">
                    <header className="bg-white border-b border-slate-200 px-8 py-6">
                        <h1 className="text-xl font-bold text-slate-900">Pengaturan Profil Toko</h1>
                    </header>

                    <main className="p-8 max-w-4xl">
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/60">

                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                                <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                    <UserIcon className="size-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Informasi Dasar</h2>
                                    <p className="text-sm text-slate-500">Perbarui nama toko atau usaha UMKM Anda.</p>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Nama Toko / UMKM</label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-4 py-3 bg-slate-50"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Username Login (Tidak bisa diubah)</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-xl border-slate-200 bg-slate-100 text-slate-500 px-4 py-3 sm:text-sm cursor-not-allowed"
                                        value={`@${user.username}`}
                                        disabled
                                    />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition"
                                    >
                                        <Save className="size-4" />
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
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
