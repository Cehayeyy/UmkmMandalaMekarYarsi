import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, LogIn, Shield, Store } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    username: string;
    password: string;
    remember: boolean;
    login_type: 'operator' | 'umkm';
}

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [loginTab, setLoginTab] = useState<'operator' | 'umkm'>('operator');

    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        username: '',
        password: '',
        remember: false,
        login_type: 'operator',
    });

    const handleTabChange = (tab: 'operator' | 'umkm') => {
        setLoginTab(tab);
        setData('login_type', tab);
        reset('password');
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title={loginTab === 'operator' ? "Login Operator & Admin" : "Login Portal UMKM"}
            description={loginTab === 'operator' ? "Masuk untuk mengelola sistem dan akun UMKM." : "Masuk untuk mengelola toko dan produk UMKM Anda."}
        >
            <Head title="Log in - UMKM Mandalamekar" />

            {/* TAB PERPINDAHAN LOGIN */}
            <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1.5 border border-slate-200">
                <button
                    type="button"
                    onClick={() => handleTabChange('operator')}
                    className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition ${
                        loginTab === 'operator' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                    <Shield className="size-4" /> Operator / Admin
                </button>
                <button
                    type="button"
                    onClick={() => handleTabChange('umkm')}
                    className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold transition ${
                        loginTab === 'umkm' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                    <Store className="size-4" /> Portal UMKM
                </button>
            </div>

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="username" className="text-slate-700 font-bold">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            required
                            autoFocus
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            placeholder={loginTab === 'operator' ? "Contoh: admin" : "Contoh: kopi_mandala"}
                            className="text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 bg-slate-50/80 px-4 py-2.5 transition focus:bg-white"
                        />
                        <InputError message={errors.username} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-slate-700 font-bold">Kata Sandi</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="text-xs font-semibold text-emerald-600">
                                    Lupa kata sandi?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            className="text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 bg-slate-50/80 px-4 py-2.5 transition focus:bg-white"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', checked as boolean)}
                            className="border-slate-300 text-emerald-600"
                        />
                        <Label htmlFor="remember" className="cursor-pointer text-sm font-medium text-slate-600">Ingat saya</Label>
                    </div>

                    <Button
                        type="submit"
                        className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-6 text-sm font-bold text-white shadow-lg transition ${
                            loginTab === 'operator' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25' : 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/25'
                        }`}
                        disabled={processing}
                    >
                        {processing ? <LoaderCircle className="size-5 animate-spin" /> : <LogIn className="size-5" />}
                        <span>{loginTab === 'operator' ? 'Masuk ke Dashboard Admin' : 'Masuk ke Portal UMKM'}</span>
                    </Button>
                </div>
            </form>

            {status && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-center text-sm font-bold text-emerald-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
