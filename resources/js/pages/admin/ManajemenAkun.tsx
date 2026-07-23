import { type SharedData } from '@/types';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import {
    Bell, ChevronDown, ChevronRight, LayoutDashboard, LogOut,
    MessageCircle, Package, Search, Settings, Shield,
    Sprout, Store, Tag, Users, Plus, Edit, Trash2, X
} from 'lucide-react';
import { useState } from 'react';

const sidebarSections = [
    {
        title: 'MANAJEMEN',
        items: [
           { label: 'Manajemen UMKM', icon: Store, hasSubmenu: false, href: '/admin/manajemen-umkm', active: false },
            { label: 'Manajemen Akun', icon: Users, hasSubmenu: false, href: '/admin/manajemen-akun', active: false },
            { label: 'Kategori Produk', icon: Tag, hasSubmenu: false, href: '/admin/kategori-produk', active: false },
            { label: 'Produk', icon: Package, hasSubmenu: false, href: '/admin/produk', active: false },
        ],
    },
    {
        title: 'PENGATURAN',
        items: [
            { label: 'Pengaturan Website', icon: Settings, href: '#', active: false },
        ],
    },
];

export default function ManajemenAkun({ users = [] }: { users?: any[] }) {
    const { auth } = usePage<SharedData>().props;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'admin' | 'umkm'>('admin');

    // STATE MODAL
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    // FORM TAMBAH AKUN (Hanya Username & Password)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        password: '',
    });

    // FORM EDIT AKUN
    const editForm = useForm({
        name: '',
        username: '',
        password: '',
    });

    // FUNGSI SUBMIT TAMBAH
    const submitAdd = (e: React.FormEvent) => {
        e.preventDefault();

        // Pilihan rute dinamis: jika tab admin aktif ke storeOperator, jika tidak ke storeUmkm
        const targetRoute = activeTab === 'admin'
            ? route('admin.akun.storeOperator')
            : route('admin.akun.storeUmkm');

        post(targetRoute, {
            onSuccess: () => {
                setIsAddModalOpen(false);
                reset();
            },
        });
    };

    // FUNGSI BUKA MODAL EDIT
    const openEditModal = (user: any) => {
        setSelectedUser(user);
        editForm.setData({ username: user.username, password: '' });
        setIsEditModalOpen(true);
    };

    // FUNGSI SUBMIT EDIT
    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        editForm.put(route('admin.akun.updateOperator', selectedUser.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                editForm.reset();
            },
        });
    };

    // FUNGSI DELETE
    const handleDelete = (user: any) => {
        if (confirm(`Yakin ingin menghapus akun @${user.username}?`)) {
            router.delete(route('admin.akun.destroyOperator', user.id));
        }
    };

    // Filter data berdasarkan Tab
    const filteredUsers = users.filter((u: any) => {
        if (activeTab === 'admin') return u.role === 'superadmin' || u.role === 'operator' || !u.role;
        return u.role === 'umkm';
    });

    return (
        <>
            <Head title="Manajemen Akun - Admin Mandalamekar" />

            <div className="flex min-h-screen bg-slate-50 text-slate-900">
                {/* --- SIDEBAR --- */}
                <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-emerald-950 text-emerald-100">
                    <div className="flex items-center gap-3 px-6 py-6">
                        <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                            <Sprout className="size-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">UMKM</p>
                            <p className="text-base font-bold leading-tight text-white">Desa Mandalamekar</p>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-4 pb-4">
                        <Link href={route('dashboard')} className="mb-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-emerald-100/80 transition hover:bg-white/5">
                            <LayoutDashboard className="size-4" /> Dashboard
                        </Link>

                        {sidebarSections.map((section) => (
                            <div key={section.title} className="mb-5">
                                <p className="px-3 text-xs font-semibold tracking-[0.15em] text-emerald-400/70">{section.title}</p>
                                <div className="mt-2 space-y-1">
                                    {section.items.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link key={item.label} href={item.href} className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition ${item.active ? 'bg-emerald-600 font-semibold text-white shadow-md shadow-emerald-900/40' : 'text-emerald-100/90 hover:bg-white/5'}`}>
                                                <span className="flex items-center gap-3"><Icon className="size-4" /> {item.label}</span>
                                                {item.active && <ChevronRight className="size-4 text-emerald-200" />}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className="border-t border-white/10 p-4">
                        <Link href={route('logout')} method="post" as="button" className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-emerald-100 transition hover:bg-white/5">
                            <LogOut className="size-4" /> Keluar
                        </Link>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <div className="ml-72 flex-1">
                    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-8 py-5 backdrop-blur-xl">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-slate-900">Manajemen Akun</h1>
                                <p className="mt-1 text-sm text-slate-500">Kelola akun akses untuk Operator/Admin dan pelaku UMKM.</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="relative flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"><Bell className="size-5" /></button>
                                <div className="h-8 w-px bg-slate-200" />
                                <div className="relative">
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3">
                                        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Shield className="size-5" /></div>
                                        <div className="text-left"><p className="text-sm font-semibold text-slate-900">{auth.user?.name ?? 'Admin'}</p><p className="text-xs text-slate-500">Super Admin</p></div>
                                        <ChevronDown className="size-4 text-slate-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="p-8">
                        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="inline-flex rounded-xl bg-slate-200/60 p-1">
                                <button onClick={() => setActiveTab('admin')} className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition ${activeTab === 'admin' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                    <Shield className="size-4" /> Akun Operator
                                </button>
                                <button onClick={() => setActiveTab('umkm')} className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition ${activeTab === 'umkm' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                                    <Store className="size-4" /> Akun UMKM
                                </button>
                            </div>

                            <button onClick={() => { reset(); setIsAddModalOpen(true); }} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700">
                                <Plus className="size-4" /> {activeTab === 'admin' ? 'Tambah Operator' : 'Buat Akun UMKM'}
                            </button>
                        </div>

                        {/* TABEL DATA ASLI DARI DATABASE */}
                        <div className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 overflow-hidden">
                            <div className="border-b border-slate-100 p-5 flex items-center justify-between">
                                <h2 className="text-base font-bold text-slate-800">Daftar {activeTab === 'admin' ? 'Akun Operator & Admin' : 'Akun Pengelola UMKM'}</h2>
                                <div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Cari username/nama..." className="rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" /></div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50/50 text-slate-500">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Username</th>
                                            <th className="px-6 py-4 font-semibold">Peran</th>
                                            <th className="px-6 py-4 font-semibold">Status</th>
                                            <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map((u: any) => (
                                                <tr key={u.id} className="transition hover:bg-slate-50/50">
                                                    <td className="px-6 py-4 font-medium text-slate-900">@{u.username}</td>
                                                    <td className="px-6 py-4 text-slate-600 uppercase text-xs font-bold">{u.role || 'Operator'}</td>
                                                    <td className="px-6 py-4"><span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">Aktif</span></td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button onClick={() => openEditModal(u)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-emerald-600 transition" title="Edit Akun"><Edit className="size-4" /></button>
                                                            {auth.user?.id !== u.id && (
                                                                <button onClick={() => handleDelete(u)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition" title="Hapus Akun"><Trash2 className="size-4" /></button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan={4} className="py-8 text-center text-slate-400">Belum ada akun di kategori ini.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {/* --- MODAL TAMBAH AKUN --- */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Tambah Akun Baru</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="size-5" /></button>
                        </div>
                        <form className="space-y-4" onSubmit={submitAdd}>
                            {/* BLOK INI WAJIB DITAMBAHKAN UNTUK AKUN UMKM */}
                            {activeTab === 'umkm' && (
                                <div>
                                    <label className="mb-1.5 block text-sm font-bold text-slate-700">Nama Toko / UMKM</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        placeholder="Contoh: Kopi Berkah"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                    {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                                </div>
                            )}
                            {/* ------------------------------------------- */}

                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-slate-700">Username Login</label>
                                <input
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    required
                                    placeholder="Contoh: admin_ops"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                                {errors.username && <span className="text-xs text-red-500">{errors.username}</span>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-slate-700">Kata Sandi</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    placeholder="Minimal 8 karakter"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                                {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
                            </div>

                            <div className="mt-8 flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Batal</button>
                                <button type="submit" disabled={processing} className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition disabled:opacity-50">{processing ? 'Menyimpan...' : 'Simpan Akun'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- MODAL EDIT AKUN --- */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Edit Akun (@{selectedUser?.username})</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="size-5" /></button>
                        </div>

                        <form className="space-y-4" onSubmit={submitEdit}>
                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-slate-700">Username Login</label>
                                <input
                                    type="text"
                                    value={editForm.data.username}
                                    onChange={(e) => editForm.setData('username', e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                                {editForm.errors.username && <span className="text-xs text-red-500">{editForm.errors.username}</span>}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-bold text-slate-700">Kata Sandi Baru (Opsional)</label>
                                <input
                                    type="password"
                                    value={editForm.data.password}
                                    onChange={(e) => editForm.setData('password', e.target.value)}
                                    placeholder="Kosongkan jika tidak ingin mengubah sandi"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                />
                                {editForm.errors.password && <span className="text-xs text-red-500">{editForm.errors.password}</span>}
                            </div>

                            <div className="mt-8 flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Batal</button>
                                <button type="submit" disabled={editForm.processing} className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition disabled:opacity-50">{editForm.processing ? 'Menyimpan...' : 'Update Akun'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
