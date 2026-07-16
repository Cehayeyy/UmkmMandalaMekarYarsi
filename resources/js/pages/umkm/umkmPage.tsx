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

// NOTE: navItems, stats, dan daftar umkmList di bawah ini masih data dummy/placeholder
// sesuai desain. Nanti tinggal diganti dengan data asli dari backend (props Inertia).
const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'UMKM', href: '/umkm' },
    { label: 'Produk', href: '/produk   ' },
    { label: 'Tentang Desa', href: '/#tentang' },
    { label: 'Kontak', href: '/#kontak' },
];

const stats = [
    { icon: Users, value: '12+', label: 'UMKM Aktif' },
    { icon: ShoppingBag, value: '56+', label: 'Produk' },
    { icon: LayoutGrid, value: '6', label: 'Kategori' },
    { icon: MapPin, value: 'Mandala Mekar', label: 'Desa' },
];

const umkmList = [
    {
        name: 'Keripik Mandala',
        category: 'Makanan & Minuman',
        description: 'Aneka keripik singkong dan pisang khas Mandalamekar.',
        location: 'Mandala Mekar',
        icon: UtensilsCrossed,
        tone: 'from-amber-100 via-orange-200 to-amber-300',
    },
    {
        name: 'Kopi Mandala',
        category: 'Makanan & Minuman',
        description: 'Kopi bubuk premium dari biji kopi pilihan lokal.',
        location: 'Mandala Mekar',
        icon: MessageCircle,
        tone: 'from-amber-100 via-stone-200 to-orange-300',
    },
    {
        name: 'Madu Hutan Murni',
        category: 'Makanan & Minuman',
        description: 'Madu murni dari hutan sekitar desa Mandalamekar.',
        location: 'Mandala Mekar',
        icon: Leaf,
        tone: 'from-amber-100 via-yellow-200 to-amber-400',
    },
    {
        name: 'Anyaman Bambu',
        category: 'Kerajinan',
        description: 'Produk anyaman bambu handmade berkualitas.',
        location: 'Mandala Mekar',
        icon: Store,
        tone: 'from-stone-100 via-amber-200 to-stone-300',
    },
    {
        name: 'Batik Mandala',
        category: 'Fashion',
        description: 'Batik tulis dan cap dengan motif khas daerah.',
        location: 'Mandala Mekar',
        icon: Sprout,
        tone: 'from-slate-200 via-slate-300 to-slate-400',
    },
    {
        name: 'Bumbu Mandala',
        category: 'Makanan & Minuman',
        description: 'Aneka bumbu dapur tradisional 100% alami.',
        location: 'Mandala Mekar',
        icon: UtensilsCrossed,
        tone: 'from-orange-100 via-amber-200 to-orange-300',
    },
    {
        name: 'Teh Daun Kelor',
        category: 'Makanan & Minuman',
        description: 'Teh herbal daun kelor untuk kesehatan alami.',
        location: 'Mandala Mekar',
        icon: Leaf,
        tone: 'from-emerald-100 via-emerald-200 to-emerald-300',
    },
    {
        name: 'Sambal Mandala',
        category: 'Makanan & Minuman',
        description: 'Aneka sambal pedas dengan rasa autentik.',
        location: 'Mandala Mekar',
        icon: UtensilsCrossed,
        tone: 'from-red-100 via-orange-200 to-red-300',
    },
];

const categoryFilters = ['Semua Kategori', 'Makanan & Minuman', 'Kerajinan', 'Fashion', 'Lainnya'];

