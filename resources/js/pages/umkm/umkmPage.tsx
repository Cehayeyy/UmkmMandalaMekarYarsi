import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, LayoutGrid, MapPin, Search, ShoppingBag, Sprout, Store, Users, Facebook, Instagram, Phone } from 'lucide-react';
import { useState, useMemo } from 'react';

const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'UMKM', href: '/umkm' },
    { label: 'Produk', href: '/produk' },
    { label: 'Tentang Desa', href: '/tentangdesa' },
    { label: 'Kontak', href: '/kontak' },
];

interface Product { id: number; nama_produk: string; kategori: string; harga: number; }
interface UmkmUser { id: number; name: string; username: string; foto_toko?: string | null; deskripsi_toko?: string | null; alamat_toko?: string | null; products?: Product[]; }

export default function UmkmIndex({ umkmList = [] }: { umkmList?: UmkmUser[] }) {
    const { auth } = usePage<SharedData>().props;
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const [currentPage, setCurrentPage] = useState(1);

    // 🛠️ LOGIKA KATEGORI DINAMIS: Mengekstrak semua kategori unik yang ada di produk UMKM
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

    const totalCategoriesCount = dynamicCategoryFilters.length - 1; // Kurangi Semua Kategori

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
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"><Sprout className="size-6" /></div>
                            <div><p className="text-sm font-semibold text-emerald-700">UMKM</p><p className="text-lg font-bold tracking-tight">Desa Mandalamekar</p></div>
                        </Link>
                        <nav className="hidden items-center gap-8 lg:flex">
                            {navItems.map((item) => (
                                <Link key={item.label} href={item.href} className={`text-sm transition ${item.href === '/umkm' ? 'font-semibold text-emerald-600' : 'font-medium text-slate-600 hover:text-emerald-700'}`}>{item.label}</Link>
                            ))}
                        </nav>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700">Dashboard <ArrowRight className="size-4" /></Link>
                        ) : (
                            <Link href={route('login')} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700">Login <ArrowRight className="size-4" /></Link>
                        )}
                    </div>
                </header>

                <main>
                    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
                            <div className="absolute inset-0 bg-cover bg-center opacity-100" style={{ backgroundImage: 'linear-gradient(90deg, rgba(3, 7, 18, 0.8) 0%, rgba(3, 7, 18, 0.5) 50%, rgba(3, 7, 18, 0.15) 100%), url("images/UMKM-bg.jpg")' }} />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_40%)]" />
                            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-16">
                                <div><h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">UMKM <span className="text-emerald-400">Desa Mandalamekar</span></h1><p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">Kenali para pelaku usaha lokal yang berkontribusi mengembangkan dan memajukan roda ekonomi desa.</p></div>
                            </div>
                        </div>
                    </div>

                    <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-6 rounded-[1.75rem] border border-white bg-white p-6 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><stat.icon className="size-5" /></div>
                                    <div><p className="text-lg font-bold text-slate-900">{stat.value}</p><p className="text-sm text-slate-500">{stat.label}</p></div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">Semua UMKM</h2>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-4 top-3 size-4 text-slate-400" />
                                    <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} placeholder="Cari nama UMKM..." className="rounded-full border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-emerald-500 focus:ring-emerald-500" />
                                </div>
                                <div className="relative">
                                    <button onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-2.5 px-4 text-sm text-slate-700 hover:bg-slate-50 transition">
                                        <Store className="size-4 text-emerald-600" /> {selectedCategory} <ChevronDown className="size-4" />
                                    </button>
                                    {isCategoryOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {/* 🛠️ MENAMPILKAN KATEGORI DINAMIS YANG ADA SAJA */}
                                            {dynamicCategoryFilters.map((category) => (
                                                <button key={category} onClick={() => { setSelectedCategory(category); setIsCategoryOpen(false); setCurrentPage(1); }} className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition ${selectedCategory === category ? 'bg-emerald-50 font-bold text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {currentUmkmList.length > 0 ? (
                            <>
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {currentUmkmList.map((umkm) => (
                                        <article key={umkm.id} className="group flex flex-col bg-white rounded-3xl border border-slate-200/80 p-4 shadow-sm transition hover:shadow-md">
                                            {umkm.foto_toko ? (
                                                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden relative mb-4"><img src={`/${umkm.foto_toko}`} alt={umkm.name} className="h-full w-full object-cover group-hover:scale-105 transition" /></div>
                                            ) : (
                                                <div className={`aspect-[4/3] w-full rounded-2xl bg-gradient-to-br ${getCardGradient(umkm.id)} flex items-center justify-center text-white/50 relative mb-4 shadow-inner`}><div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md"><Store className="size-7 text-white" /></div></div>
                                            )}
                                            <div className="mb-2 flex items-center justify-between"><span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full">Mitra Aktif</span><span className="text-xs text-slate-400 font-medium">{umkm.products?.length || 0} Produk</span></div>
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
                                    <div className="mt-12 flex items-center justify-center gap-2">
                                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40"><ChevronLeft className="size-4" /></button>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`flex size-10 items-center justify-center rounded-full text-sm font-bold transition-all shadow-sm ${i + 1 === currentPage ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>{i + 1}</button>
                                        ))}
                                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-40"><ChevronRight className="size-4" /></button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="py-16 text-center border-2 border-dashed rounded-[1.75rem] border-slate-200 bg-white/50 text-slate-500"><Store className="mx-auto size-12 mb-4 text-slate-300" /><p className="font-medium text-slate-700">Tidak ada UMKM yang cocok</p></div>
                        )}
                    </section>
                </main>

                <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2rem] bg-emerald-900 p-8 text-white shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-800"><Store className="size-8 text-emerald-400" /></div>
                            <div><h3 className="text-xl font-bold">Punya produk unggulan di desa?</h3><p className="text-sm text-emerald-100/80 mt-1 max-w-md">Daftarkan produk dan usaha UMKM Anda sekarang pada portal resmi desa untuk memperluas jangkauan pasar hingga ke daerah.</p></div>
                        </div>
                        <Link href="/register" className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-900 shadow-lg transition hover:bg-emerald-50">Daftarkan UMKM Anda</Link>
                    </div>
                </section>

                <footer className="bg-emerald-950 text-emerald-100">
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600 text-white"><Sprout className="size-5" /></div>
                                <p className="font-semibold text-white">UMKM Desa Mandalamekar</p>
                            </div>
                            <p className="mt-4 max-w-xs text-sm leading-6 text-emerald-200/80">Dukung produk lokal, majukan ekonomi desa.</p>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Menu</p>
                            <ul className="mt-4 space-y-2 text-sm text-emerald-200/80">
                                {navItems.map(item => <li key={item.label}><Link href={item.href} className="hover:text-white">{item.label}</Link></li>)}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Kontak</p>
                            <ul className="mt-4 space-y-3 text-sm text-emerald-200/80">
                                <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4" /> <span>Desa Mandalamekar, Kab. Bandung</span></li>
                                <li className="flex items-center gap-2"><Phone className="size-4" /> <span>0812-3456-7890</span></li>
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
                    <div className="border-t border-white/10 py-4 text-center text-sm text-emerald-200/70">© 2026 UMKM Desa Mandalamekar. Universitas Yarsi.</div>
                </footer>
            </div>
        </>
    );
}