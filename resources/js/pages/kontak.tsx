import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Sprout,
    ArrowRight,
    MapPin,
    Phone,
    Mail,
    MessageCircle,
    ChevronRight,
    Send,
    CheckCircle2,
    Instagram,
    Facebook
} from 'lucide-react';

export default function Kontak() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        nohp: '', // Menyimpan data No. Handphone/WA
        subjek: '',
        pesan: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulasi pengiriman pesan
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
            // Reset semua field termasuk nohp setelah terkirim
            setFormData({ nama: '', email: '', nohp: '', subjek: '', pesan: '' });
        }, 4000);
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] font-sans text-slate-900">
            <Head title="Hubungi Kami - Desa Mandalamekar" />

            {/* HEADER / NAVBAR */}
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
                        <Link href="tentangdesa" className="text-sm font-medium text-slate-600 transition hover:text-emerald-600">
                            Tentang Desa
                        </Link>
                        {/* Menu Kontak Aktif */}
                        <Link href="/kontak" className="text-sm font-semibold text-emerald-600">
                            Kontak
                        </Link>
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

            <main className="pb-20">
                {/* HERO BANNER ATAS - EDISI HUBUNGI KAMI */}
                <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-slate-900 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)]">

                        {/* Background Image Banner */}
                        <div
                            className="absolute inset-0 bg-cover bg-center object-cover opacity-100"
                            style={{
                                backgroundImage: 'linear-gradient(90deg, rgba(3, 7, 18, 0.75) 0%, rgba(3, 7, 18, 0.45) 50%, rgba(3, 7, 18, 0.15) 100%), url("images/kontak-bg.jpg")',
                            }}
                        />

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_40%)]" />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                                    Kontak <span className="text-emerald-400">Desa</span>
                                </h1>

                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
                                    Koneksi langsung dengan pihak pengelola platform digital UMKM dan aparatur Desa Mandalamekar.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KONTEN UTAMA: LAYOUT FORM DAN DETAIL DETAIL KONTAK */}
                <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-12 lg:items-start">

                        {/* KIRI: INFORMASI KONTAK LENGKAP (5 Kolom) */}
                        <div className="lg:col-span-5 space-y-6">
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                                    Informasi <span className="text-emerald-600">Pelayanan</span>
                                </h2>
                                <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                                    Butuh konsultasi produk, pendaftaran toko UMKM baru, atau bantuan lainnya? Silakan gunakan saluran resmi kami atau kunjungi kantor sekretariat secara langsung.
                                </p>
                            </div>

                            {/* List Kartu Kontak */}
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
                                        <Phone className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Telepon / WhatsApp</h4>
                                        <p className="mt-0.5 text-xs text-slate-500">0812-3456-7890 (Sekretariat Desa)</p>
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

                                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-300">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <MessageCircle className="size-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Jam Operasional Layanan</h4>
                                        <p className="mt-0.5 text-xs text-slate-500">Senin - Jumat | 08:00 - 15:00 WIB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KANAN: FORMULIR KIRIM PESAN INTERAKTIF SEJAJAR KEBOWAH (7 Kolom) */}
                        <div className="lg:col-span-7">
                            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Kirim Pesan</h3>
                                {formSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-center animate-pulse">
                                        <CheckCircle2 className="size-16 text-emerald-500 mb-4" />
                                        <h4 className="text-lg font-bold text-slate-900">Pesan Berhasil Terkirim!</h4>
                                        <p className="text-xs text-slate-500 mt-1 max-w-xs">Terima kasih telah menghubungi kami. Kami akan segera mengecek pesan Anda.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">

                                        {/* 1. Input Nama Lengkap */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.nama}
                                                onChange={(e) => setFormData({...formData, nama: e.target.value})}
                                                 placeholder="Nama "
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            />
                                        </div>

                                        {/* 2. Input Email */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Email Aktif</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                placeholder="Email"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            />
                                        </div>

                                        {/* 3. Input Nomor Handphone / WA */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">No. Handphone / WhatsApp</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.nohp}
                                                onChange={(e) => setFormData({...formData, nohp: e.target.value})}
                                                placeholder="No handphone"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            />
                                        </div>

                                        {/* 4. Input Subjek */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Subjek Pesan</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.subjek}
                                                onChange={(e) => setFormData({...formData, subjek: e.target.value})}
                                                placeholder="Pesan"
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                                            />
                                        </div>

                                        {/* 5. Input Isi Pesan */}
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">Isi Pesan</label>
                                            <textarea
                                                rows={5}
                                                required
                                                value={formData.pesan}
                                                onChange={(e) => setFormData({...formData, pesan: e.target.value})}
                                                placeholder="Tuliskan detail maksud dan tujuan pesan Anda di sini..."
                                                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition resize-none"
                                            ></textarea>
                                        </div>

                                        {/* Tombol Kirim */}
                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition"
                                        >
                                            <span>Kirim Sekarang</span>
                                            <Send className="size-4" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </section>

                {/* INTEGRASI PETA GOOGLE MAPS INDEPENDEN */}

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
                            <li><Link href="/" className="hover:text-white transition">Beranda</Link></li>
                            <li><Link href="/umkm" className="hover:text-white transition">UMKM</Link></li>
                            <li><Link href="/produk" className="hover:text-white transition">Produk</Link></li>
                            <li><Link href="tentangdesa" className="hover:text-white transition">Tentang Desa</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Kontak</p>
                        <ul className="mt-4 space-y-3 text-sm text-emerald-200/80">
                            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-emerald-400" /> <span>Desa Mandalamekar, Kec. Cimenyan</span></li>
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
                <div className="border-t border-white/5 py-4 text-center text-xs text-emerald-200/60">© 2026 UMKM Desa Mandalamekar. Universitas Yarsi.</div>
            </footer>
        </div>
    );
}
