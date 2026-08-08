import { type SharedData } from '@/types';
import { PublicMobileNav } from '@/components/PublicMobileNav';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Facebook, Instagram, Leaf, MessageCircle, Sprout, Store, Trees, UtensilsCrossed, Package, MapPin, Phone } from 'lucide-react';

const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'UMKM', href: '/umkm' },
    { label: 'Produk', href: '/produk' },
    { label: 'Tentang Desa', href: '/tentangdesa' },
    { label: 'Kontak', href: '/kontak' },
];

interface WelcomeProps extends SharedData {
    statsData: {
        umkm: number;
        products: number;
        categories: number;
    };
    featuredProducts: {
        id: number;
        name: string;
        price: number;
        category: string;
        seller: string;
        seller_username: string;
        foto: string | null;
    }[];
    topCategories?: { label: string; count: number }[];
}

export default function Welcome() {
    const { auth, statsData, featuredProducts, topCategories = [] } = usePage<WelcomeProps>().props;

    const getCardGradient = (id: number) => {
        const gradients = [
            'from-amber-100 via-orange-200 to-amber-300',
            'from-emerald-100 via-teal-200 to-emerald-300',
            'from-sky-100 via-blue-200 to-indigo-300',
            'from-rose-100 via-pink-200 to-rose-300'
        ];
        return gradients[id % gradients.length];
    };

    const getCategoryIcon = (label: string) => {
        const lower = label.toLowerCase();
        if (lower.includes('makan') || lower.includes('minum') || lower.includes('kuliner') || lower.includes('snack')) return UtensilsCrossed;
        if (lower.includes('rajin') || lower.includes('kriya') || lower.includes('kayu') || lower.includes('bambu')) return Store;
        if (lower.includes('fashion') || lower.includes('baju') || lower.includes('pakaian')) return Leaf;
        if (lower.includes('tani') || lower.includes('kebun') || lower.includes('bumi')) return Trees;
        return Package;
    };

    return (
        <>
            <Head title="UMKM Desa Mandalamekar" />

            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] text-slate-900 font-sans">

                {/* 1. HEADER */}
                <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                        {/* KIRI HEADER: LOGO DESA & JUDUL */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-md border border-slate-100 shrink-0">
                                <img
                                    src="/images/Logo DesaMandalamekar.png"
                                    alt="Logo Desa Mandalamekar"
                                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                                    className="size-full object-contain drop-shadow-xs"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-emerald-700">UMKM</p>
                                <p className="text-lg font-bold tracking-tight text-slate-900">Desa Mandalamekar</p>
                            </div>
                        </Link>

                        {/* TENGAH HEADER: NAVIGASI */}
                        <nav className="hidden items-center gap-8 lg:flex">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`text-sm transition ${item.href === '/' ? 'font-semibold text-emerald-600' : 'font-medium text-slate-600 hover:text-emerald-700'}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* KANAN HEADER: TOMBOL LOGIN & DASHBOARD DINAMIS */}
                        <div className="flex items-center gap-3">
                            <PublicMobileNav activeHref="/" />
                            {/* TOMBOL LOGIN MURNI - MEMAKAI TAG <a> AGAR FULL REFRESH */}
                            <a
                                href="/login"
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                            >
                                <span>Login</span>
                                <ArrowRight className="size-4" />
                            </a>
                        </div>
                    </div>
                </header>

                <main>
                    {/* HERO BANNER UTAMA */}
                    <section id="beranda" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">

                            {/* GAMBAR BANNER KUALITAS HD */}
                            <img
                                src="/images/Banner Welcome.jpg"
                                alt="Banner Desa Mandalamekar"
                                style={{ imageRendering: '-webkit-optimize-contrast' }}
                            className="absolute inset-0 size-full object-cover object-[60%_center] sm:object-center"
                            />

                            {/* OVERLAY DENGAN GRADIENT DARI KANAN KE KIRI */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent sm:bg-gradient-to-l sm:from-slate-950/80 sm:via-slate-950/40" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_40%)]" />

                            {/* BADGE LOGO DESA & YARSI DIPINDAHKAN KE KIRI ATAS */}
                            <div className="absolute top-6 left-6 z-10 hidden sm:inline-flex items-center gap-4 rounded-full border border-white/30 bg-slate-950/60 px-6 py-3 backdrop-blur-md shadow-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 sm:size-14 overflow-hidden rounded-full bg-white p-1.5 shrink-0 shadow-md ring-2 ring-white/20">
                                        <img
                                            src="/images/Logo DesaMandalamekar.png"
                                            alt="Logo Desa"
                                            style={{ imageRendering: '-webkit-optimize-contrast' }}
                                            className="size-full object-contain"
                                        />
                                    </div>
                                    <div className="size-12 sm:size-14 overflow-hidden rounded-full bg-white p-1.5 shrink-0 shadow-md ring-2 ring-white/20">
                                        <img
                                            src="/images/Logo universitas-yarsi.png"
                                            alt="Logo Yarsi"
                                            style={{ imageRendering: '-webkit-optimize-contrast' }}
                                            className="size-full object-contain"
                                        />
                                    </div>
                                </div>
                                <span className="text-xs sm:text-sm font-bold tracking-wide text-emerald-200 border-l border-white/20 pl-4">
                                    Desa Mandalamekar & Universitas Yarsi
                                </span>
                            </div>

                            {/* CONTAINER GRID TEKS BANNER (POSISI TEKS DI SEBELAH KANAN) */}
                        <div className="relative grid min-h-[460px] items-end pb-8 sm:min-h-[540px] sm:pb-12 px-6 sm:px-10 lg:grid-cols-2 lg:px-12 z-10">
                                <div className="max-w-2xl lg:col-start-2 lg:justify-self-end text-left lg:text-right">
                                    <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl drop-shadow-md">
                                        UMKM <span className="block text-emerald-300 drop-shadow-md">Desa Mandalamekar</span>
                                    </h1>

                                    <p className="mt-5 text-base leading-7 text-slate-100 sm:text-lg font-medium drop-shadow-sm ml-auto">
                                        Dukung produk lokal, majukan ekonomi desa, dan temukan berbagai produk unggulan dari UMKM Desa Mandalamekar <span className="whitespace-nowrap">Kecamatan Cimenyan</span> <span className="whitespace-nowrap">Kabupaten Bandung</span> Provinsi Jawa Barat.
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-3 lg:justify-end">
                                        <Link
                                            href="/produk"
                                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                                        >
                                            Lihat Produk <ArrowRight className="size-4" />
                                        </Link>
                                        <Link
                                            href="/umkm"
                                            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
                                        >
                                            Lihat UMKM
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* STATS */}
                    <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-4 rounded-[1.75rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/60 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                { label: 'UMKM Aktif', value: statsData?.umkm || 0 },
                                { label: 'Produk Total', value: statsData?.products || 0 },
                                { label: 'Kategori', value: statsData?.categories || 0 },
                                { label: 'Produk Lokal', value: '100%' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-4 rounded-3xl px-2 py-2">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shrink-0">
                                        <Sprout className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold tracking-tight text-slate-900">{item.value}</p>
                                        <p className="text-sm text-slate-500">{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* KATEGORI */}
                    <section id="kategori" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8 border border-slate-100">
                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Jelajah Katalog</p>
                                    <h2 className="mt-2 text-3xl font-bold tracking-tight">Temukan produk berdasarkan kebutuhan</h2>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {topCategories.length > 0 ? (
                                    topCategories.map((category) => {
                                        const Icon = getCategoryIcon(category.label);
                                        return (
                                            <Link
                                                key={category.label}
                                                href="/produk"
                                                className="flex flex-col items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-6 text-center transition hover:-translate-y-1 hover:bg-emerald-50 hover:border-emerald-200 group"
                                            >
                                                <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                                                    <Icon className="size-6" />
                                                </div>
                                                <p className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700">
                                                    {category.label} <span className="text-xs text-slate-400 font-normal">({category.count})</span>
                                                </p>
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-full py-8 text-center text-slate-400 border border-dashed rounded-2xl">
                                        Belum ada kategori yang terdaftar
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* PRODUK TERBARU */}
                    <section id="produk" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                        <div className="mb-8 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Produk Terbaru</p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight">Pilihan segar dari pelaku UMKM desa</h2>
                            </div>
                            <Link href="/produk" className="hidden text-sm font-semibold text-emerald-700 hover:text-emerald-800 sm:inline-flex">
                                Lihat Semua
                            </Link>
                        </div>

                        {featuredProducts && featuredProducts.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                                {featuredProducts.map((product) => (
                                    <article
                                        key={product.id}
                                        className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/60"
                                    >
                                        <div className={`relative aspect-square overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${getCardGradient(product.id)}`}>
                                            {product.foto ? (
                                                <img src={`/${product.foto}`} alt={product.name} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-black/20">
                                                    <Package className="size-16" />
                                                </div>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                                            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur">
                                                {product.category}
                                            </div>
                                        </div>
                                        <div className="px-1 pb-1 pt-4">
                                            <h3 className="text-base font-bold text-slate-900 line-clamp-1">{product.name}</h3>
                                            <p className="mt-2 text-sm font-extrabold text-emerald-600">Rp {product.price.toLocaleString('id-ID')}</p>
                                            <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                                <Store className="size-3.5" />
                                                <span className="truncate">{product.seller}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[2rem] border-2 border-dashed border-slate-200 p-12 text-center text-slate-500">
                                <Package className="mx-auto size-12 mb-3 text-slate-300" />
                                <p className="font-bold text-slate-700">Belum ada produk</p>
                                <p className="text-sm mt-1">UMKM belum mempublikasikan etalase mereka.</p>
                            </div>
                        )}
                    </section>

                    {/* TENTANG DESA */}
                    <section id="tentang" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-[2rem] bg-emerald-900 text-white shadow-[0_30px_90px_rgba(6,95,70,0.22)]">
                            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                                <div className="p-6 sm:p-8 lg:p-10">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Tentang Desa Mandalamekar</p>
                                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Desa yang tumbuh bersama UMKM lokal</h2>
                                    <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-50/90 sm:text-base">
                                        Desa Mandalamekar adalah desa yang terletak di <span className="whitespace-nowrap">Kecamatan Cimenyan</span> <span className="whitespace-nowrap">Kabupaten Bandung</span>. Melalui portal ini, masyarakat dapat menemukan produk unggulan, mengenal pelaku usaha lokal, dan mendukung ekonomi desa secara langsung.
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Link href="/tentangdesa" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50">
                                            Selengkapnya
                                        </Link>
                                    </div>
                                </div>
                                <div className="relative min-h-[280px] lg:min-h-[360px]">
                                    <img
                                        src="/images/Banner Welcome.jpg"
                                        alt="Desa Mandalamekar"
                                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                                        className="absolute inset-0 size-full object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-emerald-950/20 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                                        <p className="text-sm text-emerald-100">Dukungan untuk produk lokal</p>
                                        <p className="mt-1 text-lg font-semibold">Mari bersama mengangkat UMKM desa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

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
                                    <p className="text-xs text-emerald-200/70">Portal produk lokal desa</p>
                                </div>
                            </div>
                            <p className="mt-4 max-w-xs text-sm leading-6 text-emerald-200/80">
                                Situs ini dibuat untuk memperkenalkan produk unggulan, membantu promosi, dan memperluas jangkauan pasar UMKM Desa Mandalamekar <span className="whitespace-nowrap">Kecamatan Cimenyan</span> <span className="whitespace-nowrap">Kabupaten Bandung</span>.
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Menu</p>
                            <ul className="mt-4 space-y-2 text-sm text-emerald-200/80">
                                {navItems.map((item) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="hover:text-white transition">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Kontak</p>
                            <ul className="mt-4 space-y-3 text-sm text-emerald-200/80">
                                <li className="flex items-start gap-2">
                                    <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                                    <span>Desa Mandalamekar, <span className="whitespace-nowrap">Kec. Cimenyan, Kab. Bandung</span></span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Phone className="size-4 text-emerald-400" />
                                    <span>0812-3456-7890</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Ikuti Kami</p>
                            <div className="mt-4 flex gap-3">
                                <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
                                    <Facebook className="size-4" />
                                </a>
                                <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
                                    <Instagram className="size-4" />
                                </a>
                                <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
                                    <MessageCircle className="size-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 py-4 text-center text-xs text-emerald-200/60 px-4">
                        © 2026 UMKM Desa Mandalamekar <span className="whitespace-nowrap">Kecamatan Cimenyan</span> <span className="whitespace-nowrap">Kabupaten Bandung</span>. Universitas Yarsi.
                    </div>
                </footer>
            </div>
        </>
    );
}
