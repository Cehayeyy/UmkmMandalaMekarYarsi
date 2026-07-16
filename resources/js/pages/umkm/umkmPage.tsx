import { type SharedData } from '@/types';
    import { Head, Link, usePage } from '@inertiajs/react';
    import {
        ArrowRight,
        Check,
        ChevronDown,
        ChevronLeft,
        ChevronRight,
        Facebook,
        Instagram,
        Leaf,
        LayoutGrid,
        Mail,
        MapPin,
        Menu,
        MessageCircle,
        Phone,
        Search,
        ShoppingBag,
        Sprout,
        Store,
        UtensilsCrossed,
        Users,
        X,
    } from 'lucide-react';
    import { useState } from 'react';

    const navItems = [
        { label: 'Beranda', href: '/' },
        { label: 'UMKM', href: '/umkm' },
        { label: 'Produk', href: '/produk' },
        { label: 'Tentang Desa', href: '/#tentang' },
        { label: 'Kontak', href: '/#kontak' },
    ];

    const stats = [
        { icon: Users, value: '0', label: 'UMKM Aktif' },
        { icon: ShoppingBag, value: '0', label: 'Produk' },
        { icon: LayoutGrid, value: '0', label: 'Kategori' },
        { icon: MapPin, value: 'Mandala Mekar', label: 'Desa' },
    ];

    const categoryFilters = ['Semua Kategori', 'Makanan & Minuman', 'Kerajinan', 'Fashion', 'Lainnya'];

    // DATA DUMMY DIHAPUS (DIKOSONGKAN)
    const umkmList: any[] = [];

    export default function UmkmIndex({ umkmList: propUmkmList = [] }: { umkmList?: any[] }) {
        const { auth } = usePage<SharedData>().props;
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [isCategoryOpen, setIsCategoryOpen] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState(categoryFilters[0]);

        const listData = propUmkmList || umkmList;

        return (
            <>
                <Head title="UMKM Desa Mandalamekar">
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
                </Head>

                <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] text-slate-900">

                    {/* HEADER */}
                    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/95 backdrop-blur-xl">
                        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                                    <Sprout className="size-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-emerald-700">UMKM</p>
                                    <p className="text-lg font-bold tracking-tight">Desa Mandalamekar</p>
                                </div>
                            </Link>
                            <nav className="hidden items-center gap-8 lg:flex">
                                {navItems.map((item) => (
                                    <Link key={item.label} href={item.href} className="text-sm font-medium text-slate-600 hover:text-emerald-700">{item.label}</Link>
                                ))}
                            </nav>
                            <a href="/#kontak" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                                Login <ArrowRight className="size-4" />
                            </a>
                        </div>
                    </header>

                    <main>
                        {/* HERO */}
                        <section className="relative overflow-hidden bg-slate-900 text-white">
                            <div
                            className="absolute inset-0 bg-cover bg-center opacity-60"
                            style={{
                                backgroundImage:
                                    'linear-gradient(180deg, rgba(6,20,15,0.55) 0%, rgba(6,20,15,0.75) 100%), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80)',
                            }}
                        />
                            <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">UMKM Desa Mandalamekar</h1>
                                <p className="mt-3 text-slate-200">Kenali para pelaku usaha lokal yang berkontribusi mengembangkan ekonomi desa.</p>
                            </div>
                        </section>

                        {/* STATS */}
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

                        {/* LIST + FILTER */}
                        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                                <h2 className="text-2xl font-bold">Semua UMKM</h2>
                                <div className="flex items-center gap-3">
                                    <div className="relative"><Search className="absolute left-4 top-3 size-4 text-slate-400" /><input placeholder="Cari UMKM..." className="rounded-full border border-slate-200 py-2.5 pl-10 pr-4 text-sm" /></div>
                                    <button onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-2.5 px-4 text-sm text-slate-700"><MapPin className="size-4 text-emerald-600" />{selectedCategory}<ChevronDown className="size-4" /></button>
                                </div>
                            </div>

                            {/* GRID DINAMIS */}
                            {listData.length > 0 ? (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {listData.map((umkm, index) => (
                                        <article key={index} className="rounded-[1.5rem] border bg-white p-5 shadow-sm">
                                            <h3 className="font-bold">{umkm.name}</h3>
                                            <p className="text-sm text-slate-500">{umkm.description}</p>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-16 text-center border-2 border-dashed rounded-[1.75rem] text-slate-500">
                                    <Store className="mx-auto size-12 mb-4 text-slate-300" />
                                    <p>Belum ada data UMKM yang tersedia.</p>
                                </div>
                            )}
                        </section>
                    </main>

                    {/* FOOTER */}
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
                                    <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/10"><Facebook className="size-4" /></a>
                                    <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/10"><Instagram className="size-4" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-white/10 py-4 text-center text-sm text-emerald-200/70">© 2026 UMKM Desa Mandalamekar. Universitas Yarsi.</div>
                    </footer>
                </div>
            </>
        );
    }
