import { Link } from '@inertiajs/react';
import { Sprout } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.15)_0,_rgba(255,255,255,0)_40%),linear-gradient(180deg,#f8fbf8_0%,#ffffff_100%)] p-6 md:p-10">
            <div className="w-full max-w-md rounded-[2rem] border border-slate-200/60 bg-white/80 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl sm:p-10">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-4">
                        <Link href="/" className="flex flex-col items-center gap-2 transition hover:scale-105">
                            <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                                <Sprout className="size-8" />
                            </div>
                            <div className="mt-2 text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">UMKM</p>
                                <p className="text-lg font-extrabold tracking-tight text-slate-900 leading-none">Desa Mandalamekar</p>
                            </div>
                        </Link>

                        <div className="mt-2 space-y-1.5 text-center">
                            {/* Teks diterjemahkan otomatis ke Bahasa Indonesia */}
                            <h1 className="text-xl font-bold text-slate-900">
                                {title === 'Log in to your account' ? 'Masuk ke Akun Anda' : title}
                            </h1>
                            <p className="text-sm text-slate-500">
                                {description === 'Enter your email and password below to log in'
                                    ? 'Masukkan alamat email dan kata sandi Anda untuk mengakses dashboard.'
                                    : description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
