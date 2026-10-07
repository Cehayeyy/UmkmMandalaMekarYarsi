import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PublicMobileNav } from '@/components/PublicMobileNav';
import {
    Sprout,
    ArrowRight,
    MapPin,
    Phone,
    Mail,
    MessageCircle,
    Send,
    CheckCircle2,
    Instagram,
    Facebook
} from 'lucide-react';

export default function Kontak() {
    const [formSubmitted, setFormSubmitted] = useState(false);

    // 🛠️ MENGGUNAKAN useForm DARI INERTIA (Bukan useState lagi)
    const { data, setData, post, processing, reset } = useForm({
        nama: '',
        email: '',
        nohp: '',
        subjek: '',
        pesan: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 🛠️ MENGIRIM DATA KE ROUTE LARAVEL (kontak.store)
        post(route('kontak.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setFormSubmitted(true);
                reset(); // Reset form otomatis jika berhasil tersimpan ke database
                setTimeout(() => {
                    setFormSubmitted(false);
                }, 4000);
            },
        });
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] font-sans text-slate-900">
            <Head title="Hubungi Kami - Desa Mandalamekar" />

            {/* HEADER / NAVBAR DENGAN LOGO DESA (FONT DISAMAKAN) */}
            <header className="sticky top-0 z-50 border-b border-white/80 bg-white/80 backdrop-blur-xl transition-all">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href={route('home')} className="flex items-center gap-2.5 sm:gap-3 min-w-0">
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
                        <Link href={route('home')} className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Beranda</Link>
                        <Link href={route('umkm.umkmPage')} className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">UMKM</Link>
                        <Link href={route('produk')} className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Produk</Link>
                        <Link href={route('tentangdesa')} className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">Tentang Desa</Link>
                        <Link href={route('kontak')} className="text-sm font-semibold text-emerald-600">Kontak</Link>
                    </nav>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <PublicMobileNav activeRouteName="kontak" />
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                        >
                            <span>Login</span>
                            <ArrowRight className="size-3.5 sm:size-4" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pb-20">
                {/* HERO BANNER ATAS */}
                <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">

                        {/* GAMBAR BANNER KUALITAS HD */}
                        <img
                            src="/images/Banner Kontak.jpg"
                            alt="Banner Kontak Desa Mandalamekar"
                            style={{ imageRendering: '-webkit-optimize-contrast' }}
                            className="absolute inset-0 size-full object-cover object-[60%_center] sm:object-center"
                        />

                        {/* OVERLAY GRADIENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent sm:bg-gradient-to-l sm:from-slate-950/80 sm:via-slate-950/40" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.15),transparent_40%)]" />

                        {/* BADGE LOGO DESA & YARSI */}
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

                        {/* TEKS BANNER */}
                        <div className="relative grid min-h-[460px] items-end pb-8 sm:min-h-[540px] sm:pb-12 px-6 sm:px-10 lg:grid-cols-2 lg:px-12 z-10">
                            <div className="max-w-2xl lg:col-start-2 lg:justify-self-end text-left lg:text-right">
                                <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl drop-shadow-md">
                                    Kontak <span className="block text-emerald-300 drop-shadow-md">Desa Mandalamekar</span>
                                </h1>
                                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-100 font-medium drop-shadow-sm ml-auto">
                                    Koneksi langsung dengan pihak pengelola platform digital UMKM dan aparatur Desa Mandalamekar <span className="whitespace-nowrap">Kecamatan Cimenyan</span> <span className="whitespace-nowrap">Kabupaten Bandung</span> <span className="whitespace-nowrap">Provinsi Jawa Barat</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KONTEN UTAMA: LAYOUT FORM DAN DETAIL KONTAK */}
                <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-12 lg:items-start">

                        {/* KIRI: INFORMASI KONTAK */}
                        <div className="lg:col-span-5 space-y-6">
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                    Informasi <span className="text-emerald-600">Pelayanan</span>
                                </h2>
                                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                                    Butuh konsultasi produk, pendaftaran toko UMKM baru, atau bantuan lainnya? Silakan gunakan saluran resmi kami atau kunjungi kantor sekretariat secara langsung.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <MapPin className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Kantor Sekretariat</h4>
                                        <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">Jl. Raya Mandalamekar No. 01, Kecamatan Cimenyan, Kabupaten Bandung, Jawa Barat</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <Mail className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Surat Elektronik (Email)</h4>
                                        <p className="mt-0.5 text-xs text-slate-500">info@mandalamekar.desa.id</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KANAN: FORMULIR KIRIM PESAN */}
                        <div className="lg:col-span-7">
                            <div className="rounded-[2rem] border border-slate-100 bg-white p-5 shadow-xl shadow-slate-200/40 sm:p-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Kirim Pesan</h3>
                                {formSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center animate-pulse">
                                        <CheckCircle2 className="size-16 text-emerald-500 mb-4" />
                                        <h4 className="text-lg font-bold text-slate-900">Pesan Berhasil Terkirim!</h4>
                                        <p className="text-xs text-slate-500 mt-1 max-w-xs">Terima kasih telah menghubungi kami. Kami akan segera mengecek pesan Anda.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                required
                                                value={data.nama} // 🛠️ Diubah
                                                onChange={(e) => setData('nama', e.target.value)} // 🛠️ Diubah
                                                placeholder="Nama"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email Aktif</label>
                                            <input
                                                type="email"
                                                required
                                                value={data.email} // 🛠️ Diubah
                                                onChange={(e) => setData('email', e.target.value)} // 🛠️ Diubah
                                                placeholder="Email"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">No. Handphone / WhatsApp</label>
                                            <input
                                                type="tel"
                                                required
                                                value={data.nohp} // 🛠️ Diubah
                                                onChange={(e) => setData('nohp', e.target.value)} // 🛠️ Diubah
                                                placeholder="No handphone"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Subjek Pesan</label>
                                            <input
                                                type="text"
                                                required
                                                value={data.subjek} // 🛠️ Diubah
                                                onChange={(e) => setData('subjek', e.target.value)} // 🛠️ Diubah
                                                placeholder="Pesan"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Isi Pesan</label>
                                            <textarea
                                                rows={5}
                                                required
                                                value={data.pesan} // 🛠️ Diubah
                                                onChange={(e) => setData('pesan', e.target.value)} // 🛠️ Diubah
                                                placeholder="Tuliskan detail maksud dan tujuan pesan Anda di sini..."
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition resize-none"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing} // 🛠️ Mencegah klik berulang saat loading
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            <span>{processing ? 'Mengirim...' : 'Kirim Sekarang'}</span>
                                            <Send className="size-4" />
                                        </button>
                                    </form>
                                )}
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
                            <p className="font-semibold text-white">UMKM Desa Mandalamekar</p>
                        </div>
                        <p className="mt-4 max-w-xs text-sm leading-6 text-emerald-200/80">Dukung produk lokal, majukan ekonomi desa.</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Menu</p>
                        <ul className="mt-4 space-y-2 text-sm text-emerald-200/80">
                            <li><Link href={route('home')} className="hover:text-white transition">Beranda</Link></li>
                            <li><Link href={route('umkm.umkmPage')} className="hover:text-white transition">UMKM</Link></li>
                            <li><Link href={route('produk')} className="hover:text-white transition">Produk</Link></li>
                            <li><Link href={route('tentangdesa')} className="hover:text-white transition">Tentang Desa</Link></li>
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
                            <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"><Facebook className="size-4" /></a>
                            <a href="#" className="flex size-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"><Instagram className="size-4" /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 py-4 text-center text-xs text-emerald-200/60">
                    © 2026 UMKM Desa Mandalamekar Kecamatan Cimenyan Kabupaten Bandung Provinsi Jawa Barat. Universitas Yarsi.
                </div>
            </footer>
        </div>
    );
}
