import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Mail, Calendar, User, Phone, MessageSquare } from 'lucide-react';

interface Pesan {
    id: number;
    nama: string;
    email: string;
    nohp: string;
    subjek: string;
    pesan: string;
    created_at: string;
}

interface PageProps {
    pesanMasuk: Pesan[];
}

export default function KontakAdmin({ pesanMasuk = [] }: PageProps) {
    // Fungsi sederhana untuk memformat tanggal
    const formatTanggal = (tanggal: string) => {
        const date = new Date(tanggal);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric', 
            month: 'long', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-6 lg:p-8">
            <Head title="Pesan Masuk - Admin Desa" />

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Pesan Masuk</h1>
                        <p className="text-sm text-slate-500 mt-1">Daftar pesan dari pengunjung website dan UMKM.</p>
                    </div>
                    {/* Tombol kembali ke Dashboard */}
                    <Link 
                        href="/dashboard" 
                        className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 hover:text-emerald-600 transition"
                    >
                        Kembali ke Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                    {pesanMasuk.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {pesanMasuk.map((item) => (
                                <div key={item.id} className="p-4 sm:p-6 hover:bg-slate-50/50 transition">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <MessageSquare className="size-5 text-emerald-600" />
                                                {item.subjek}
                                            </h3>
                                            
                                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <User className="size-4 text-slate-400 shrink-0" /> 
                                                    <span className="font-semibold truncate">{item.nama}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="size-4 text-slate-400 shrink-0" /> 
                                                    <span className="truncate">{item.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="size-4 text-slate-400 shrink-0" /> 
                                                    <span>{item.nohp}</span>
                                                </div>
                                            </div>

                                            <div className="mt-4 text-slate-700 leading-relaxed text-sm bg-white p-3.5 sm:p-5 border border-slate-100 rounded-xl whitespace-pre-wrap shadow-sm">
                                                {item.pesan}
                                            </div>
                                        </div>
                                        
                                        <div className="text-left md:text-right md:w-48 shrink-0 flex items-center md:justify-end gap-1.5 text-xs text-slate-400 font-medium">
                                            <Calendar className="size-3.5 shrink-0" />
                                            <span>{formatTanggal(item.created_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-16 text-center flex flex-col items-center">
                            <div className="flex size-20 items-center justify-center rounded-full bg-slate-50 mb-4">
                                <Mail className="size-10 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700">Belum Ada Pesan Masuk</h3>
                            <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                                Kotak masuk masih kosong saat ini. Pesan yang dikirim melalui form kontak akan muncul di sini.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}