import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Facebook, Instagram, Leaf, Menu, MessageCircle, Sprout, Store, Trees, UtensilsCrossed, X, Package } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'UMKM', href: '/umkm' },
    { label: 'Produk', href: '/produk' },
    { label: 'Tentang Desa', href: '/tentangdesa' },
    { label: 'Kontak', href: '/kontak' },
];

const categoriesData = [
    { label: 'Makanan & Minuman', icon: UtensilsCrossed },
    { label: 'Kerajinan', icon: Store },
    { label: 'Fashion', icon: Leaf },
    { label: 'Lainnya', icon: Trees },
];

// Interface untuk properti yang dikirim dari web.php
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
        foto: string | null;
    }[];
}

export default function Welcome() {
    // 🛠️ Tangkap props dari Laravel
    const { auth, statsData, featuredProducts } = usePage<WelcomeProps>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Fungsi pembantu penentuan warna background otomatis
    const getCardGradient = (id: number) => {
        const gradients = [
            'from-amber-100 via-orange-200 to-amber-300',
            'from-emerald-100 via-teal-200 to-emerald-300',
            'from-sky-100 via-blue-200 to-indigo-300',
            'from-rose-100 via-pink-200 to-rose-300'
        ];
        return gradients[id % gradients.length];
    };

    return (
        <>
            <Head title="UMKM Desa Mandalamekar">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] text-slate-900">
                
                {/* HEADER NAVBAR */}
                <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
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
                                const isActive = item.href === '/';
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`text-sm transition ${
                                            isActive
                                                ? 'font-semibold text-emerald-600'
                                                : 'font-medium text-slate-600 hover:text-emerald-700'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700">
                                    Dashboard <ArrowRight className="size-4" />
                                </Link>
                            ) : (
                                <Link href={route('login')} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700">
                                    Login <ArrowRight className="size-4" />
                                </Link>
                            )}

                            <button
                                type="button"
                                onClick={() => setIsMenuOpen((value) => !value)}
                                className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
                            >
                                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="border-t border-slate-200/70 bg-white px-4 py-4 lg:hidden">
                            <nav className="mx-auto flex max-w-7xl flex-col gap-3">
                                {navItems.map((item) => (
                                    <Link key={item.label} href={item.href} className={`rounded-2xl px-3 py-2 text-sm transition ${item.href === '/' ? 'font-semibold bg-emerald-50 text-emerald-700' : 'font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'}`}>
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}
                </header>

                <main>
                    {/* HERO SECTION */}
                    <section id="beranda" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(90deg, rgba(3, 7, 18, 0.88) 0%, rgba(3, 7, 18, 0.58) 48%, rgba(3, 7, 18, 0.18) 100%), url(images/welcome-bg.jpg)' }} />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.3),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(132,204,22,0.2),transparent_30%)]" />

                            <div className="relative grid min-h-[540px] items-end gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-12">
                                <div className="max-w-2xl pb-4 pt-12 lg:py-16">
                                    <h1 className="max-w-xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                        UMKM <span className="block text-emerald-300">Desa Mandalamekar</span>
                                    </h1>
                                    <p className="mt-5 max-w-xl text-base leading-7 text-slate-100/90 sm:text-lg">
                                        Dukung produk lokal, majukan ekonomi desa, dan temukan berbagai produk unggulan dari UMKM Desa Mandalamekar.
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Link href="/produk" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400">
                                            Lihat Produk <ArrowRight className="size-4" />
                                        </Link>
                                        <Link href="/umkm" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15">
                                            Lihat UMKM
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* STATS SECTION DINAMIS */}
                    <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-4 rounded-[1.75rem] border border-white bg-white p-5 shadow-xl shadow-slate-200/60 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                { label: 'UMKM Aktif', value: statsData?.umkm || 0 },
                                { label: 'Produk Total', value: statsData?.products || 0 },
                                { label: 'Kategori', value: statsData?.categories || 0 },
                                { label: 'Produk Lokal', value: '100%' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-4 rounded-3xl px-2 py-2">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
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

                    {/* PRODUK UNGGULAN (TERBARU) */}
                    <section id="produk" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
                                    <article key={product.id} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/60">
                                        <div className={`relative aspect-square overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${getCardGradient(product.id)}`}>
                                            
                                            {/* Render gambar jika ada */}
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

                    {/* KATEGORI PRODUK */}
                    <section id="kategori" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8 border border-slate-100">
                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Jelajah Katalog</p>
                                    <h2 className="mt-2 text-3xl font-bold tracking-tight">Temukan produk berdasarkan kebutuhan</h2>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                {categoriesData.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <Link key={category.label} href={`/produk`} className="flex flex-col items-center gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-6 text-center transition hover:-translate-y-1 hover:bg-emerald-50 hover:border-emerald-200 group">
                                            <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                                                <Icon className="size-6" />
                                            </div>
                                            <p className="text-sm font-semibold text-slate-700 group-hover:text-emerald-700">{category.label}</p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* BANNER TENTANG DESA */}
                    <section id="tentang" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-[2rem] bg-emerald-900 text-white shadow-[0_30px_90px_rgba(6,95,70,0.22)]">
                            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                                <div className="p-6 sm:p-8 lg:p-10">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Tentang Desa Mandalamekar</p>
                                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Desa yang tumbuh bersama UMKM lokal</h2>
                                    <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-50/90 sm:text-base">
                                        Desa Mandalamekar adalah desa yang terletak di Kecamatan Cimerak, Kabupaten Pangandaran. Melalui portal ini, masyarakat dapat menemukan produk unggulan, mengenal pelaku usaha lokal, dan mendukung ekonomi desa secara langsung.
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Link href="/tentangdesa" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50">
                                            Selengkapnya
                                        </Link>
                                    </div>
                                </div>
                                <div className="relative min-h-[280px] lg:min-h-[360px]">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(180deg, rgba(6,95,70,0.05) 0%, rgba(6,95,70,0.15) 100%), url(images/welcome-bg.jpg)' }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                                        <p className="text-sm text-emerald-100">Dukungan untuk produk lokal</p>
                                        <p className="mt-1 text-lg font-semibold">Mari bersama mengangkat UMKM desa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* FOOTER */}
                <footer className="border-t border-slate-200 bg-white">
                    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600 text-white"><Sprout className="size-5" /></div>
                                <div>
                                    <p className="font-semibold text-slate-900">UMKM Desa Mandalamekar</p>
                                    <p className="text-sm text-slate-500">Portal produk lokal desa</p>
                                </div>
                            </div>
                            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">Situs ini dibuat untuk memperkenalkan produk unggulan, membantu promosi, dan memperluas jangkauan pasar UMKM Desa Mandalamekar.</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] bg-slate-50 p-5">
                                <p className="text-sm font-semibold text-slate-900">Kontak</p>
                                <p className="mt-2 text-sm text-slate-500">Hubungi perangkat desa melalui kanal resmi.</p>
                                <div className="mt-4 flex gap-3 text-emerald-700">
                                    <Facebook className="size-5 cursor-pointer hover:text-emerald-800" />
                                    <Instagram className="size-5 cursor-pointer hover:text-emerald-800" />
                                    <MessageCircle className="size-5 cursor-pointer hover:text-emerald-800" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-200 py-4 text-center text-sm font-medium text-slate-500">
                        © 2026 UMKM Desa Mandalamekar. Universitas Yarsi.
                    </div>
                </footer>
            </div>
        </>
    );
}