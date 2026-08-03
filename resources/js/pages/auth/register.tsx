import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';

interface RegisterForm {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    [key: string]: string | undefined;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    // State toggle visibilitas kata sandi
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12)_0,_rgba(255,255,255,0)_36%),linear-gradient(180deg,#f4faf6_0%,#f8fbf8_45%,#ffffff_100%)] p-6 font-sans text-slate-900">
            <Head title="Create an account - UMKM Desa Mandalamekar" />

            {/* TOMBOL KEMBALI KE BERANDA */}
            <Link
                href="/"
                className="absolute left-6 top-6 z-50 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-bold text-emerald-700 shadow-md backdrop-blur-md transition-all hover:-translate-x-1 hover:bg-white hover:text-emerald-800"
            >
                <ArrowLeft className="size-4" />
                Kembali ke Beranda
            </Link>

            {/* KARTU FORMULIR REGISTER */}
            <div className="w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/60">

                {/* HEADER LOGO DESA MANDALAMEKAR */}
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-md border border-slate-100 shrink-0 mb-3">
                        <img
                            src="/images/Logo DesaMandalamekar.png"
                            alt="Logo Desa Mandalamekar"
                            className="size-full object-contain drop-shadow-xs"
                        />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">UMKM</span>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-none">Desa Mandalamekar</h2>

                    <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">Create an account</h3>
                    <p className="mt-1 text-sm text-slate-500">Enter your details below to create your account</p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={submit}>
                    {/* 1. Name */}
                    <div className="grid gap-1.5">
                        <label htmlFor="name" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                            className="w-full border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* 2. Username */}
                    <div className="grid gap-1.5">
                        <label htmlFor="username" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            disabled={processing}
                            placeholder="Enter your username"
                            className="w-full border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition"
                        />
                        <InputError message={errors.username} />
                    </div>

                    {/* 3. Email */}
                    <div className="grid gap-1.5">
                        <label htmlFor="email" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                            className="w-full border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm transition"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* 4. Password (Ikon mata bawaan browser disembunyikan via CSS) */}
                    <div className="grid gap-1.5">
                        <label htmlFor="password" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                                className="w-full border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl pl-4 pr-11 py-3 text-sm transition [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 focus:outline-none p-1 transition-colors cursor-pointer"
                                tabIndex={-1}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    {/* 5. Confirm Password (Ikon mata bawaan browser disembunyikan via CSS) */}
                    <div className="grid gap-1.5">
                        <label htmlFor="password_confirmation" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">
                            Confirm password
                        </label>
                        <div className="relative">
                            <input
                                id="password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                                className="w-full border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl pl-4 pr-11 py-3 text-sm transition [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 focus:outline-none p-1 transition-colors cursor-pointer"
                                tabIndex={-1}
                                aria-label="Toggle confirm password visibility"
                            >
                                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                        <InputError message={errors.password_confirmation} />
                    </div>

                    {/* TOMBOL CREATE ACCOUNT HIJAU */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer disabled:opacity-50"
                        tabIndex={5}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        <span>Create account</span>
                    </button>

                    {/* TAUTAN LOG IN */}
                    <div className="text-center text-sm font-medium text-slate-600 pt-2">
                        Already have an account?{' '}
                        <Link
                            href={route('login')}
                            tabIndex={6}
                            className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline transition"
                        >
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
