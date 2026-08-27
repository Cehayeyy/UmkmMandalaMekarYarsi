import React from 'react';
import { ShieldCheck, Trees, HeartHandshake, Eye, Target, Sprout, ArrowRight, Landmark } from 'lucide-react';
import { Link, Head } from '@inertiajs/react';
import { PublicMobileNav } from '@/components/PublicMobileNav';

export default function TentangDesa() {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] font-sans text-slate-900">
            <Head title="Tentang Desa - Desa Mandalamekar" />

            {/* NAVBAR / HEADER PUBLIK DENGAN LOGO DESA */}
            <header className="sticky top-0 z-50 border-b border-white/80 bg-white/80 backdrop-blur-xl transition-all">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    {/* LOGO DESA DI HEADER (UKURAN FONT DISAMAKAN DENGAN HALAMAN LAIN) */}
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

                    <nav className="hidden items-center gap-8 lg:flex">
                        <Link href="/" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            Beranda
                        </Link>
                        <Link href="/umkm" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            UMKM
                        </Link>
                        <Link href="/produk" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            Produk
                        </Link>
                        <Link href="/tentangdesa" className="text-sm font-semibold text-emerald-600">
                            Tentang Desa
                        </Link>
                        <Link href="/kontak" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            Kontak
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <PublicMobileNav activeHref="/tentangdesa" />
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                        >
                            <span>Login</span>
                            <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO BANNER ATAS (POSISI TEKS DIPINDAHKAN KE SEBELAH KANAN BANNER) */}
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">

                    {/* GAMBAR BANNER KUALITAS HD */}
                    <img
                        src="/images/Banner Tentang Desa.jpg"
                        alt="Banner Tentang Desa Mandalamekar"
                        style={{ imageRendering: '-webkit-optimize-contrast' }}
                        className="absolute inset-0 size-full object-cover object-[60%_center] sm:object-center"
                    />

                    {/* OVERLAY DIPINDAHKAN GRADIENT-NYA KE SEBELAH KANAN */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent sm:bg-gradient-to-l sm:from-slate-950/80 sm:via-slate-950/40" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_40%)]" />

                    {/* BADGE LOGO DESA & YARSI DI BANNER (DIPINDAH KE KIRI ATAS AGAR BALANS) */}
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
                                    src="/images/logo-universitas-yarsi.png"
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

                    {/* CONTAINER GRID TEKS BANNER (TEKS DI KANAN RATA KANAN) */}
                    <div className="relative grid min-h-[460px] items-end pb-8 sm:min-h-[540px] sm:pb-12 px-6 sm:px-10 lg:grid-cols-2 lg:px-12 z-10">
                        <div className="max-w-2xl lg:col-start-2 lg:justify-self-end text-left lg:text-right">
                            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl drop-shadow-md">
                                Tentang <span className="block text-emerald-300 drop-shadow-md">Desa Mandalamekar</span>
                            </h1>
                            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-100 font-medium drop-shadow-sm ml-auto">
                                Mengenal lebih dekat sejarah, visi misi, serta komitmen pengembangan potensi ekonomi digital di Desa Mandalamekar <span className="whitespace-nowrap">Kecamatan Cimenyan</span> <span className="whitespace-nowrap">Kabupaten Bandung</span> <span className="whitespace-nowrap">Provinsi Jawa Barat</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* DATA SEKTOR KOMODITAS UNGGULAN DESA */}
            <div className="mx-auto max-w-7xl px-4 mt-12 sm:px-6 lg:px-8">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">

                    {/* Sektor 1: Kuliner */}
                    <div className="flex items-center gap-4 p-2 border-b sm:border-b-0 sm:border-r border-slate-100">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <Sprout className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Kuliner Tradisional</p>
                            <p className="text-base font-bold text-slate-900">Olahan Fermentasi</p>
                        </div>
                    </div>

                    {/* Sektor 2: Kerajinan Bambu */}
                    <div className="flex items-center gap-4 p-2 border-b sm:border-b-0 sm:border-r border-slate-100 sm:pl-6">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <Trees className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Kerajinan Tangan</p>
                            <p className="text-base font-bold text-slate-900">Anyaman Bambu Estetis</p>
                        </div>
                    </div>

                    {/* Sektor 3: Pemberdayaan */}
                    <div className="flex items-center gap-4 p-2 sm:pl-6">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <Landmark className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Fokus Utama</p>
                            <p className="text-base font-bold text-slate-900">Pemberdayaan UMKM</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* KONTEN UTAMA - PROFILE & VISI MISI */}
            <section className="mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                    {/* SISI KIRI: Deskripsi Cerita Desa */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Membangun Kemandirian Ekonomi <span className="text-emerald-600">Lewat Potensi Lokal</span>
                        </h2>

                        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                           Desa Mandalamekar merupakan kawasan agraris subur yang kaya akan komoditas unggulan serta kreativitas masyarakat yang tinggi. Melalui wadah Digital UMKM ini, kami berkomitmen untuk menaikkan kelas produk-produk lokal mulai dari kuliner fermentasi tradisional, manisan terong ungu alami yang unik, hingga kerajinan anyaman bambu yang bernilai seni estetis.
                        </p>

                        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                            Kami percaya bahwa transformasi digital yang inklusif mampu menjembatani kerja keras para petani dan pelaku UMKM desa secara langsung ke tangan konsumen yang lebih luas, tanpa sedikit pun mengikis nilai budaya dan kearifan lokal yang kami jaga.
                        </p>

                        {/* Nilai / Prinsip Desa dengan Hover Effect */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition duration-300">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <ShieldCheck className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 text-sm">Produk Autentik</h3>
                                    <p className="mt-0.5 text-xs text-slate-500">Dijamin asli dan diproduksi langsung dengan sepenuh hati oleh warga lokal desa.</p>
                                </div>
                            </div>

                            <div className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition duration-300">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <HeartHandshake className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 text-sm">Ekonomi Adil</h3>
                                    <p className="mt-0.5 text-xs text-slate-500">Mendukung ekosistem kesejahteraan yang berkelanjutan bagi para pengrajin dan pelaku usaha desa.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SISI KANAN: Visi Misi */}
                    <div className="space-y-6">
                        <div className="relative overflow-hidden rounded-[2rem] border border-white bg-slate-900 p-6 text-white shadow-xl shadow-slate-200/80 sm:p-8">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-25"
                                style={{ backgroundImage: 'url("images/nama-gambar-beranda.jpg")' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />

                            <div className="relative space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400 backdrop-blur-md">
                                        <Eye className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-white tracking-wide uppercase">Visi Desa</h4>
                                        <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                                            "Menjadi desa digital yang mandiri secara ekonomi, melestarikan lingkungan, dan unggul dalam pengelolaan produk komoditas daerah berbasis gotong royong."
                                        </p>
                                    </div>
                                </div>

                                <div className="h-px bg-white/10" />

                                <div className="flex items-start gap-4">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400 backdrop-blur-md">
                                        <Target className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-white tracking-wide uppercase">Misi Utama</h4>
                                        <ul className="mt-2 space-y-2 text-sm text-slate-300 list-disc list-inside">
                                            <li>Mengakselerasi digitalisasi pemasaran seluruh produk hasil bumi desa.</li>
                                            <li>Meningkatkan standar kualitas kuantitas produksi UMKM lokal.</li>
                                            <li>Membuka jaringan kemitraan strategis demi keberlanjutan ekonomi desa.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Ringkas Tambahan */}
                        <div className="rounded-[1.5rem] border border-emerald-100 bg-emerald-50/40 p-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h4 className="font-semibold text-emerald-900 text-sm">Ingin berkunjung ke gerai UMKM kami?</h4>
                                <p className="text-xs text-emerald-700/90 mt-0.5">Silakan cek maps lokasi resmi di bagian menu kontak paling bawah.</p>
                            </div>
                            <a
                                href="/kontak"
                                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 whitespace-nowrap shadow-sm"
                            >
                                Hubungi Kami
                            </a>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
