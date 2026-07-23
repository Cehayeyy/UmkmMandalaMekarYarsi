import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    ChevronDown,
    ChevronRight,
    FileText,
    Image as ImageIcon,
    LayoutDashboard,
    LogOut,
    MoreHorizontal,
    Package,
    Settings,
    Sprout,
    Store,
    Tag,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Struktur Sidebar yang sudah rapi
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
            { label: 'Pengaturan Website', icon: Settings, hasSubmenu: false, href: '/admin/pengaturan' },
        ],
    },
];

// Interface untuk menangkap props real-time dari Laravel
interface DashboardProps extends SharedData {
    statsData?: {
        totalUmkm: number;
        totalProduk: number;
        totalAkunUmkm: number;
        umkmAktif: number;
    };
    umkmTerbaru?: Array<{
        name: string;
        category: string;
        joined: string;
        tone: string;
    }>;
    akunUmkm?: Array<{
        id: number;
        name: string;
        owner: string;
        email: string;
        status: string;
        tone: string;
    }>;
    chartData?: Array<{
        label: string;
        value: number;
    }>;
    aktivitas?: Array<{
        icon: string;
        text: string;
        by: string;
        time: string;
    }>;
}

const CHART_WIDTH = 640;
const CHART_HEIGHT = 200;
const CHART_MAX = 80;

