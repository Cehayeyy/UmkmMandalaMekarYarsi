import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    Bell,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Globe,
    LayoutDashboard,
    LogOut,
    Package,
    PhoneCall,
    Save,
    Settings,
    Shield,
    Sliders,
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
            { label: 'Produk', icon: Package, hasSubmenu: false, href: '/admin/produk', active: false },
        ],
    },
    {
        title: 'PENGATURAN',
        items: [
            { label: 'Pengaturan Website', icon: Settings, hasSubmenu: false, href: '/admin/pengaturan', active: true },
        ],
    },
];

interface SettingsData {
    app_name?: string;
    app_description?: string;
    enable_register_umkm?: boolean;
    maintenance_mode?: boolean;
    contact_phone?: string;
    last_updated?: string;
}

export default function PengaturanWebsite({ settings = {} }: { settings?: SettingsData }) {
    const { auth } = usePage<SharedData>().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // STATE FORM RINGKAS (Hanya Fitur Penting)
    const [formData, setFormData] = useState({
        app_name: settings.app_name || 'UMKM Desa Mandalamekar',
        app_description: settings.app_description || 'Platform digitalisasi dan pemasaran produk UMKM unggulan Desa Mandalamekar.',
        enable_register_umkm: settings.enable_register_umkm ?? true,
        maintenance_mode: settings.maintenance_mode ?? false,
        contact_phone: settings.contact_phone || '+62 812-3456-7890',
    });

    // FITUR REAL-TIME AUTO-POLLING (15 Detik)
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['settings'] });
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    // Handle Simpan
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulasi pengiriman data secara real-time ke backend
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 4000);
        }, 800);
    };

    return (
        <>
            <Head title="Pengaturan Website - Admin Mandalamekar" />

            <div className="flex min-h-screen bg-slate-50 text-slate-900">
                {/* SIDEBAR */}
                <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100">
                    <div className="flex items-center gap-3 px-6 py-6">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-900/50">
                            <Settings className="size-6 animate-spin-slow" />
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
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">Pengaturan Sistem Website</h1>
                                <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500">
                                    Kontrol identitas dan status operasional website desa.
                                    <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold animate-pulse bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                                        <span className="size-1.5 rounded-full bg-emerald-500"></span> Live Sync
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button type="button" className="relative flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50">
                                    <Bell className="size-5" />
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

                    <main className="p-8 space-y-6 max-w-4xl">
                        {/* NOTIFIKASI BERHASIL DISIMPAN */}
                        {showSuccessMessage && (
                            <div className="flex items-center gap-3 rounded-2xl bg-emerald-600 p-4 text-white shadow-lg shadow-emerald-600/20 transition-all animate-fade-in">
                                <CheckCircle2 className="size-6 shrink-0" />
                                <div className="flex-1">
                                    <p className="font-bold text-sm">Pengaturan Berhasil Disimpan!</p>
                                    <p className="text-xs text-emerald-100">Status operasional website desa telah diperbarui secara langsung.</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-6">
                            {/* BAGIAN 1: IDENTITAS WEBSITE */}
                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 space-y-5">
                                <div className="border-b border-slate-100 pb-3">
                                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                        <Globe className="size-5 text-emerald-600" /> Identitas Website
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Nama dan deskripsi ini akan muncul pada halaman depan aplikasi desa.</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Nama Website / Aplikasi</label>
                                        <input
                                            type="text"
                                            value={formData.app_name}
                                            onChange={(e) => setFormData({ ...formData, app_name: e.target.value })}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-semibold"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Deskripsi Singkat Aplikasi</label>
                                        <textarea
                                            rows={2}
                                            value={formData.app_description}
                                            onChange={(e) => setFormData({ ...formData, app_description: e.target.value })}
                                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* BAGIAN 2: KONTROL OPERATIONAL (SANGAT PENTING) */}
                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 space-y-5">
                                <div className="border-b border-slate-100 pb-3">
                                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                        <Sliders className="size-5 text-emerald-600" /> Kontrol Fitur & Status Akses
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Atur apakah website bisa diakses warga atau sedang dalam perbaikan.</p>
                                </div>

                                <div className="space-y-4">
                                    {/* SAKLAR 1: PENDAFTARAN UMKM */}
                                    <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50">
                                        <div>
                                            <p className="font-bold text-sm text-slate-900">Buka Pendaftaran Akun UMKM Baru</p>
                                            <p className="text-xs text-slate-500 mt-0.5">Jika aktif, pelaku UMKM baru dapat mendaftar akun secara mandiri.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.enable_register_umkm}
                                                onChange={(e) => setFormData({ ...formData, enable_register_umkm: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                        </label>
                                    </div>

                                    {/* SAKLAR 2: MAINTENANCE MODE (KUNCI UTAMA) */}
                                    <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                        formData.maintenance_mode
                                            ? 'border-red-300 bg-red-50/70 shadow-sm shadow-red-500/10'
                                            : 'border-slate-200/80 bg-slate-50/50'
                                    }`}>
                                        <div className="flex items-start gap-3.5">
                                            <AlertTriangle className={`size-5 shrink-0 mt-0.5 ${formData.maintenance_mode ? 'text-red-600 animate-bounce' : 'text-slate-400'}`} />
                                            <div>
                                                <p className={`font-bold text-sm ${formData.maintenance_mode ? 'text-red-900' : 'text-slate-900'}`}>
                                                    Mode Pemeliharaan (Maintenance Mode)
                                                </p>
                                                <p className={`text-xs mt-0.5 ${formData.maintenance_mode ? 'text-red-700 font-medium' : 'text-slate-500'}`}>
                                                    {formData.maintenance_mode
                                                        ? '⚠️ PERHATIAN: Website saat ini DITUTUP untuk publik dan hanya admin yang bisa mengakses!'
                                                        : 'Jika diaktifkan, website akan ditutup sementara untuk perbaikan sistem.'}
                                                </p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.maintenance_mode}
                                                onChange={(e) => setFormData({ ...formData, maintenance_mode: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* BAGIAN 3: KONTAK DARURAT / BANTUAN */}
                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 space-y-4">
                                <div className="border-b border-slate-100 pb-3">
                                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                        <PhoneCall className="size-5 text-emerald-600" /> WhatsApp Bantuan / Admin Desa
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5">Nomor ini digunakan jika warga atau UMKM mengalami kendala login.</p>
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder="contoh: +62 812-3456-7890"
                                        value={formData.contact_phone}
                                        onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium"
                                    />
                                </div>
                            </div>

                            {/* TOMBOL SIMPAN PENGATURAN */}
                            <div className="flex items-center justify-between pt-2">
                                <p className="text-xs text-slate-400">
                                    Terakhir diperbarui: <span className="font-semibold text-slate-600">{settings.last_updated || 'Baru saja'}</span>
                                </p>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700 disabled:opacity-50"
                                >
                                    <Save className={`size-4 ${isSaving ? 'animate-spin' : ''}`} />
                                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </>
    );
}
