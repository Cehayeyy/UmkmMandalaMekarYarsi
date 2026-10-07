import { type SharedData } from '@/types';
import { PublicMobileNav } from '@/components/PublicMobileNav';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, MapPin, Search, ShoppingBag, Sprout, Store, Users, Facebook, Instagram, Phone } from 'lucide-react';
import { useState, useMemo } from 'react';

const navItems = [
    { label: 'Beranda', routeName: 'home' },
    { label: 'UMKM', routeName: 'umkm.umkmPage' },
    { label: 'Produk', routeName: 'produk' },
    { label: 'Tentang Desa', routeName: 'tentangdesa' },
    { label: 'Kontak', routeName: 'kontak' },
];

interface Product { id: number; nama_produk: string; kategori: string; harga: number; }
interface UmkmUser { id: number; name: string; username: string; foto_toko?: string | null; deskripsi_toko?: string | null; alamat_toko?: string | null; products?: Product[]; }

export default function UmkmIndex({ umkmList = [] }: { umkmList?: UmkmUser[] }) {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = Boolean(auth?.user && typeof auth.user === 'object' && 'id' in auth.user && auth.user.id);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const [currentPage, setCurrentPage] = useState(1);

    // LOGIKA KATEGORI DINAMIS
    const dynamicCategoryFilters = useMemo(() => {
        const uniqueCategories = new Set<string>();
        umkmList.forEach(umkm => {
            umkm.products?.forEach(p => {
                if (p.kategori) uniqueCategories.add(p.kategori);
            });
        });
        return ['Semua Kategori', ...Array.from(uniqueCategories)];
    }, [umkmList]);

    const filteredUmkmList = useMemo(() => {
        return umkmList.filter((umkm) => {
            const matchesSearch = umkm.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'Semua Kategori' || (umkm.products?.some(
                (product) => product.kategori.toLowerCase() === selectedCategory.toLowerCase()
            ) ?? false);
            return matchesSearch && matchesCategory;
        });
    }, [umkmList, searchQuery, selectedCategory]);

    const totalProductsCount = useMemo(() => {
        return umkmList.reduce((acc, current) => acc + (current.products?.length || 0), 0);
    }, [umkmList]);

    const totalCategoriesCount = dynamicCategoryFilters.length - 1;

    const itemsPerPage = 8;
    const totalPages = Math.ceil(filteredUmkmList.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUmkmList = filteredUmkmList.slice(indexOfFirstItem, indexOfLastItem);

    const stats = [
        { icon: Users, value: String(umkmList.length), label: 'UMKM Aktif' },
        { icon: ShoppingBag, value: String(totalProductsCount), label: 'Produk Total' },
        { icon: LayoutGrid, value: String(totalCategoriesCount || 0), label: 'Kategori Produk' },
        { icon: MapPin, value: 'Mandala Mekar', label: 'Desa' },
    ];

    const getCardGradient = (id: number) => {
        const gradients = ['from-amber-200 to-orange-300', 'from-orange-200 to-amber-300', 'from-yellow-200 to-emerald-300', 'from-teal-200 to-emerald-300', 'from-rose-200 to-orange-300'];
        return gradients[id % gradients.length];
    };

    return (
        <>
            <Head title="UMKM Desa Mandalamekar">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] text-slate-900">
                <header className="sticky top-0 z-50 border-b border-white/70 bg-white/95 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                        {/* KIRI HEADER: LOGO DESA */}
                        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            <div className="flex size-10 sm:size-11 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-md border border-slate-100 shrink-0">
                                <img
                                    src="/images/Logo DesaMandalamekar.png"
                                    alt="Logo Desa Mandalamekar"
                                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                                    className="size-full object-contain drop-shadow-xs"
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700">UMKM</p>
                                <p className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 truncate">
                                    <span className="hidden sm:inline">Desa Mandalamekar, </span>Kab. Bandung
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden items-center gap-8 lg:flex">
                            {navItems.map((item) => (
                                <Link key={item.label} href={route(item.routeName)} className={`text-sm transition ${item.routeName === 'umkm.umkmPage' ? 'font-semibold text-emerald-600' : 'font-medium text-slate-600 hover:text-emerald-700'}`}>{item.label}</Link>
                            ))}
                        </nav>
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <PublicMobileNav activeRouteName="umkm.umkmPage" />
                            {/* TOMBOL LOGIN MURNI - MEMAKAI TAG <a> AGAR FULL REFRESH */}
                            <a href={route('login')} className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold text-white shadow-lg transition hover:bg-emerald-700">
                                <span>Login</span> 
                                <ArrowRight className="size-3.5 sm:size-4" />
                            </a>
                        </div>
                    </div>
                </header>

                <main>
                    {/* HERO BANNER UTAMA */}
                    <section id="beranda" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">

                            {/* GAMBAR BANNER */}
                            <img
                                src="/images/Banner UMKM.jpg"
                                alt="Banner UMKM Desa Mandalamekar"
                                style={{ imageRendering: '-webkit-optimize-contrast' }}
                                className="absolute inset-0 size-full object-cover object-[60%_center] sm:object-center"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent sm:bg-gradient-to-l sm:from-slate-950/80 sm:via-slate-950/40" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_40%)]" />

                            {/* BADGE LOGO */}
                            <div className="absolute bottom-8 left-8 z-10 hidden sm:inline-flex items-center gap-5 rounded-full border border-white/30 bg-slate-950/60 px-7 py-4 backdrop-blur-md shadow-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="size-16 sm:size-[4.5rem] overflow-hidden rounded-full bg-white p-2 shrink-0 shadow-md ring-2 ring-white/20">
                                        <img
                                            src="/images/Logo DesaMandalamekar.png"
                                            alt="Logo Desa"
                                            style={{ imageRendering: '-webkit-optimize-contrast' }}
                                            className="size-full object-contain"
                                        />
                                    </div>
                                    <div className="size-16 sm:size-[4.5rem] overflow-hidden rounded-full bg-white p-2 shrink-0 shadow-md ring-2 ring-white/20">
                                        <img
                                            src="/images/Logo Universitas_YARSI.jpg"
                                            alt="Logo Yarsi"
                                            style={{ imageRendering: '-webkit-optimize-contrast' }}
                                            className="size-full object-contain"
                                        />
                                    </div>
                                </div>
                                <span className="whitespace-nowrap text-sm sm:text-base font-bold tracking-wide text-emerald-200 border-l border-white/20 pl-5">
                                    Desa Mandalamekar & Universitas Yarsi
                                </span>
                            </div>

                            {/* CONTAINER GRID TEKS BANNER */}
                            <div className="relative grid min-h-[460px] items-end pb-8 sm:min-h-[500px] sm:pb-12 px-6 sm:px-10 lg:grid-cols-2 lg:px-12 z-10">
                                <div className="max-w-2xl lg:col-start-2 lg:justify-self-end text-left lg:text-right">
                                    <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl drop-shadow-md">
                                        UMKM <span className="block text-emerald-300 drop-shadow-md">Desa Mandalamekar</span>
                                    </h1>
                                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-100 font-medium drop-shadow-sm ml-auto">
                                        Kenali para pelaku usaha lokal yang berkontribusi mengembangkan dan memajukan roda ekonomi desa.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* STATS SECTION (DIBERSIHKAN DARI OVERLAP) */}
                    <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-4 rounded-[1.75rem] border border-white bg-white p-6 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex items-center gap-3.5">
                                    <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
                                        <stat.icon className="size-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-lg font-bold text-slate-900 truncate">{stat.value}</p>
                                        <p className="text-xs text-slate-500 truncate">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FILTER & SEARCH BANNER */}
                    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="relative z-30 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-[2rem] border border-emerald-100 shadow-md">
                            <div className="flex items-center gap-3 pl-1 sm:pl-2">
                                <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                                    <Store className="size-5" />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900">
                                    Semua <span className="text-emerald-600">UMKM</span>
                                </h2>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                {/* SEARCH INPUT */}
                                <div className="relative group w-full sm:w-auto">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-emerald-600/70 group-focus-within:text-emerald-700 transition-colors z-10 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                        placeholder="Cari nama UMKM..."
                                        className="w-full sm:w-64 rounded-full border border-emerald-200/70 bg-emerald-50/40 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                                    />
                                </div>

                                {/* DROPDOWN KATEGORI */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                        className={`flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                            isCategoryOpen
                                                ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                                                : 'bg-emerald-50/40 text-slate-700 border-emerald-200/70 hover:bg-emerald-100/50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 truncate">
                                            <Store className="size-4 text-emerald-600 shrink-0" />
                                            <span className="truncate">{selectedCategory}</span>
                                        </div>
                                        <ChevronDown className={`size-4 text-emerald-600 shrink-0 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isCategoryOpen && (
                                        <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-56 rounded-2xl border border-emerald-100 bg-white p-2 shadow-2xl z-50 max-h-60 overflow-y-auto">
                                            {dynamicCategoryFilters.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => { setSelectedCategory(category); setIsCategoryOpen(false); setCurrentPage(1); }}
                                                    className={`w-full text-left px-4 py-2 text-sm rounded-xl transition ${selectedCategory === category ? 'bg-emerald-600 text-white font-bold' : 'text-slate-700 hover:bg-emerald-50'}`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* LIST KARTU UMKM */}
                        {currentUmkmList.length > 0 ? (
                            <>
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {currentUmkmList.map((umkm) => (
                                        <article key={umkm.id} className="group flex flex-col bg-white rounded-3xl border border-slate-200/80 p-4 shadow-sm transition hover:shadow-md">
                                            {umkm.foto_toko ? (
                                                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden relative mb-4">
                                                    <img src={`/${umkm.foto_toko}`} alt={umkm.name} className="h-full w-full object-cover group-hover:scale-105 transition" />
                                                </div>
                                            ) : (
                                                <div className={`aspect-[4/3] w-full rounded-2xl bg-gradient-to-br ${getCardGradient(umkm.id)} flex items-center justify-center text-white/50 relative mb-4 shadow-inner`}>
                                                    <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                                                        <Store className="size-7 text-white" />
                                                    </div>
                                                </div>
                                            )}
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full">Mitra Aktif</span>
                                                <span className="text-xs text-slate-400 font-medium">{umkm.products?.length || 0} Produk</span>
                                            </div>
                                            <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1">{umkm.name}</h3>
                                            <p className="text-sm text-slate-500 mt-1 mb-4 line-clamp-2 min-h-[40px]">{umkm.deskripsi_toko || "Produk lokal UMKM Desa."}</p>
                                            <a href={`https://maps.google.com/?q=${encodeURIComponent((umkm.alamat_toko || 'Desa Mandalamekar') + ', Mandalamekar, Bandung')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-500 mb-5">
                                                <MapPin className="size-3.5 shrink-0" /><span className="truncate">{umkm.alamat_toko || 'Desa Mandalamekar'}</span>
                                            </a>
                                            <Link href={`/umkm/${umkm.username}`} className="mt-auto w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-emerald-200 bg-white py-2.5 text-sm font-bold text-emerald-600 shadow-sm hover:bg-emerald-50 transition">
                                                Lihat Produk <ArrowRight className="size-4" />
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <div className="mt-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40"><ChevronLeft className="size-4" /></button>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`flex size-9 sm:size-10 items-center justify-center rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${i + 1 === currentPage ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>{i + 1}</button>
                                        ))}
                                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40"><ChevronRight className="size-4" /></button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-16 text-center border-2 border-dashed rounded-[1.75rem] border-slate-200 bg-white/50 text-slate-500">
                                <Store className="mx-auto size-12 mb-4 text-slate-300" />
                                <p className="font-medium text-slate-700">Tidak ada UMKM yang cocok</p>
                            </div>
                        )}
                    </section>
                </main>

                <section className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2rem] bg-emerald-900 p-6 sm:p-8 text-white shadow-xl text-center md:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                            <div className="flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-800"><Store className="size-7 sm:size-8 text-emerald-400" /></div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold">Punya produk unggulan di desa?</h3>
                                <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-md">Daftarkan produk dan usaha UMKM Anda sekarang pada portal resmi desa untuk memperluas jangkauan pasar hingga ke daerah.</p>
                            </div>
                        </div>
                        {/* TOMBOL REGISTER MURNI - MEMAKAI TAG <a> AGAR FULL REFRESH */}
                        <a href={route('register')} className="w-full sm:w-auto text-center shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-900 shadow-lg transition hover:bg-emerald-50">Daftarkan UMKM Anda</a>
                    </div>
                </section>

                {/* FOOTER PEKAT */}
                <footer className="bg-emerald-950 text-emerald-100">
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 border border-slate-200 shadow-xs shrink-0">
                                    <img
                                        src="/images/Logo DesaMandalamekar.png"
                                        alt="Logo Desa Mandalamekar"
                                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                                        className="size-full object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">UMKM Desa Mandalamekar</p>
                                </div>
                            </div>
                            <p className="mt-4 max-w-xs text-sm leading-6 text-emerald-200/80">Dukung produk lokal, majukan ekonomi desa.</p>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Menu</p>
                            <ul className="mt-4 space-y-2 text-sm text-emerald-200/80">
                                {navItems.map(item => <li key={item.label}><Link href={route(item.routeName)} className="hover:text-white">{item.label}</Link></li>)}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Kontak</p>
                            <ul className="mt-4 space-y-3 text-sm text-emerald-200/80">
                                <li className="flex items-start gap-2">
                                    <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                                    <span>Desa Mandalamekar, <span className="whitespace-nowrap">Kec. Cimenyan, Kab. Bandung</span></span>
                                </li>
                                <li className="flex items-center gap-2"><Phone className="size-4 text-emerald-400" /> <span>0812-3456-7890</span></li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Ikuti Kami</p>
                            <div className="mt-4 flex gap-3">
                                <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"><Facebook className="size-4" /></a>
                                <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"><Instagram className="size-4" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 py-4 text-center text-sm text-emerald-200/70">© 2026 UMKM Desa Mandalamekar Kecamatan Cimenyan Kabupaten Bandung. Universitas Yarsi.</div>
                </footer>
            </div>
        </>
    );
}