export default function AdminDashboard() {
    const { auth, statsData, umkmTerbaru = [], akunUmkm = [], chartData = [], aktivitas = [] } = usePage<DashboardProps>().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState('');

    // 1. FITUR REAL-TIME: Mengambil waktu & tanggal hari ini secara dinamis
    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            setCurrentDate(now.toLocaleDateString('id-ID', options));
        };
        updateDate();
        const timer = setInterval(updateDate, 60000); // Update setiap 1 menit
        return () => clearInterval(timer);
    }, []);

    // 2. FITUR REAL-TIME AUTO-POLLING: Memperbarui data dari database secara otomatis setiap 15 detik
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['statsData', 'umkmTerbaru', 'akunUmkm', 'chartData', 'aktivitas'] });
        }, 15000); // 15000 milidetic = 15 detik

        return () => clearInterval(interval);
    }, []);

    // Memetakan data statistik asli
    const stats = [
        { label: 'Total UMKM', value: statsData?.totalUmkm ?? 0, delta: 'Data real-time desa', icon: Sprout },
        { label: 'Total Produk', value: statsData?.totalProduk ?? 0, delta: 'Katalog terdaftar', icon: Package },
        { label: 'Total Akun UMKM', value: statsData?.totalAkunUmkm ?? 0, delta: 'Akun operator UMKM', icon: Users },
        { label: 'UMKM Aktif', value: statsData?.umkmAktif ?? 0, delta: 'Status terverifikasi', icon: Store },
    ];

    // Perhitungan koordinat grafik secara dinamis
    const chartPoints = chartData.map((point, index) => ({
        x: (index / Math.max(chartData.length - 1, 1)) * CHART_WIDTH,
        y: CHART_HEIGHT - Math.min(point.value / CHART_MAX, 1) * CHART_HEIGHT,
        ...point,
    }));
    const linePath = chartPoints.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`).join(' ');
    const areaPath = `${linePath} L${CHART_WIDTH},${CHART_HEIGHT} L0,${CHART_HEIGHT} Z`;

    return (
        <>
            <Head title="Admin Dashboard - UMKM Desa Mandalamekar" />

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
                        <button
                            type="button"
                            className="mb-4 flex w-full items-center gap-3 rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/40"
                        >
                            <LayoutDashboard className="size-4" />
                            Dashboard
                        </button>

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
                                                className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm text-emerald-100/90 transition hover:bg-white/5"
                                            >
                                                <span className="flex items-center gap-3">
                                                    <Icon className="size-4" />
                                                    {item.label}
                                                </span>
                                                {item.hasSubmenu ? <ChevronRight className="size-4 text-emerald-400/60" /> : null}
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
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">Selamat datang, {auth.user?.name ?? 'Admin'} 👋</h1>
                                <p className="mt-1 text-sm text-slate-500">Kelola seluruh data UMKM Desa Mandalamekar dari dashboard ini.</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    className="relative flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                                    aria-label="Notifikasi"
                                >
                                    <Bell className="size-5" />
                                    <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                                        {statsData?.totalAkunUmkm ?? 0}
                                    </span>
                                </button>

                                <div className="h-8 w-px bg-slate-200" />

                                <div className="relative">
                                    <button type="button" onClick={() => setIsProfileOpen((value) => !value)} className="flex items-center gap-3">
                                        <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-emerald-700">
                                            <Users className="size-5" />
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

                    <main className="space-y-6 p-8">
                        {/* DATE BADGE REAL-TIME */}
                        <div className="flex justify-end">
                            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/60 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
                                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                {currentDate || 'Memuat tanggal...'}
                            </div>
                        </div>

                        {/* STAT CARDS REAL-TIME */}
                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div key={stat.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 transition hover:border-emerald-500/30">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                                                <Icon className="size-6" />
                                            </div>
                                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                        </div>
                                        <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{stat.value}</p>
                                        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-emerald-600">
                                            <TrendingUp className="size-3.5" /> {stat.delta}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CHART + UMKM TERBARU REAL-TIME */}
                        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="text-base font-bold text-slate-900">Statistik Pertumbuhan UMKM</h2>
                                    <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
                                        Live Data <span className="size-1.5 rounded-full bg-emerald-500"></span>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <div className="flex flex-col justify-between py-1 text-xs text-slate-400">
                                        <span>80</span>
                                        <span>60</span>
                                        <span>40</span>
                                        <span>20</span>
                                        <span>0</span>
                                    </div>

                                    <div className="flex-1">
                                        <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} className="h-52 w-full overflow-visible">
                                            <defs>
                                                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>

                                            {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
                                                <line
                                                    key={fraction}
                                                    x1={0}
                                                    x2={CHART_WIDTH}
                                                    y1={CHART_HEIGHT * fraction}
                                                    y2={CHART_HEIGHT * fraction}
                                                    stroke="#e2e8f0"
                                                    strokeWidth={1}
                                                />
                                            ))}

                                            <path d={areaPath} fill="url(#chartFill)" />
                                            <path d={linePath} fill="none" stroke="#059669" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

                                            {chartPoints.map((point) => (
                                                <circle key={point.label} cx={point.x} cy={point.y} r={4.5} fill="#059669" stroke="white" strokeWidth={2} />
                                            ))}
                                        </svg>

                                        <div className="mt-2 flex justify-between text-xs text-slate-400">
                                            {chartData.map((point, idx) => (
                                                <span key={idx}>{point.label}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-base font-bold text-slate-900">UMKM Terbaru Terdaftar</h2>
                                    <Link href={route('admin.akun')} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                                        Lihat Semua
                                    </Link>
                                </div>

                                <div className="mt-4 space-y-4">
                                    {umkmTerbaru.length > 0 ? (
                                        umkmTerbaru.map((umkm, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${umkm.tone} text-white/80`}>
                                                    <Sprout className="size-5" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-semibold text-slate-900">{umkm.name}</p>
                                                    <p className="text-xs text-slate-500">{umkm.category}</p>
                                                </div>
                                                <div className="shrink-0 text-right">
                                                    <p className="text-xs text-slate-400">Bergabung</p>
                                                    <p className="text-xs font-medium text-slate-600">{umkm.joined}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="py-8 text-center text-sm text-slate-400">Belum ada data UMKM terbaru.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* AKUN UMKM REAL-TIME */}
                        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-base font-bold text-slate-900">Daftar Akun UMKM</h2>
                                    <Link href={route('admin.akun')} className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                                        Kelola Akun
                                    </Link>
                                </div>

                                <div className="mt-4 overflow-x-auto">
                                    <table className="w-full min-w-[560px] text-left text-sm">
                                        <thead>
                                            <tr className="text-xs font-semibold text-slate-400">
                                                <th className="pb-3 font-semibold">Nama UMKM</th>
                                                <th className="pb-3 font-semibold">Pemilik / Username</th>
                                                <th className="pb-3 font-semibold">Email</th>
                                                <th className="pb-3 font-semibold">Status</th>
                                                <th className="pb-3 font-semibold text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {akunUmkm.length > 0 ? (
                                                akunUmkm.map((akun) => (
                                                    <tr key={akun.id}>
                                                        <td className="py-3 pr-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${akun.tone} text-white/80`}>
                                                                    <Sprout className="size-4" />
                                                                </div>
                                                                <span className="font-semibold text-slate-900">{akun.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 pr-4 text-slate-600">@{akun.owner}</td>
                                                        <td className="py-3 pr-4 text-slate-600">{akun.email}</td>
                                                        <td className="py-3 pr-4">
                                                            <span
                                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                                    akun.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                                                                }`}
                                                            >
                                                                {akun.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 text-right">
                                                            <Link
                                                                href={route('admin.akun')}
                                                                className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-emerald-600"
                                                                title="Lihat Detail"
                                                            >
                                                                <MoreHorizontal className="size-4" />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="py-8 text-center text-slate-400">Belum ada akun UMKM yang terdaftar.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <Link
                                    href={route('admin.akun')}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Lihat Semua Akun di Manajemen Akun <ChevronRight className="size-4" />
                                </Link>
                            </div>

                            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-base font-bold text-slate-900">Aktivitas Sistem</h2>
                                    <span className="text-xs font-medium text-emerald-600 animate-pulse">● Live</span>
                                </div>

                                <div className="mt-4 space-y-4">
                                    {aktivitas.length > 0 ? (
                                        aktivitas.map((item, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                                    <Sprout className="size-4" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-slate-700">{item.text}</p>
                                                    <p className="text-xs text-slate-400">{item.by}</p>
                                                </div>
                                                <p className="shrink-0 text-right text-xs text-slate-400">{item.time}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="py-8 text-center text-sm text-slate-400">Belum ada aktivitas tercatat.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
