import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    AlertTriangle, // <-- Tambahan icon untuk peringatan
    Bell,
    Check,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    Clock,
    LayoutDashboard,
    LogOut,
    Menu,
    MoreHorizontal,
    Package,
    Search,
    Settings,
    Shield,
    Sprout,
    Store,
    Trash2,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const sidebarSections = [
    {
        title: 'MANAJEMEN',
        items: [
            { label: 'Manajemen UMKM', icon: Store, href: '/admin/manajemen-umkm' },
            { label: 'Manajemen Akun', icon: Users, href: '/admin/manajemen-akun' },
            { label: 'Produk', icon: Package, href: '/admin/produk' },
        ],
    },
    {
        title: 'PENGATURAN',
        items: [{ label: 'Pengaturan Website', icon: Settings, href: '/admin/pengaturan' }],
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

interface NotificationData {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: string;
}

export default function ManajemenUmkm({ umkms = [], notifications = [] }: Readonly<{ umkms?: UmkmData[], notifications?: NotificationData[] }>) {
    const { auth } = usePage<SharedData>().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // ==========================================
    // STATE NOTIFIKASI
    // ==========================================
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [localNotifications, setLocalNotifications] = useState(notifications || []);
    const [hasMarkedRead, setHasMarkedRead] = useState(false);

    useEffect(() => {
        if (!hasMarkedRead) {
            setLocalNotifications(notifications || []);
        }
    }, [notifications, hasMarkedRead]);

    const unreadCount = localNotifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setHasMarkedRead(true);
        setLocalNotifications(localNotifications.map(n => ({ ...n, read: true })));
        router.post('/admin/notifikasi/read-all', {}, { preserveScroll: true, preserveState: true });
    };

    // ==========================================
    // STATE CUSTOM MODAL HAPUS
    // ==========================================
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [umkmToDelete, setUmkmToDelete] = useState<{ id: number, name: string } | null>(null);

    // Fungsi untuk memunculkan modal
    const confirmDelete = (id: number, name: string) => {
        setUmkmToDelete({ id, name });
        setIsDeleteModalOpen(true);
    };

    // Fungsi untuk mengeksekusi penghapusan ke database
    const executeDelete = () => {
        if (!umkmToDelete) return;

        router.delete(`/admin/manajemen-umkm/${umkmToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteModalOpen(false); // Tutup modal
                setUmkmToDelete(null); // Bersihkan state
            },
        });
    };
    // ==========================================

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['umkms', 'notifications'] });
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const handleApprove = (id: number, name: string) => {
        if (confirm(`Apakah Anda yakin ingin memberikan persetujuan aktivasi untuk toko "${name}"?`)) {
            router.put(`/admin/manajemen-umkm/${id}/approve`, {}, {
                preserveScroll: true,
                onSuccess: () => alert(`Toko "${name}" berhasil diaktifkan!`),
            });
        }
    };

    const filteredUmkms = umkms.filter(
        (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <>
            <Head title="Manajemen UMKM - Admin Mandalamekar" />

            <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
                {isMobileMenuOpen && (
                    <button
                        type="button"
                        aria-label="Tutup navigasi"
                        className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center gap-3 px-6 py-6">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                            <Sprout className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">UMKM</p>
                            <p className="text-lg font-bold leading-tight text-white">Desa Mandalamekar</p>
                            <p className="text-xs text-emerald-300">Admin Dashboard</p>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-4 pb-4">
                        <Link
                            href="/dashboard"
                            onClick={() => setIsMobileMenuOpen(false)}
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
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
                                                    item.label === 'Manajemen UMKM'
                                                        ? 'bg-emerald-600 font-semibold text-white shadow-md shadow-emerald-900/40'
                                                        : 'text-emerald-100/90 hover:bg-white/5'
                                                }`}
                                            >
                                                <span className="flex items-center gap-3">
                                                    <Icon className="size-4" />
                                                    {item.label}
                                                </span>
                                                {item.label === 'Manajemen UMKM' && <ChevronRight className="size-4 text-emerald-200" />}
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

                <div className="flex min-w-0 flex-1 flex-col min-h-screen lg:ml-72">
                    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-3 sm:block">
                                <button
                                    type="button"
                                    className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 shadow-sm transition hover:bg-slate-50 lg:hidden"
                                    onClick={() => setIsMobileMenuOpen(true)}
                                    aria-label="Buka navigasi"
                                >
                                    <Menu className="size-5" />
                                </button>
                                <div>
                                    <h1 className="text-xl font-bold tracking-tight text-slate-900">Manajemen UMKM</h1>
                                    <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500">
                                        Kelola profil dan data toko UMKM Desa Mandalamekar.
                                        <span className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                                            <span className="size-1.5 rounded-full bg-emerald-500" /> Live Data
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 sm:justify-end">
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsProfileOpen(false); }}
                                        className={`relative flex size-10 items-center justify-center rounded-full border transition ${isNotificationOpen ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        <Bell className="size-5" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm border-2 border-white">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>

                                    {isNotificationOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsNotificationOpen(false)} />
                                            <div className="absolute right-0 z-20 mt-3 w-[300px] sm:w-80 lg:w-96 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/70 origin-top-right animate-fade-in">
                                                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                                                    <h3 className="font-bold text-slate-800 text-sm">Notifikasi</h3>
                                                    {unreadCount > 0 && (
                                                        <button onClick={markAllAsRead} className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition">
                                                            <Check className="size-3" /> Tandai dibaca
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="max-h-80 overflow-y-auto">
                                                    {localNotifications.length > 0 ? (
                                                        <div className="divide-y divide-slate-50">
                                                            {localNotifications.map((notif) => (
                                                                <div key={notif.id} className={`flex items-start gap-3 p-4 transition hover:bg-slate-50 ${!notif.read ? 'bg-emerald-50/30' : ''}`}>
                                                                    <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${notif.type === 'user' ? 'bg-blue-100 text-blue-600' : notif.type === 'product' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                                                                        {notif.type === 'user' ? <Users className="size-4" /> : notif.type === 'product' ? <Package className="size-4" /> : <Settings className="size-4" />}
                                                                    </div>
                                                                    <div className="flex-1 space-y-1">
                                                                        <p className={`text-sm leading-tight ${!notif.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-600'}`}>{notif.title}</p>
                                                                        <p className="text-xs text-slate-500 line-clamp-2">{notif.message}</p>
                                                                        <p className="text-[10px] font-medium text-slate-400 pt-1">{notif.time}</p>
                                                                    </div>
                                                                    {!notif.read && <div className="size-2 shrink-0 rounded-full bg-emerald-500 mt-1.5 shadow-sm" />}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="p-8 text-center">
                                                            <Bell className="size-10 mx-auto mb-3 text-slate-200" />
                                                            <p className="text-sm font-semibold text-slate-600">Semua Kosong</p>
                                                            <p className="text-xs text-slate-400 mt-1">Belum ada notifikasi baru untukmu.</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="border-t border-slate-100 p-2 text-center bg-slate-50/80">
                                                    <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 w-full py-1.5 rounded-lg hover:bg-emerald-100/50 transition">
                                                        Lihat Semua Notifikasi
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="h-8 w-px bg-slate-200" />

                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationOpen(false); }}
                                        className="flex items-center gap-3 cursor-pointer"
                                    >
                                        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                            <Shield className="size-5" />
                                        </div>
                                        <div className="text-left hidden md:block">
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
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 cursor-pointer"
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

                    <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                        <div className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
                            <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                                <h2 className="flex items-center gap-2 text-base font-bold text-slate-800">
                                    <Store className="size-5 text-emerald-600" /> Daftar Toko UMKM
                                </h2>
                                <div className="relative w-full sm:w-72">
                                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari nama toko / pemilik..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="border-b border-slate-100 bg-white text-slate-500">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Profil UMKM</th>
                                            <th className="px-6 py-4 font-semibold">Username Pemilik</th>
                                            <th className="px-6 py-4 font-semibold">Terdaftar Pada</th>
                                            <th className="px-6 py-4 font-semibold text-center">Status</th>
                                            <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredUmkms.length > 0 ? (
                                            filteredUmkms.map((u) => (
                                                <tr key={u.id} className="group transition hover:bg-slate-50/50">
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
                                                    <td className="px-6 py-4 text-center">
                                                        {u.status === 'pending' ? (
                                                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/50 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
                                                                <Clock className="size-3" /> Menunggu Persetujuan
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200/60 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                                                <CheckCircle className="size-3" /> Aktif
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {u.status === 'pending' && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleApprove(u.id, u.name)}
                                                                    className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                                                                >
                                                                    <CheckCircle className="size-3" /> Setujui
                                                                </button>
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => confirmDelete(u.id, u.name)}
                                                                className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                                                title="Hapus UMKM"
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="py-12 text-center">
                                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                                        <Store className="mb-3 size-10 opacity-20" />
                                                        <p className="text-base font-medium text-slate-600">Tidak ada UMKM ditemukan</p>
                                                        <p className="mt-1 text-sm">Tambahkan akun UMKM baru di menu Manajemen Akun.</p>
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

            {/* ========================================== */}
            {/* POP-UP CUSTOM UNTUK KONFIRMASI HAPUS */}
            {/* ========================================== */}
            {isDeleteModalOpen && umkmToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md rounded-[1.5rem] bg-white p-6 shadow-2xl relative overflow-hidden">

                        {/* Aksen Latar Blur Merah */}
                        <div className="absolute -top-10 -right-10 size-32 rounded-full bg-red-50/50 blur-2xl"></div>

                        <div className="relative">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 border border-red-200/60 shadow-sm">
                                    <AlertTriangle className="size-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 leading-tight">Hapus Data UMKM</h3>
                                    <p className="text-xs font-semibold text-red-600 mt-0.5">Tindakan ini tidak dapat dibatalkan</p>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                Apakah Anda yakin ingin menghapus seluruh data dan profil toko <strong className="text-slate-900 font-bold">"{umkmToDelete.name}"</strong> secara permanen? Semua produk yang terkait juga mungkin akan terhapus.
                            </p>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={executeDelete}
                                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 transition active:scale-[0.98]"
                                >
                                    <Trash2 className="size-4" /> Ya, Hapus Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
