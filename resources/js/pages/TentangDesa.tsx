import React from 'react';
import { ShieldCheck, Trees, HeartHandshake, Eye, Target, ChevronRight, Sprout, ArrowRight } from 'lucide-react';
import { Link, Head } from '@inertiajs/react';

export default function TentangDesa() {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] font-sans text-slate-900">
            <Head title="Tentang Desa - Desa Mandalamekar" />

            {/* NAVBAR YANG SERASI DENGAN BERANDA & UMKM */}
            <header className="sticky top-0 z-50 border-b border-white/80 bg-white/80 backdrop-blur-xl transition-all">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25">
                            <Sprout className="size-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">UMKM</p>
                            <p className="text-base font-extrabold tracking-tight text-slate-900 leading-none">Desa Mandalamekar</p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex">
                        <Link href="/" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            Beranda
                        </Link>
                        <Link href="/umkm" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            UMKM
                        </Link>
                        <Link href="/produk" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            Produk
                        </Link>
                        <Link href="/tentang" className="text-sm font-semibold text-emerald-600">
                            Tentang Desa
                        </Link>
                        <a href="#kontak" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            Kontak
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
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

            {/* HERO BANNER ATAS - EDISI TENTANG DESA (MENGGUNAKAN GAMBAR BERANDA) */}
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">

                    {/* Background Image - Memanggil gambar pemandangan utama beranda agar jernih */}
                    <div
                        className="absolute inset-0 bg-cover bg-center object-cover opacity-100"
                        style={{
                            backgroundImage: 'linear-gradient(90deg, rgba(3, 7, 18, 0.75) 0%, rgba(3, 7, 18, 0.45) 50%, rgba(3, 7, 18, 0.15) 100%), url("images/TentangDesa-bg.jpg")',
                        }}
                    />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_40%)]" />

                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md">
                                <span className="flex size-2 rounded-full bg-emerald-400 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                </span>
                                Profil Wilayah
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                                Tentang <span className="text-emerald-400">Desa</span>
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
                                Mengenal lebih dekat sejarah, visi misi, serta komitmen pengembangan potensi ekonomi digital di Desa Mandalamekar.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-2 text-xs font-medium backdrop-blur-md shadow-inner">
                            <Link href="/" className="text-slate-300 hover:text-white transition">Beranda</Link>
                            <ChevronRight className="size-3.5 text-slate-500" />
                            <span className="text-emerald-400 font-semibold">Tentang Desa</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* KONTEN UTAMA - PROFILE & VISI MISI */}
            <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                    {/* SISI KIRI: Deskripsi Cerita Desa */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Membangun Kemandirian Ekonomi <span className="text-emerald-600">Lewat Potensi Lokal</span>
                        </h2>

                        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                           Desa Mandalamekar merupakan kawasan agraris subur yang kaya akan komoditas unggulan serta kreativitas masyarakat yang tinggi. Melalui wadah Digital UMKM ini, kami berkomitmen untuk menaikkan kelas produk-produk lokal—mulai dari kuliner fermentasi tradisional, manisan terong ungu alami yang unik, hingga kerajinan anyaman bambu yang bernilai seni estetis.
                        </p>

                        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                            Kami percaya bahwa transformasi digital yang inklusif dapat menjembatani kerja keras para petani dan pelaku UMKM desa langsung ke tangan konsumen yang lebih luas, tanpa menghilangkan nilai budaya dan kearifan lokal.
                        </p>

                        {/* Nilai / Prinsip Desa */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <ShieldCheck className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 text-sm">Produk Autentik</h3>
                                    <p className="mt-0.5 text-xs text-slate-500"> Dijamin asli dan diproduksi langsung dengan sepenuh hati oleh warga lokal desa.</p>
                                </div>
                            </div>

                            <div className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <HeartHandshake className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 text-sm">Ekonomi Adil</h3>
                                    <p className="mt-0.5 text-xs text-slate-500"> Mendukung ekosistem kesejahteraan yang berkelanjutan bagi para pengrajin dan pelaku usaha desa.</p>
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
                                href="#kontak"
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
