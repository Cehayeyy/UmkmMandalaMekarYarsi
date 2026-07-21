import { type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    LayoutDashboard, LogOut, Package, Store, Tag, Plus, Upload, Trash2
} from 'lucide-react';
import { FormEventHandler } from 'react';

interface Product {
    id: number;
    nama_produk: string;
    harga: number;
    kategori: string;
    foto: string | null;
}

export default function ProdukSaya({ produkList = [] }: { produkList: Product[] }) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, processing, reset } = useForm({
        nama_produk: '',
        kategori: 'Makanan & Minuman',
        harga: '',
        deskripsi: '',
        foto: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('umkm.produk.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Produk Saya" />
            <div className="flex min-h-screen bg-slate-50 text-slate-900">
                {/* SIDEBAR */}
                <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100">
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white"><Store className="size-6" /></div>
                        <div>
                            <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Panel Toko</p>
                            <p className="text-base font-bold leading-tight text-white">{auth.user?.name}</p>
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1">
                        <Link href={route('umkm.dashboard')} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition">
                            <LayoutDashboard className="size-4" /> Dashboard Toko
                        </Link>
                        <Link href={route('umkm.produk.index')} className="flex w-full items-center gap-3 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg">
                            <Package className="size-4" /> Produk Saya
                        </Link>
                        <Link href={route('umkm.profil.edit')} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-100/80 hover:bg-white/5 transition">
                            <Tag className="size-4" /> Profil Toko
                        </Link>
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <div className="ml-72 flex-1">
                    <header className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-slate-900">Produk Saya</h1>
                    </header>

                    <main className="p-8">
                        {/* FORM TAMBAH PRODUK */}
                        <div className="bg-white rounded-[1.5rem] p-6 border border-slate-200 shadow-sm mb-8">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Plus className="size-5" /> Tambah Produk Baru</h2>
                            <form onSubmit={submit} encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Nama Produk" className="rounded-xl border-slate-300 p-3" value={data.nama_produk} onChange={e => setData('nama_produk', e.target.value)} required />
                                <select className="rounded-xl border-slate-300 p-3" value={data.kategori} onChange={e => setData('kategori', e.target.value)}>
                                    <option>Makanan & Minuman</option><option>Kerajinan</option><option>Fashion</option><option>Lainnya</option>
                                </select>
                                <input type="number" placeholder="Harga" className="rounded-xl border-slate-300 p-3" value={data.harga} onChange={e => setData('harga', e.target.value)} required />
                                <input type="file" className="rounded-xl border-slate-300 p-2" onChange={e => setData('foto', e.target.files?.[0] || null)} />
                                <textarea placeholder="Deskripsi" className="rounded-xl border-slate-300 p-3 md:col-span-2" value={data.deskripsi} onChange={e => setData('deskripsi', e.target.value)} />
                                <button type="submit" disabled={processing} className="bg-emerald-600 text-white rounded-xl py-3 font-bold hover:bg-emerald-700">Simpan Produk</button>
                            </form>
                        </div>

                        {/* LIST PRODUK */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {produkList.map((p) => (
                                <div key={p.id} className="bg-white p-4 rounded-2xl border shadow-sm">
                                    {p.foto && <img src={`/${p.foto}`} className="w-full h-40 object-cover rounded-xl mb-4" />}
                                    <h3 className="font-bold">{p.nama_produk}</h3>
                                    <p className="text-emerald-600 font-bold">Rp {Number(p.harga).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}