import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    Check, // <-- Tambahan icon Check
    ChevronDown,
    ChevronRight,
    Info,
    LayoutDashboard,
    LayoutGrid,
    List,
    LogOut,
    Menu,
    Package,
    Plus,
    Search,
    Settings,
    Shield,
    Store,
    Tag,
    Users,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';

const sidebarSections = [
    {
        title: 'MANAJEMEN',
        items: [
            { label: 'Manajemen UMKM', icon: Store, hasSubmenu: false, href: '/admin/manajemen-umkm', active: false },
            { label: 'Manajemen Akun', icon: Users, hasSubmenu: false, href: '/admin/manajemen-akun', active: false },
            { label: 'Produk', icon: Package, hasSubmenu: true, href: '/admin/produk', active: true },
        ],
    },
    {
        title: 'PENGATURAN',
        items: [
            { label: 'Pengaturan Website', icon: Settings, hasSubmenu: false, href: '/admin/pengaturan', active: false },
        ],
    },
];

interface ProductData {
    id: number;
    name?: string;
    price?: number | string;
    stock?: number | string;
    stok?: number | string;
    qty?: number | string;
    image?: string | null;
    status?: string;
    umkm_name?: string;
    category_name?: string;
    created_at?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: ProductData[];
    links: PaginationLink[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
}

// Interface Notifikasi
interface NotificationData {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: string;
}

export default function Produk({ products, notifications = [] }: { products?: PaginatedProducts | ProductData[], notifications?: NotificationData[] }) {
    const { auth } = usePage<SharedData>().props;

    // STATES
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'details' | 'grid'>('details');
    const [isProdukDropdownOpen, setIsProdukDropdownOpen] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // STATE UNTUK CUSTOM POP-UP (MODAL INFO)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    // ==========================================
    // STATE NOTIFIKASI REAL-TIME
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

    // FITUR REAL-TIME AUTO-POLLING (15 Detik)
    useEffect(() => {
        const interval = setInterval(() => {
            // Tambahkan polling untuk notifikasi juga
            router.reload({ only: ['products', 'notifications'] });
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    // Normalisasi data
    const productList: ProductData[] = !Array.isArray(products) && products?.data ? products.data : (Array.isArray(products) ? products : []);
    const paginationLinks: PaginationLink[] = !Array.isArray(products) && products?.links ? products.links : [];
    const uniqueCategories = Array.from(new Set(productList.map(p => p.category_name || 'Tanpa Kategori'))).sort();

    // Filter
    const filteredProducts = productList.filter((p) => {
        const name = (p.name || '').toLowerCase();
        const umkmName = (p.umkm_name || '').toLowerCase();
        const categoryName = p.category_name || 'Tanpa Kategori';
        const query = searchQuery.toLowerCase();

        const matchesSearch = name.includes(query) || umkmName.includes(query) || categoryName.toLowerCase().includes(query);
        const matchesCategory = activeCategory === null || categoryName === activeCategory;

        return matchesSearch && matchesCategory;
    });

    const displayedTotal = filteredProducts.length;

    const formatRupiah = (number: number | string | undefined) => {
        const num = Number(number) || 0;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(num);
    };

    const getImageUrl = (imagePath?: string | null) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;

        const normalizedPath = imagePath.replace(/^\//, '');

        // Foto produk dari panel UMKM disimpan di public/uploads/produk,
        // sehingga harus diakses langsung dari root aplikasi, bukan /storage.
        if (normalizedPath.startsWith('uploads/')) return `/${normalizedPath}`;

        // Tetap mendukung gambar lama yang disimpan memakai disk public Laravel.
        return normalizedPath.startsWith('storage/')
            ? `/${normalizedPath}`
            : `/storage/${normalizedPath}`;
    };

    const getStockValue = (p: ProductData) => {
        return Number(p.stock !== undefined ? p.stock : (p.stok !== undefined ? p.stok : (p.qty !== undefined ? p.qty : 0))) || 0;
    };

    return (
        <>
            <Head title="Manajemen Produk - Admin Mandalamekar" />

            <div className="flex min-h-screen bg-slate-50 text-slate-900 w-full overflow-hidden">

                {/* OVERLAY GELAP UNTUK MOBILE */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* SIDEBAR */}
                <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-emerald-950 text-emerald-100 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center justify-between px-6 py-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-900/50">
                                <Package className="size-6" />
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
                        <Link href="/dashboard" className="mb-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-emerald-100/90 transition hover:bg-white/5">
                            <LayoutDashboard className="size-4" /> Dashboard
                        </Link>

                        {sidebarSections.map((section) => (
                            <div key={section.title} className="mb-5">
                                <p className="px-3 text-xs font-semibold tracking-[0.15em] text-emerald-400/70">{section.title}</p>
                                <div className="mt-2 space-y-1">
                                    {section.items.map((item) => {
                                        const Icon = item.icon;
                                        const isProdukMenu = item.label === 'Produk';

                                        return (
                                            <div key={item.label} className="mb-1">
                                                {isProdukMenu ? (
                                                    <div className="flex flex-col">
                                                        <button onClick={() => setIsProdukDropdownOpen(!isProdukDropdownOpen)} className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition ${item.active ? 'bg-emerald-600 font-semibold text-white shadow-md shadow-emerald-900/40' : 'text-emerald-100/90 hover:bg-white/5'}`}>
                                                            <span className="flex items-center gap-3"><Icon className="size-4" /> {item.label}</span>
                                                            <ChevronDown className={`size-4 transition-transform ${isProdukDropdownOpen ? 'rotate-180' : ''}`} />
                                                        </button>

                                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProdukDropdownOpen ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                                                            <div className="flex flex-col gap-1 pl-9 pr-2 py-1">
                                                                <button onClick={() => { setActiveCategory(null); setIsMobileMenuOpen(false); }} className={`w-full text-left rounded-lg px-3 py-2 text-xs transition ${activeCategory === null ? 'bg-white/20 text-white font-bold' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'}`}>Semua Produk</button>
                                                                {uniqueCategories.map((cat, idx) => (
                                                                    <button key={idx} onClick={() => { setActiveCategory(cat); setIsMobileMenuOpen(false); }} className={`w-full text-left rounded-lg px-3 py-2 text-xs transition line-clamp-1 ${activeCategory === cat ? 'bg-white/20 text-white font-bold' : 'text-emerald-100/70 hover:bg-white/10 hover:text-white'}`}>{cat}</button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Link href={item.href || '#'} className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition ${item.active ? 'bg-emerald-600 font-semibold text-white shadow-md shadow-emerald-900/40' : 'text-emerald-100/90 hover:bg-white/5'}`}>
                                                        <span className="flex items-center gap-3"><Icon className="size-4" /> {item.label}</span>
                                                    </Link>
                                                )}
                                            </div>
                                        );
                                    })}
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

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 w-full lg:ml-72 transition-all duration-300">

                    {/* TOPBAR */}
                    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 lg:px-8 py-4 lg:py-5 backdrop-blur-xl">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 lg:gap-0">
                                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 border border-slate-200"><Menu className="size-5" /></button>
                                <div>
                                    <h1 className="text-lg lg:text-xl font-bold tracking-tight text-slate-900 line-clamp-1">{activeCategory ? `Katalog: ${activeCategory}` : 'Manajemen Katalog'}</h1>
                                    <div className="hidden sm:flex mt-1 items-center gap-2 text-sm font-medium text-slate-500">
                                        Pantau seluruh barang dagangan UMKM
                                        <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold animate-pulse bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60"><span className="size-1.5 rounded-full bg-emerald-500"></span> Live</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 lg:gap-4">
                                {/* TOMBOL NOTIFIKASI REAL-TIME */}
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

                                <div className="hidden sm:block h-8 w-px bg-slate-200" />

                                <div className="relative">
                                    <button type="button" onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 lg:gap-3">
                                        <div className="flex size-9 lg:size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0"><Shield className="size-4 lg:size-5" /></div>
                                        <div className="text-left hidden md:block">
                                            <p className="text-sm font-semibold text-slate-900">{auth.user?.name ?? 'Super Admin'}</p>
                                            <p className="text-xs text-slate-500 uppercase">{auth.user?.role ?? 'Admin Desa'}</p>
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

                    <main className="p-4 md:p-6 lg:p-8 space-y-4 lg:space-y-6 max-w-full">

                        {/* STATS KARTU */}
                        <div className="rounded-[1.5rem] border border-emerald-100 bg-gradient-to-r from-emerald-500/10 via-white to-white p-5 lg:p-6 shadow-sm shadow-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 lg:gap-5 w-full sm:w-auto">
                                <div className="flex size-12 lg:size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                                    <Package className="size-6 lg:size-7" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs lg:text-sm font-bold uppercase tracking-wider text-emerald-800">{activeCategory ? `Item ${activeCategory}` : 'Total Produk'}</p>
                                    </div>
                                    <p className="mt-1 text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                                        {displayedTotal} <span className="text-sm lg:text-lg font-semibold text-slate-500">Barang</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* KONTEN UTAMA */}
                        <div className="rounded-2xl lg:rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 overflow-hidden w-full">
                            <div className="border-b border-slate-100 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/50">
                                <div className="flex flex-wrap items-center justify-between gap-3 w-full lg:w-auto">
                                    <h2 className="text-sm lg:text-base font-bold text-slate-800 flex items-center gap-2"><Package className="size-4 lg:size-5 text-emerald-600" /> Katalog</h2>
                                    <div className="flex items-center bg-slate-200/70 p-1 rounded-xl border border-slate-200 shrink-0">
                                        <button onClick={() => setViewMode('details')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${viewMode === 'details' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}><List className="size-3.5" /> <span className="hidden sm:block">Details</span></button>
                                        <button onClick={() => setViewMode('grid')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-sm font-bold' : 'text-slate-600'}`}><LayoutGrid className="size-3.5" /> <span className="hidden sm:block">Large Icons</span></button>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                                    <div className="relative w-full lg:w-72">
                                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Cari produk / toko..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        />
                                    </div>

                                    <button onClick={() => setIsInfoModalOpen(true)} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 shrink-0">
                                        <Plus className="size-4" /> Tambah
                                    </button>
                                </div>
                            </div>

                            {/* TABEL ATAU KARTU */}
                            {viewMode === 'details' ? (
                                <div className="overflow-x-auto w-full">
                                    <table className="w-full text-left text-sm min-w-[700px]">
                                        <thead className="bg-white text-slate-500 border-b border-slate-100">
                                            <tr>
                                                <th className="px-4 lg:px-6 py-4 font-semibold">Nama Produk</th>
                                                <th className="px-4 lg:px-6 py-4 font-semibold">Toko UMKM</th>
                                                <th className="px-4 lg:px-6 py-4 font-semibold">Kategori</th>
                                                <th className="px-4 lg:px-6 py-4 font-semibold">Harga</th>
                                                <th className="px-4 lg:px-6 py-4 font-semibold text-center">Stok</th>
                                                <th className="px-4 lg:px-6 py-4 font-semibold">Status</th>
                                                {/* Kolom Aksi dihilangkan */}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map((p) => {
                                                    const imgUrl = getImageUrl(p.image);
                                                    const stockValue = getStockValue(p);
                                                    return (
                                                        <tr key={p.id} className="transition hover:bg-slate-50/50 group">
                                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex size-10 lg:size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 overflow-hidden shadow-sm">
                                                                        {imgUrl ? <img src={imgUrl} alt={p.name} className="size-full object-cover" /> : <Package className="size-5" />}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">{p.name || 'Tanpa Nama'}</p>
                                                                        <p className="text-xs text-slate-400">ID: #{p.id}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-lg text-xs whitespace-nowrap border border-slate-200/60"><Store className="size-3.5 text-emerald-600" /> {p.umkm_name || 'UMKM Desa'}</span>
                                                            </td>
                                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full whitespace-nowrap border border-emerald-200/60"><Tag className="size-3" /> {p.category_name || 'Tanpa Kategori'}</span>
                                                            </td>
                                                            <td className="px-4 lg:px-6 py-3 lg:py-4 font-bold text-slate-800 whitespace-nowrap">{formatRupiah(p.price)}</td>
                                                            <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                                                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${stockValue <= 10 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>{stockValue}</span>
                                                            </td>
                                                            <td className="px-4 lg:px-6 py-3 lg:py-4">
                                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap ${p.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-red-50 text-red-600 border border-red-200/60'}`}><span className={`size-1.5 rounded-full ${p.status === 'Aktif' ? 'bg-emerald-500' : 'bg-red-500'}`}></span> {p.status || 'Nonaktif'}</span>
                                                            </td>
                                                            {/* Kolom Aksi dihilangkan */}
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan={6} className="py-12 text-center">
                                                        <div className="flex flex-col items-center justify-center text-slate-400"><Package className="size-10 mb-3 opacity-20" /><p className="text-base font-medium text-slate-600">Produk tidak ditemukan</p></div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-4 lg:p-6 bg-slate-50/50">
                                    {filteredProducts.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                                            {filteredProducts.map((p) => {
                                                const imgUrl = getImageUrl(p.image);
                                                const stockValue = getStockValue(p);
                                                return (
                                                    <div key={p.id} className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md">
                                                        <div>
                                                            <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-100 flex items-center justify-center">
                                                                {imgUrl ? <img src={imgUrl} alt={p.name} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" /> : <div className="flex flex-col items-center justify-center text-slate-400 gap-2"><Package className="size-8 opacity-40 text-emerald-600" /></div>}
                                                                <div className="absolute top-2 left-2 flex gap-1"><span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm backdrop-blur-md ${p.status === 'Aktif' ? 'bg-emerald-600/90 text-white' : 'bg-red-600/90 text-white'}`}>{p.status || 'Nonaktif'}</span></div>
                                                                <div className="absolute bottom-2 right-2"><span className="inline-flex items-center rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-md">Stok: {stockValue}</span></div>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <div className="flex items-center justify-between gap-2">
                                                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 truncate max-w-[120px]"><Tag className="size-2.5 shrink-0" /> {p.category_name || 'UMKM Desa'}</span>
                                                                    <span className="text-[11px] text-slate-400">#{p.id}</span>
                                                                </div>
                                                                <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">{p.name || 'Tanpa Nama'}</h3>
                                                                <p className="text-xs text-slate-500 flex items-center gap-1 truncate"><Store className="size-3.5 text-emerald-600 shrink-0" /> {p.umkm_name || 'UMKM Desa'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                                            <div>
                                                                <p className="text-[10px] text-slate-400 uppercase font-bold">Harga</p>
                                                                <p className="text-sm font-extrabold text-emerald-700">{formatRupiah(p.price)}</p>
                                                            </div>
                                                            {/* Tombol Kelola/Aksi dihilangkan dari Grid Mode */}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center"><Package className="size-12 mx-auto mb-3 text-slate-300" /><p className="text-sm font-semibold text-slate-600">Produk tidak ditemukan</p></div>
                                    )}
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            {/* MODAL CUSTOM UNTUK INFORMASI TAMBAH PRODUK */}
            {isInfoModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-sm rounded-[1.5rem] bg-white p-6 shadow-2xl text-center relative overflow-hidden">
                        {/* Dekorasi Latar */}
                        <div className="absolute -top-10 -right-10 size-32 rounded-full bg-emerald-50/50 blur-2xl"></div>

                        <div className="relative">
                            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100 shadow-sm">
                                <Info className="size-7" />
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                Informasi Akses
                            </h3>

                            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                                Untuk menjaga struktur data, fitur penambahan produk baru hanya dapat diakses melalui <strong className="text-emerald-700">Dashboard Akun masing-masing UMKM</strong>.
                            </p>

                            <button
                                onClick={() => setIsInfoModalOpen(false)}
                                className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.98]"
                            >
                                Oke, Saya Mengerti
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
