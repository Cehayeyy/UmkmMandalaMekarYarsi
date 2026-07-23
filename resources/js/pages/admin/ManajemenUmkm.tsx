import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    MoreHorizontal,
    Package,
    Search,
    Settings,
    Shield,
    Sprout,
    Store,
    Tag,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

// PERBAIKAN: Menggunakan URL langsung (/admin/...) untuk mencegah error Ziggy
const sidebarSections = [
    {
        title: 'MANAJEMEN',
        items: [
           { label: 'Manajemen UMKM', icon: Store, hasSubmenu: false, href: '/admin/manajemen-umkm', active: false },
            { label: 'Manajemen Akun', icon: Users, hasSubmenu: false, href: '/admin/manajemen-akun', active: false },
            { label: 'Kategori Produk', icon: Tag, hasSubmenu: false, href: '/admin/kategori-produk', active: false },
            { label: 'Produk', icon: Package, hasSubmenu: false, href: '/admin/produk', active: false },
        ],
    },
    {
        title: 'PENGATURAN',
        items: [
            { label: 'Pengaturan Website', icon: Settings, hasSubmenu: false, href: '#', active: false },
        ],
    },
];

interface UmkmData {
    id: number;
    name: string;
    username: string;
    email: string;
    status: string;
    joined_at: string;
}

export default function ManajemenUmkm({ umkms = [] }: { umkms?: UmkmData[] }) {
    const { auth } = usePage<SharedData>().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['umkms'] });
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    const filteredUmkms = umkms.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Manajemen UMKM - Admin Mandalamekar" />

            <div className="flex min-h-screen bg-slate-50 text-slate-900">
                {/* SIDEBAR */}
                <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100">
                    <div className="flex items-center gap-3 px-6 py-6">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                            <Sprout className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">UMKM</p>
                            <p className="text-base font-bold leading-tight text-white">Desa Mandalamekar</p>
                            <p className="text-xs text-emerald-300">Admin Dashboard</p>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-4 pb-4">
                        {/* PERBAIKAN: Menggunakan URL langsung */}
                        <Link
                            href={route('admin.dashboard')}
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
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-white/5"
                        >
                            <LogOut className="size-4" />
                            Keluar
                        </Link>
                    </div>
                </aside>

                {/* MAIN */}
                <div className="ml-72 flex-1">
                    {/* TOPBAR */}
                    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-8 py-5 backdrop-blur-xl">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">Manajemen UMKM</h1>
                                <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500">
                                    Kelola profil dan data toko UMKM Desa Mandalamekar.
                                    <span className="flex items-center gap-1 text-xs text-emerald-600 animate-pulse bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                        <span className="size-1.5 rounded-full bg-emerald-500"></span> Live Data
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button type="button" className="relative flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50">
                                    <Bell className="size-5" />
                                </button>
                                <div className="h-8 w-px bg-slate-200" />

                                {/* PERBAIKAN: Menu Dropdown Profil yang sebelumnya terlewat */}
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

                                    {isProfileOpen ? (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                                            <div className="absolute right-0 z-20 mt-3 w-48 overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-xl shadow-slate-200/70">
                                                <Link href={route('profile.edit')} className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                                                    Profil Saya
                                                </Link>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                                                >
                                                    <LogOut className="size-4" /> Keluar
                                                </Link>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="p-8">
                        <div className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 overflow-hidden">
                            {/* Toolbar Pencarian */}
                            <div className="border-b border-slate-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                    <Store className="size-5 text-emerald-600" /> Daftar Toko UMKM
                                </h2>
                                <div className="relative w-full sm:w-72">
                                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari nama toko / pemilik..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>
                            </div>

                            {/* Tabel Data UMKM */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white text-slate-500 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Profil UMKM</th>
                                            <th className="px-6 py-4 font-semibold">Username Pemilik</th>
                                            <th className="px-6 py-4 font-semibold">Terdaftar Pada</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                            <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredUmkms.length > 0 ? (
                                            filteredUmkms.map((u) => (
                                                <tr key={u.id} className="transition hover:bg-slate-50/50 group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 text-white shadow-sm">
                                                                <Store className="size-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition">{u.name}</p>
                                                                <p className="text-xs text-slate-500">{u.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-slate-600">@{u.username}</td>
                                                    <td className="px-6 py-4 text-slate-500">{u.joined_at}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
                                                            <span className="size-1.5 rounded-full bg-emerald-500"></span> {u.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-emerald-600 transition"
                                                            title="Detail UMKM"
                                                        >
                                                            <MoreHorizontal className="size-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center">
                                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                                        <Store className="size-10 mb-3 opacity-20" />
                                                        <p className="text-base font-medium text-slate-600">Tidak ada UMKM ditemukan</p>
                                                        <p className="text-sm mt-1">Tambahkan akun UMKM baru di menu Manajemen Akun.</p>
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
