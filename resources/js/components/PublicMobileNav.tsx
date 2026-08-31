import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
    { label: 'Beranda', routeName: 'home' },
    { label: 'UMKM', routeName: 'umkm.umkmPage' },
    { label: 'Produk', routeName: 'produk' },
    { label: 'Tentang Desa', routeName: 'tentangdesa' },
    { label: 'Kontak', routeName: 'kontak' },
];

export function PublicMobileNav({
    activeRouteName,
    activeHref,
}: Readonly<{ activeRouteName?: string; activeHref?: string }>) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative lg:hidden">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                aria-expanded={isOpen}
            >
                {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>

            {isOpen && (
                <nav className="absolute right-0 top-[calc(100%+0.75rem)] z-[60] w-60 rounded-2xl border border-emerald-100 bg-white p-2 shadow-xl shadow-slate-900/15">
                    {links.map((link) => {
                        const targetUrl = route(link.routeName);
                        const isActive =
                            activeRouteName === link.routeName ||
                            (activeHref && activeHref.includes(link.routeName)) ||
                            (typeof route().current === 'function' && route().current(link.routeName));

                        return (
                            <Link
                                key={link.routeName}
                                href={targetUrl}
                                onClick={() => setIsOpen(false)}
                                className={`block rounded-xl px-4 py-3 text-sm transition ${
                                    isActive
                                        ? 'bg-emerald-600 font-semibold text-white shadow-sm'
                                        : 'font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </div>
    );
}
