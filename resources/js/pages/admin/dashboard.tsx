import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    CalendarDays,
    Check,
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    Menu,
    Package,
    Settings,
    Shield,
    Sprout,
    Store,
    Tag,
    TrendingUp,
    Users,
    X,
    Activity,
    Mail
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Data Sidebar
const sidebarSections = [
    {
        title: 'MANAJEMEN',
        items: [
            { label: 'Manajemen UMKM', icon: Store, href: '/admin/manajemen-umkm', active: false },
            { label: 'Manajemen Akun', icon: Users, href: '/admin/manajemen-akun', active: false },
            { label: 'Produk', icon: Package, href: '/admin/produk', active: false },
            { label: 'Pesan Masuk', icon: Mail, href: '/dashboard/pesan-masuk', active: false },
        ],
    },
    {
        title: 'PENGATURAN',
        items: [
            { label: 'Pengaturan Website', icon: Settings, href: '/admin/pengaturan', active: false },
        ],
    },
];

// Interface Props
interface DashboardProps extends SharedData {
    statsData?: { totalUmkm: number; totalProduk: number; totalAkunUmkm: number; umkmAktif: number; };
    umkmTerbaru?: any[];
    akunUmkm?: any[];
    aktivitas?: any[];
    history?: Array<{
        id: number;
        title: string;
        message: string;
        time: string;
        actor: string;
        actorRole?: string | null;
        changedFields?: string[];
        event: string;
        type: string;
    }>;
    selectedDate?: string;
    notifications?: Array<{
        id: number;
        title: string;
        message: string;
        time: string;
        read: boolean;
        type: string;
    }>;
}

