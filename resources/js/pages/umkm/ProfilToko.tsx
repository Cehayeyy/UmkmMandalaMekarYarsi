import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, LogOut, Menu, Package, Store, Tag, Save, User as UserIcon, ShoppingBag, ImageIcon
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

// Tipe data yang diperbarui sesuai kolom database baru
interface UserData {
    id: number;
    name: string;
    username: string;
    foto_toko?: string | null;
    deskripsi_toko?: string | null;
    no_whatsapp?: string | null;
    alamat_toko?: string | null; // 🛠️ Menambahkan field alamat_toko
}

export default function ProfilToko({ user }: { user: UserData }) {
    const { auth } = usePage<SharedData>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Preview foto di area form
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.foto_toko ? `/${user.foto_toko}` : null);

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        deskripsi_toko: user.deskripsi_toko || '',
        no_whatsapp: user.no_whatsapp || '',
        alamat_toko: user.alamat_toko || '', // 🛠️ Mengikat data alamat_toko ke form
        foto_toko: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('umkm.profil.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('foto_toko', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Head title="Profil Toko" />
            <div className="flex min-h-screen bg-slate-50 text-slate-900">
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
                        <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-emerald-600 text-white shadow-md">
                            {user.foto_toko ? (
                                <img src={`/${user.foto_toko}`} alt="Logo Toko" className="h-full w-full object-cover" />
                            ) : (
                                <Store className="size-6" />
                            )}
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Panel Toko</p>
                            <p className="text-base font-bold leading-tight text-white truncate w-48">{user.name}</p>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1">
                        <Link
                            href={route('umkm.dashboard')}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <LayoutDashboard className="size-4" /> Dashboard Toko
                        </Link>

                        <Link
                            href={route('umkm.produk.index')}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <Package className="size-4" /> Produk Saya
                        </Link>

                        <Link
                            href={route('umkm.produk.daftar')}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition"
                        >
                            <ShoppingBag className="size-4" /> Daftar Produk Saya
                        </Link>

                        <Link
                            href={route('umkm.profil.edit')}
                            onClick={() => setIsMobileMenuOpen(false)}
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
                <div className="flex min-w-0 flex-1 flex-col lg:ml-72">
                    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 shadow-sm transition hover:bg-slate-50 lg:hidden"
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Buka navigasi"
                            >
                                <Menu className="size-5" />
                            </button>
                            <h1 className="text-xl font-bold text-slate-900">Pengaturan Profil Toko</h1>
                        </div>
                    </header>

                    <main className="min-w-0 w-full max-w-4xl p-4 sm:p-6 lg:p-8">
                        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 sm:p-8 shadow-sm shadow-slate-200/60">

                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                                <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                    <UserIcon className="size-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Informasi Dasar</h2>
                                    <p className="text-sm text-slate-500">Perbarui nama toko, banner, dan cerita UMKM Anda.</p>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Banner / Foto Toko</label>
                                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                        <div className="relative flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-inner">
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Preview Banner" className="h-full w-full object-cover" />
                                            ) : (
                                                <ImageIcon className="size-8 text-slate-300" />
                                            )}
                                        </div>
                                        <div className="flex-1 w-full">
                                            <input
                                                id="foto_toko"
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoChange}
                                                className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-500 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                                            />
                                            <p className="mt-2 text-[11px] text-slate-500">Maks. 3MB (JPEG, PNG, JPG). Rekomendasi rasio gambar lanskap.</p>
                                            {errors.foto_toko && <p className="mt-1 text-xs text-rose-500">{errors.foto_toko}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
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
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Username Login (Tetap)</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border-slate-200 bg-slate-100 text-slate-500 px-4 py-3 sm:text-sm cursor-not-allowed"
                                            value={`@${user.username}`}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="no_whatsapp" className="block text-sm font-medium text-slate-700 mb-2">
                                        Nomor WhatsApp (Untuk menerima pesanan)
                                    </label>
                                    <div className="flex rounded-xl shadow-sm">
                                        <span className="inline-flex items-center rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 px-4 text-slate-500 sm:text-sm font-bold">
                                            +62
                                        </span>
                                        <input
                                            id="no_whatsapp"
                                            type="text"
                                            className="w-full rounded-none rounded-r-xl border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-4 py-3 bg-slate-50"
                                            placeholder="81234567890 (Tanpa angka 0 di depan)"
                                            value={data.no_whatsapp}
                                            onChange={(e) => setData('no_whatsapp', e.target.value)}
                                        />
                                    </div>
                                    <p className="mt-2 text-[11px] text-slate-500">Pastikan nomor aktif dan terhubung ke WhatsApp.</p>
                                    {errors.no_whatsapp && <p className="mt-2 text-sm text-red-600">{errors.no_whatsapp}</p>}
                                </div>

                                {/* 🛠️ INPUT ALAMAT TOKO */}
                                <div className="mt-6">
                                    <label htmlFor="alamat_toko" className="block text-sm font-medium text-slate-700 mb-2">Alamat Lengkap Toko</label>
                                    <input
                                        id="alamat_toko"
                                        type="text"
                                        placeholder="Contoh: Jl. Pasir Angin RT 01/02, Desa Mandalamekar"
                                        className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-4 py-3 bg-slate-50"
                                        value={data.alamat_toko}
                                        onChange={(e) => setData('alamat_toko', e.target.value)}
                                    />
                                    {errors.alamat_toko && <p className="mt-2 text-sm text-red-600">{errors.alamat_toko}</p>}
                                </div>

                                <div>
                                    <label htmlFor="deskripsi_toko" className="block text-sm font-medium text-slate-700 mb-2">Deskripsi Toko Singkat</label>
                                    <textarea
                                        id="deskripsi_toko"
                                        rows={3}
                                        placeholder="Tuliskan cerita singkat toko, produk andalan, atau moto usaha Anda..."
                                        className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm px-4 py-3 bg-slate-50 resize-none"
                                        value={data.deskripsi_toko}
                                        onChange={(e) => setData('deskripsi_toko', e.target.value)}
                                    />
                                    {errors.deskripsi_toko && <p className="mt-2 text-sm text-red-600">{errors.deskripsi_toko}</p>}
                                </div>

                                <div className="pt-6 flex justify-end border-t border-slate-100">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition"
                                    >
                                        <Save className="size-4" />
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan Profil'}
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
