import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useCart } from '@/context/CartContext';
import {
    ArrowRight,
    MapPin,
    Package,
    Phone,
    Sprout,
    Store,
    Facebook,
    Instagram,
    ChevronLeft,
    ShoppingBag,
    Plus,
    Minus,
    Trash2,
    X
} from 'lucide-react';
import { useState, useMemo } from 'react';

interface Product {
    id: number;
    nama_produk: string;
    kategori: string;
    harga: number;
    deskripsi?: string;
    foto: string | null;
}

interface UmkmUser {
    id: number;
    name: string;
    username: string;
    foto_toko?: string | null;
    deskripsi_toko?: string | null;
    no_whatsapp?: string | null; 
    alamat_toko?: string | null;
}

export default function DetailUmkm({ umkm, products = [] }: { umkm: UmkmUser, products: Product[] }) {
    const { auth } = usePage<SharedData>().props;
    
    // Hubungkan Context Keranjang Belanja Global
    const { cartItems, addToCart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Fungsi warna gradasi default jika toko belum punya banner
    const getDefaultGradient = (id: number) => {
        const gradients = [
            'from-emerald-800 to-emerald-950',
            'from-teal-800 to-slate-900',
            'from-emerald-900 to-stone-900',
        ];
        return gradients[id % gradients.length];
    };

    // LOGIKA PEMBENTUKAN URL WHATSAPP
    const whatsappUrl = useMemo(() => {
        if (!umkm.no_whatsapp || cartItems.length === 0) return '#';

        let phoneAdmin = umkm.no_whatsapp.replace(/\D/g, '');
        if (phoneAdmin.startsWith('0')) {
            phoneAdmin = '62' + phoneAdmin.substring(1);
        } else if (!phoneAdmin.startsWith('62')) {
            phoneAdmin = '62' + phoneAdmin;
        }

        let pesan = `Halo *${umkm.name}*, saya ingin memesan produk berikut:\n\n`;
        cartItems.forEach((item, index) => {
            pesan += `${index + 1}. ${item.nama_produk} (${item.quantity}x) - Rp ${(item.harga * item.quantity).toLocaleString('id-ID')}\n`;
        });
        
        pesan += `\n*Total Belanja: Rp ${totalPrice.toLocaleString('id-ID')}*`;
        pesan += `\n\nMohon informasi ketersediaan, ongkos kirim, dan cara pembayarannya. Terima kasih!`;

        return `https://wa.me/${phoneAdmin}?text=${encodeURIComponent(pesan)}`;
    }, [umkm, cartItems, totalPrice]);

    const handleWhatsappClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!umkm.no_whatsapp) {
            e.preventDefault();
            alert('Mohon maaf, toko ini belum mengatur nomor WhatsApp pada pengaturan Profil Toko.');
        }
    };

    return (
        <>
            <Head title={`${umkm.name} - UMKM Mandalamekar`} />
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">

                {/* HEADER / NAVBAR PUBLIK */}
                <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                                <Sprout className="size-6" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-emerald-700">UMKM</p>
                                <p className="text-lg font-bold tracking-tight">Desa Mandalamekar</p>
                            </div>
                        </Link>

                        <nav className="hidden items-center gap-8 lg:flex">
                            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition">Beranda</Link>
                            <Link href="/umkm" className="text-sm font-bold text-emerald-600">UMKM</Link>
                            <Link href="/produk" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition">Produk</Link>
                            <Link href="/tentangdesa" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition">Tentang Desa</Link>
                            <Link href="/kontak" className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition">Kontak</Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setIsCartOpen(true)}
                                className="relative flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-xs"
                                title="Buka Keranjang"
                            >
                                <ShoppingBag className="size-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-extrabold text-white animate-bounce">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            {auth.user ? (
                                <Link href={route('dashboard')} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-sm">
                                    Dashboard <ArrowRight className="size-4" />
                                </Link>
                            ) : (
                                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-sm">
                                    Login <ArrowRight className="size-4" />
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                <main className="pb-20">
                    {/* BANNER TOKO (CARD LEBAR) */}
                    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                        <Link href="/umkm" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 mb-6 transition">
                            <ChevronLeft className="size-4" /> Kembali ke Daftar UMKM
                        </Link>

                        <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 shadow-xl shadow-slate-200 min-h-[320px] flex flex-col justify-end">
                            {umkm.foto_toko ? (
                                <img 
                                    src={`/${umkm.foto_toko}`} 
                                    alt={`Banner ${umkm.name}`} 
                                    className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
                                />
                            ) : (
                                <div className={`absolute inset-0 bg-gradient-to-br ${getDefaultGradient(umkm.id)} opacity-90`} />
                            )}
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                            <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                                <div className="flex items-end gap-6">
                                    <div className="hidden sm:flex size-24 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg overflow-hidden">
                                        {umkm.foto_toko ? (
                                            <img src={`/${umkm.foto_toko}`} alt={umkm.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <Store className="size-10" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                                                Mitra Aktif Desa
                                            </span>
                                            <span className="text-sm font-medium text-slate-300">
                                                @{umkm.username}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                                            {umkm.name}
                                        </h1>
                                        <p className="max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
                                            {umkm.deskripsi_toko || "Toko ini adalah mitra resmi UMKM Desa Mandalamekar yang menyediakan berbagai produk lokal unggulan berkualitas."}
                                        </p>
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    <a 
                                        href={`https://maps.google.com/?q=${encodeURIComponent((umkm.alamat_toko || 'Desa Mandalamekar') + ', Mandalamekar, Bandung')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-white/90 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/20 transition cursor-pointer"
                                        title="Buka di Google Maps"
                                    >
                                        <MapPin className="size-4 text-emerald-400 shrink-0" />
                                        <span className="truncate max-w-[200px]">{umkm.alamat_toko || 'Desa Mandalamekar'}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* KATALOG PRODUK TOKO INI */}
                    <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                            <h2 className="text-2xl font-bold text-slate-900">Etalase Produk</h2>
                            <span className="text-sm font-bold text-slate-500 bg-slate-200/50 px-3 py-1 rounded-lg">
                                {products.length} Produk
                            </span>
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.map((p) => {
                                    const cartItem = cartItems.find(item => item.id === p.id);
                                    
                                    return (
                                        <article key={p.id} className="group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                            
                                            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                                                {p.foto ? (
                                                    <img 
                                                        src={`/${p.foto}`} 
                                                        alt={p.nama_produk} 
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <Package className="size-12" />
                                                    </div>
                                                )}
                                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 px-3 py-1.5 rounded-full shadow-sm">
                                                    {p.kategori}
                                                </span>
                                            </div>

                                            <div className="p-5 flex flex-col flex-1">
                                                <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                                    {p.nama_produk}
                                                </h3>
                                                
                                                <p className="text-sm text-slate-500 line-clamp-2 min-h-[40px] mb-4">
                                                    {p.deskripsi || "Tidak ada deskripsi produk."}
                                                </p>

                                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                                    <p className="text-lg font-extrabold text-emerald-600">
                                                        Rp {Number(p.harga).toLocaleString('id-ID')}
                                                    </p>
                                                    
                                                    {cartItem ? (
                                                        <div className="flex items-center border border-emerald-200 rounded-xl p-0.5 bg-emerald-50 h-9">
                                                            <button 
                                                                onClick={() => {
                                                                    if (cartItem.quantity <= 1) {
                                                                        removeFromCart(p.id);
                                                                    } else {
                                                                        updateQuantity(p.id, -1);
                                                                    }
                                                                }} 
                                                                className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition cursor-pointer"
                                                            >
                                                                <Minus className="size-3.5" />
                                                            </button>
                                                            <span className="min-w-[20px] text-center text-xs font-bold text-emerald-800">
                                                                {cartItem.quantity}
                                                            </span>
                                                            <button 
                                                                onClick={() => updateQuantity(p.id, 1)} 
                                                                className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition cursor-pointer"
                                                            >
                                                                <Plus className="size-3.5" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button 
                                                            onClick={() => addToCart(p)}
                                                            className="flex items-center justify-center size-9 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-colors active:scale-95 shadow-sm cursor-pointer"
                                                            title="Tambah ke Keranjang"
                                                        >
                                                            <Plus className="size-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] bg-white text-slate-500">
                                <div className="bg-slate-50 p-5 rounded-full mb-4">
                                    <Package className="size-10 text-slate-300" />
                                </div>
                                <h3 className="font-bold text-lg text-slate-800">Toko Masih Kosong</h3>
                                <p className="text-sm mt-1 text-slate-400">UMKM ini belum menambahkan produk ke etalase mereka.</p>
                            </div>
                        )}
                    </section>
                </main>

                {/* SLIDE-OVER DRAWER: SISI KERANJANG BELANJA */}
                {isCartOpen && (
                    <div className="fixed inset-0 z-50 overflow-hidden">
                        <div onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" />
                        
                        <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="w-screen max-w-md transform bg-white shadow-2xl transition-all duration-300 flex flex-col h-full border-l border-slate-100 rounded-l-[2rem]">
                                
                                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-tl-[2rem]">
                                    <div className="flex items-center gap-2">
                                        <ShoppingBag className="size-5 text-emerald-600" />
                                        <h2 className="text-lg font-bold text-slate-900">Keranjang Belanja ({totalItems})</h2>
                                    </div>
                                    <button onClick={() => setIsCartOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer">
                                        <X className="size-5" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {cartItems.length > 0 ? (
                                        cartItems.map((item) => (
                                            <div key={item.id} className="flex gap-4 items-center border border-slate-100 p-3 rounded-2xl bg-white shadow-xs">
                                                <div className="size-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center text-slate-300">
                                                    {item.foto ? (
                                                        <img src={`/${item.foto}`} alt={item.nama_produk} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Package className="size-6" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-slate-900 text-sm truncate">{item.nama_produk}</h4>
                                                    <p className="text-xs text-slate-400 font-medium mb-1.5">{item.kategori}</p>
                                                    <p className="text-sm font-extrabold text-emerald-600">Rp {(item.harga * item.quantity).toLocaleString('id-ID')}</p>
                                                </div>

                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 shadow-inner">
                                                        <button 
                                                            onClick={() => {
                                                                if (item.quantity <= 1) {
                                                                    removeFromCart(item.id);
                                                                } else {
                                                                    updateQuantity(item.id, -1);
                                                                }
                                                            }} 
                                                            className="p-1 hover:text-emerald-600 transition cursor-pointer"
                                                        >
                                                            <Minus className="size-3" />
                                                        </button>
                                                        <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-emerald-600 transition cursor-pointer"><Plus className="size-3" /></button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-500 p-1 transition cursor-pointer" title="Hapus"><Trash2 className="size-3.5" /></button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                                            <ShoppingBag className="size-12 text-slate-200 mb-2" />
                                            <p className="text-sm font-medium">Keranjang belanja kosong</p>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-slate-100 p-6 bg-slate-50/50 rounded-bl-[2rem] space-y-4">
                                    <div className="flex items-center justify-between text-slate-900">
                                        <span className="text-sm font-semibold text-slate-500">Total Pembayaran:</span>
                                        <span className="text-xl font-black text-emerald-700">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                    </div>
                                    
                                    {cartItems.length > 0 ? (
                                        <a 
                                            href={whatsappUrl}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={handleWhatsappClick}
                                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition text-center cursor-pointer"
                                        >
                                            <span>Lanjutkan ke WhatsApp</span>
                                            <ArrowRight className="size-4" />
                                        </a>
                                    ) : (
                                        <button 
                                            disabled
                                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-200 py-3.5 text-sm font-bold text-slate-400 transition cursor-not-allowed"
                                        >
                                            <span>Lanjutkan ke WhatsApp</span>
                                            <ArrowRight className="size-4" />
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {/* Floating Button Keranjang di Sudut Kanan Bawah */}
                {totalItems > 0 && !isCartOpen && (
                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-4 text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 hover:scale-105 transition-all duration-300 animate-bounce cursor-pointer"
                    >
                        <ShoppingBag className="size-5" />
                        <span className="text-sm font-bold">Keranjang ({totalItems})</span>
                    </button>
                )}

                {/* FOOTER PUBLIK */}
                <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900">
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600 text-white"><Sprout className="size-5" /></div>
                                <p className="font-semibold text-white">UMKM Mandalamekar</p>
                            </div>
                            <p className="mt-4 max-w-xs text-sm leading-6 text-emerald-200/80">Dukung produk lokal, majukan ekonomi desa.</p>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Kontak</p>
                            <ul className="mt-4 space-y-3 text-sm text-emerald-200/80">
                                <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4" /> <span>Desa Mandalamekar, Kab. Bandung</span></li>
                                <li className="flex items-center gap-2"><Phone className="size-4" /> <span>0812-3456-7890</span></li>
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
                </footer>
            </div>
        </>
    );
}