export default function UmkmIndex() {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(categoryFilters[0]);

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
                            {navItems.map((item) => {
                                const isActive = item.label === 'UMKM';
                                const className = `text-sm font-medium transition ${
                                    isActive ? 'text-emerald-700' : 'text-slate-600 hover:text-emerald-700'
                                }`;

                                return item.href.startsWith('/#') ? (
                                    <a key={item.label} href={item.href} className={className}>
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link key={item.label} href={item.href} className={className}>
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 sm:inline-flex"
                                >
                                    Dashboard
                                </Link>
                            ) : null}

                            <a
                                href="/admin/dashboard"
                                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                            >
                                Login  <ArrowRight className="size-4" />
                            </a>

                            <button
                                type="button"
                                onClick={() => setIsMenuOpen((value) => !value)}
                                className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
                                aria-label="Buka menu"
                            >
                                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                            </button>
                        </div>
                    </div>

                    {isMenuOpen ? (
                        <div className="border-t border-slate-200/70 bg-white px-4 py-4 lg:hidden">
                            <nav className="mx-auto flex max-w-7xl flex-col gap-3">
                                {navItems.map((item) =>
                                    item.href.startsWith('/#') ? (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                                        >
                                            {item.label}
                                        </Link>
                                    ),
                                )}
                            </nav>
                        </div>
                    ) : null}
                </header>

                <main>
                    {/* HERO / BANNER */}
                    <section className="relative overflow-hidden bg-slate-900 text-white">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-60"
                            style={{
                                backgroundImage:
                                    'linear-gradient(180deg, rgba(6,20,15,0.55) 0%, rgba(6,20,15,0.75) 100%), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80)',
                            }}
                        />

                        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">UMKM Desa Mandalamekar</h1>
                                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">
                                        Kenali para pelaku usaha lokal yang berkontribusi mengembangkan ekonomi desa.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Link href="/" className="text-emerald-400 hover:underline">
                                        Beranda
                                    </Link>
                                    <span>/</span>
                                    <span className="text-white">UMKM</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* STATS CARD (floating) */}
                    <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-6 rounded-[1.75rem] border border-white bg-white p-6 shadow-xl shadow-slate-200/60 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div key={stat.label} className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                            <Icon className="size-5" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold leading-tight text-slate-900">{stat.value}</p>
                                            <p className="text-sm text-slate-500">{stat.label}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* LIST + FILTER */}
                    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Semua UMKM</h2>

                            <div className="flex flex-1 flex-wrap items-center justify-end gap-3 sm:flex-nowrap">
                                <div className="relative w-full max-w-xs">
                                    <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari UMKM..."
                                        className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                    />
                                </div>

                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsCategoryOpen((value) => !value)}
                                        className="flex w-full min-w-[200px] items-center gap-2 rounded-full border border-slate-200 bg-white py-2.5 pl-4 pr-4 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                    >
                                        <MapPin className="size-4 shrink-0 text-emerald-600" />
                                        <span className="flex-1 text-left">{selectedCategory}</span>
                                        <ChevronDown className={`size-4 shrink-0 text-slate-400 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isCategoryOpen ? (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsCategoryOpen(false)} />
                                            <div className="absolute right-0 z-20 mt-2 w-full min-w-[200px] overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-xl shadow-slate-200/70">
                                                {categoryFilters.map((filter) => {
                                                    const isSelected = filter === selectedCategory;

                                                    return (
                                                        <button
                                                            key={filter}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedCategory(filter);
                                                                setIsCategoryOpen(false);
                                                            }}
                                                            className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition ${
                                                                isSelected ? 'bg-emerald-50 font-semibold text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                                                            }`}
                                                        >
                                                            {filter}
                                                            {isSelected ? <Check className="size-4 text-emerald-600" /> : null}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        {/* GRID CARDS */}
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {umkmList.map((umkm) => {
                                const Icon = umkm.icon;

                                return (
                                    <article
                                        key={umkm.name}
                                        className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className={`relative aspect-[4/3] bg-gradient-to-br ${umkm.tone}`}>
                                            <div className="absolute inset-0 flex items-center justify-center text-white/70">
                                                <Icon className="size-12" />
                                            </div>
                                        </div>

                                        <div className="flex flex-1 flex-col p-5">
                                            <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                {umkm.category}
                                            </span>

                                            <h3 className="mt-3 text-base font-bold text-slate-900">{umkm.name}</h3>
                                            <p className="mt-1 text-sm leading-5 text-slate-500">{umkm.description}</p>

                                            <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
                                                <MapPin className="size-4 text-emerald-600" />
                                                {umkm.location}
                                            </p>

                                            <button
                                                type="button"
                                                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                                            >
                                                Lihat Produk <ArrowRight className="size-4" />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {/* PAGINATION */}
                        <div className="mt-10 flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => setActivePage((page) => Math.max(1, page - 1))}
                                className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
                                aria-label="Halaman sebelumnya"
                            >
                                <ChevronLeft className="size-4" />
                            </button>

                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setActivePage(page)}
                                    className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                                        activePage === page ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() => setActivePage((page) => Math.min(3, page + 1))}
                                className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
                                aria-label="Halaman berikutnya"
                            >
                                <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </section>
                </main>

                {/* FOOTER */}
                <footer className="bg-emerald-950 text-emerald-100">
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                                    <Sprout className="size-5" />
                                </div>
                                <p className="font-semibold text-white">UMKM Desa Mandalamekar</p>
                            </div>
                            <p className="mt-4 max-w-xs text-sm leading-6 text-emerald-200/80">
                                Dukung produk lokal, majukan ekonomi desa.
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold text-white">Menu</p>
                            <ul className="mt-4 space-y-2 text-sm text-emerald-200/80">
                                <li>
                                    <Link href="/welcome" className="hover:text-white">
                                        Beranda
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/umkm" className="hover:text-white">
                                        UMKM
                                    </Link>
                                </li>
                                <li>
                                    <a href="/produk" className="hover:text-white">
                                        Produk
                                    </a>
                                </li>
                                <li>
                                    <a href="/#tentang" className="hover:text-white">
                                        Tentang Desa
                                    </a>
                                </li>
                                <li>
                                    <a href="/#kontak" className="hover:text-white">
                                        Kontak
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-semibold text-white">Kontak</p>
                            <ul className="mt-4 space-y-3 text-sm text-emerald-200/80">
                                <li className="flex items-start gap-2">
                                    <MapPin className="mt-0.5 size-4 shrink-0" />
                                    <span>Desa Mandalamekar, Kecamatan Cimenyan, Kabupaten Bandung, Jawa Barat</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="size-4 shrink-0" />
                                    <span>0812-3456-7890</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail className="size-4 shrink-0" />
                                    <span>umkm.mandalamekar@gmail.com</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-semibold text-white">Ikuti Kami</p>
                            <div className="mt-4 flex gap-3">
                                <a
                                    href="#"
                                    className="flex size-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="size-4" />
                                </a>
                                <a
                                    href="#"
                                    className="flex size-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="size-4" />
                                </a>
                                <a
                                    href="#"
                                    className="flex size-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                                    aria-label="WhatsApp"
                                >
                                    <MessageCircle className="size-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 py-4 text-center text-sm text-emerald-200/70">
                        © 2026 UMKM Desa Mandalamekar. Universitas Yarsi.
                    </div>
                </footer>
            </div>
        </>
    );
}