export default function Dashboard({ statsData, umkmTerbaru = [], aktivitas = [], history = [], notifications = [], selectedDate }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;

    // STATES RESPONSIVE & LAYOUT
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // STATE JAM & TANGGAL REAL-TIME
    const [currentDateTime, setCurrentDateTime] = useState('');

    // ==========================================
    // STATE NOTIFIKASI (OPTIMISTIC UI UPDATE)
    // ==========================================
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [localNotifications, setLocalNotifications] = useState(notifications);
    const [hasMarkedRead, setHasMarkedRead] = useState(false);

    // Mencegah data statis backend menimpa status "sudah dibaca" kita di frontend
    useEffect(() => {
        if (!hasMarkedRead) {
            setLocalNotifications(notifications);
        }
    }, [notifications, hasMarkedRead]);

    const unreadCount = localNotifications.filter(n => !n.read).length;
    const activeDate = selectedDate ?? new Date().toISOString().slice(0, 10);

    const changeHistoryDate = (date: string) => {
        if (date) router.get('/dashboard', { date }, { preserveScroll: true });
    };

    const markAllAsRead = () => {
        setHasMarkedRead(true); // Kunci agar polling tidak mereset notifikasi
        setLocalNotifications(localNotifications.map(n => ({ ...n, read: true }))); // Hilangkan titik merah/hijau instan

        router.post('/admin/notifikasi/read-all', {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    // ==========================================
    // FITUR GRAFIK LIVE (BERGERAK SETIAP 2 DETIK)
    // ==========================================
    const MAX_BARS = 24; // Jumlah batang grafik
    const [liveTraffic, setLiveTraffic] = useState<number[]>(Array(MAX_BARS).fill(0).map(() => Math.floor(Math.random() * 60) + 20));

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveTraffic(prev => {
                const nextVal = Math.floor(Math.random() * 85) + 15; // Random nilai baru 15 - 100
                return [...prev.slice(1), nextVal]; // Geser array (efek berjalan)
            });
        }, 2000); // Bergerak setiap 2 detik
        return () => clearInterval(interval);
    }, []);

    // FITUR REAL-TIME: Tanggal & Jam (Berdetak setiap 1 detik)
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
            const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setCurrentDateTime(`${dateStr} • ${timeStr}`);
        };
        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    // FITUR REAL-TIME AUTO-POLLING DATA: 15 detik
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['statsData', 'umkmTerbaru', 'akunUmkm', 'aktivitas', 'history', 'notifications'] });
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    // PEMETAAN DATA STATISTIK
    const stats = [
        { label: 'Total UMKM', value: statsData?.totalUmkm ?? 0, delta: 'Data real-time desa', icon: Sprout },
        { label: 'Total Produk', value: statsData?.totalProduk ?? 0, delta: 'Katalog terdaftar', icon: Package },
        { label: 'Total Akun UMKM', value: statsData?.totalAkunUmkm ?? 0, delta: 'Akun operator UMKM', icon: Users },
        { label: 'UMKM Aktif', value: statsData?.umkmAktif ?? 0, delta: 'Status terverifikasi', icon: Store },
    ];

    return (
        <>
            <Head title="Admin Dashboard - UMKM Desa Mandalamekar" />

            <div className="flex min-h-screen bg-slate-50 text-slate-900 w-full overflow-hidden">

                {/* OVERLAY MOBILE */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
                )}

                {/* SIDEBAR RESPONSIVE */}
                <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-emerald-950 text-emerald-100 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center justify-between px-6 py-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-900/50">
                                <Store className="size-6" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">UMKM</p>
                                <p className="text-base font-bold leading-tight text-white">Desa Mandalamekar</p>
                            </div>
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-emerald-200 hover:text-white">
                            <X className="size-6" />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-4 pb-4">
                        <Link href="/dashboard" className="mb-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold bg-emerald-600 text-white shadow-md shadow-emerald-900/40">
                            <LayoutDashboard className="size-4" /> Dashboard
                        </Link>

                        {sidebarSections.map((section) => (
                            <div key={section.title} className="mb-5">
                                <p className="px-3 text-xs font-semibold tracking-[0.15em] text-emerald-400/70">{section.title}</p>
                                <div className="mt-2 space-y-1">
                                    {section.items.map((item) => (
                                        <Link key={item.label} href={item.href || '#'} className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition text-emerald-100/90 hover:bg-white/5">
                                            <span className="flex items-center gap-3"><item.icon className="size-4" /> {item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <Link href="/logout" method="post" as="button" className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-white/5">
                            <LogOut className="size-4" /> Keluar
                        </Link>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <div className="flex-1 w-full lg:ml-72 transition-all duration-300">
                    {/* TOPBAR */}
                    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 lg:px-8 py-4 lg:py-5 backdrop-blur-xl">
                        <div className="flex items-center justify-between gap-4">

                            <div className="flex items-center gap-3 lg:gap-0">
                                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 border border-slate-200">
                                    <Menu className="size-5" />
                                </button>
                                <div>
                                    <h1 className="text-lg lg:text-xl font-bold tracking-tight text-slate-900 line-clamp-1">Selamat datang, {auth.user?.name ?? 'Admin'} 👋</h1>
                                    <p className="hidden sm:block mt-1 text-sm font-medium text-slate-500">Kelola seluruh data UMKM Desa Mandalamekar dari dashboard ini.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 lg:gap-4">
                                {/* TOMBOL NOTIFIKASI */}
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
                                            <div className="absolute right-0 z-20 mt-3 w-[calc(100vw-2rem)] sm:w-80 lg:w-96 max-w-sm overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/70 origin-top-right animate-fade-in">
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
                                                    <button onClick={() => { setIsNotificationOpen(false); router.get('/dashboard#notifikasi'); }} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 w-full py-1.5 rounded-lg hover:bg-emerald-100/50 transition">
                                                        Lihat Semua Notifikasi
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="hidden sm:block h-8 w-px bg-slate-200" />

                                {/* PROFIL DROPDOWN */}
                                <div className="relative">
                                    <button type="button" onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationOpen(false); }} className="flex items-center gap-2 lg:gap-3">
                                        <div className="flex size-9 lg:size-10 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                                            <Shield className="size-4 lg:size-5" />
                                        </div>
                                        <div className="text-left hidden md:block">
                                            <p className="text-sm font-semibold text-slate-900">{auth.user?.name ?? 'Admin Desa'}</p>
                                            <p className="text-xs text-slate-500 uppercase">{String(auth.user?.role || 'Super Admin')}</p>
                                        </div>
                                        <ChevronDown className={`size-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isProfileOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                                            <div className="absolute right-0 z-20 mt-3 w-48 overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-xl shadow-slate-200/70">
                                                <Link href="/profile" className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">Profil Saya</Link>
                                                <Link href="/logout" method="post" as="button" className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"><LogOut className="size-4" /> Keluar</Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="min-w-0 space-y-4 lg:space-y-6 overflow-x-hidden p-4 sm:p-6 lg:p-8">

                        {/* TANGGAL & JAM */}
                        <div className="flex flex-wrap justify-end gap-2">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/60 px-4 py-2 text-xs lg:text-sm font-semibold text-emerald-800 shadow-sm">
                                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                {currentDateTime || 'Memuat...'}
                            </div>
                        </div>

                        {/* KARTU STATISTIK GRID */}
                        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={stat.label} className="rounded-2xl lg:rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 hover:shadow-md transition">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="flex size-12 items-center justify-center rounded-xl lg:rounded-2xl bg-emerald-50 text-emerald-700">
                                                <Icon className="size-6" />
                                            </div>
                                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                        </div>
                                        <p className="text-3xl font-extrabold tracking-tight text-slate-900">{stat.value}</p>
                                        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
                                            <TrendingUp className="size-3.5" /> {stat.delta}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CHART + UMKM TERBARU */}
                        <div className="grid min-w-0 gap-4 lg:gap-6 xl:grid-cols-[1.6fr_1fr]">

                            {/* GRAFIK ANIMASI LIVE TRAFFIC */}
                            <div className="min-w-0 overflow-hidden rounded-2xl lg:rounded-[1.5rem] border border-slate-200 bg-white p-4 lg:p-6 shadow-sm shadow-slate-200/60 flex flex-col">
                                <div className="flex items-center justify-between gap-4 mb-4 lg:mb-6">
                                    <h2 className="text-sm lg:text-base font-bold text-slate-900 flex items-center gap-2">
                                        <Activity className="size-5 text-emerald-600" /> Aktivitas Pengunjung (Live)
                                    </h2>
                                    <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 lg:py-1.5 text-[10px] lg:text-xs font-medium text-slate-600">
                                        Live <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    </div>
                                </div>

                                {/* Area Bar Chart Bergerak */}
                                <div className="flex-1 w-full h-40 lg:h-52 flex items-end gap-1.5 pt-4 overflow-hidden relative border-b border-slate-100 pb-1">
                                    {liveTraffic.map((val, idx) => (
                                        <div key={idx} className="flex-1 bg-emerald-500/10 rounded-t-sm relative group transition-all duration-500 ease-linear" style={{ height: '100%' }}>
                                            <div
                                                className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm transition-all duration-500 ease-linear"
                                                style={{ height: `${val}%` }}
                                            ></div>
                                            {/* Tooltip Hover */}
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap transition-opacity z-10 pointer-events-none">
                                                {val} Visitor
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 flex justify-between text-[10px] lg:text-xs text-slate-400 font-medium">
                                    <span>{aktivitas.length} pengunjung tercatat baru-baru ini</span>
                                    <span className="text-emerald-600 flex items-center gap-1"><TrendingUp className="size-3" /> Stabil</span>
                                </div>
                                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                    {aktivitas.length ? aktivitas.slice(0, 4).map((visit, index) => (
                                        <div key={`${visit.name}-${index}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs">
                                            <span className="truncate font-semibold text-slate-700">{visit.name}</span>
                                            <span className="ml-2 shrink-0 text-slate-400">{visit.path} · {visit.time}</span>
                                        </div>
                                    )) : <p className="text-xs text-slate-400">Aktivitas pengunjung akan muncul setelah ada kunjungan halaman publik.</p>}
                                </div>
                            </div>

                            <div className="rounded-2xl lg:rounded-[1.5rem] border border-slate-200 bg-white p-4 lg:p-6 shadow-sm shadow-slate-200/60">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm lg:text-base font-bold text-slate-900">UMKM Terbaru</h2>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {umkmTerbaru.length > 0 ? (
                                        umkmTerbaru.map((umkm, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="flex size-10 lg:size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white/90">
                                                    <Sprout className="size-4 lg:size-5" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-xs lg:text-sm font-semibold text-slate-900">{umkm.name}</p>
                                                    <p className="text-[10px] lg:text-xs text-slate-500">{umkm.category}</p>
                                                </div>
                                                <div className="shrink-0 text-right">
                                                    <p className="text-[10px] lg:text-xs text-slate-400">Bergabung</p>
                                                    <p className="text-[10px] lg:text-xs font-medium text-slate-600">{umkm.joined}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="py-8 text-center text-xs lg:text-sm text-slate-400">Belum ada data UMKM terbaru.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <section id="riwayat" className="rounded-2xl lg:rounded-[1.5rem] border border-slate-200 bg-white p-4 lg:p-6 shadow-sm shadow-slate-200/60">
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 className="flex items-center gap-2 text-sm lg:text-base font-bold text-slate-900"><Activity className="size-5 text-emerald-600" /> Riwayat Perubahan</h2>
                                    <p className="mt-1 text-xs text-slate-500">Semua perubahan pada akun, UMKM, produk, kategori, dan pesan pada tanggal yang dipilih.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                                        <CalendarDays className="size-4 text-emerald-600" />
                                        <span className="sr-only">Pilih tanggal riwayat perubahan</span>
                                        <input
                                            type="date"
                                            value={activeDate}
                                            max={new Date().toISOString().slice(0, 10)}
                                            onChange={(event) => changeHistoryDate(event.target.value)}
                                            className="cursor-pointer bg-transparent font-semibold text-emerald-700 outline-none"
                                            aria-label="Pilih tanggal riwayat perubahan"
                                        />
                                    </label>
                                    <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">{history.length} aktivitas</span>
                                </div>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {history.length ? history.map((entry) => (
                                    <div key={entry.id} className="flex items-start gap-3 py-3">
                                        <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ${entry.event === 'delete' ? 'bg-red-100 text-red-600' : entry.event === 'create' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {entry.type === 'product' ? <Package className="size-4" /> : entry.type === 'user' ? <Users className="size-4" /> : <Activity className="size-4" />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-slate-800">{entry.title}</p>
                                            <p className="text-xs text-slate-500">{entry.message}</p>
                                            <p className="mt-1 text-[11px] text-slate-400">Oleh {entry.actor}{entry.actorRole ? ` · ${entry.actorRole}` : ''}{entry.changedFields?.length ? ` · Diubah: ${entry.changedFields.join(', ')}` : ''}</p>
                                        </div>
                                        <span className="shrink-0 text-[11px] font-medium text-slate-400">{entry.time}</span>
                                    </div>
                                )) : <p className="py-8 text-center text-sm text-slate-400">Belum ada riwayat perubahan pada tanggal ini.</p>}
                            </div>
                        </section>

                        <section id="notifikasi" className="rounded-2xl lg:rounded-[1.5rem] border border-slate-200 bg-white p-4 lg:p-6 shadow-sm shadow-slate-200/60">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h2 className="flex items-center gap-2 text-sm lg:text-base font-bold text-slate-900"><Bell className="size-5 text-emerald-600" /> Semua Notifikasi</h2>
                                {unreadCount > 0 && <button onClick={markAllAsRead} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">Tandai semua dibaca</button>}
                            </div>
                            <div className="divide-y divide-slate-100">
                                {localNotifications.length ? localNotifications.map((notif) => (
                                    <div key={notif.id} className={`flex items-start gap-3 py-3 ${!notif.read ? 'bg-emerald-50/40 -mx-2 px-2 rounded-xl' : ''}`}>
                                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Bell className="size-4" /></div>
                                        <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-800">{notif.title}</p><p className="text-xs text-slate-500">{notif.message}</p></div>
                                        <span className="shrink-0 text-[11px] text-slate-400">{notif.time}</span>
                                    </div>
                                )) : <p className="py-8 text-center text-sm text-slate-400">Belum ada notifikasi.</p>}
                            </div>
                        </section>

                    </main>
                </div>
            </div>
        </>
    );
}
