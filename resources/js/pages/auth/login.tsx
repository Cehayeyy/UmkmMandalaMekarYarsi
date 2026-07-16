import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, LogIn } from 'lucide-react';
import { FormEventHandler } from 'react';

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
}

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        username: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Masuk ke Dashboard"
            description="Silakan masukkan username dan kata sandi Anda untuk mengelola sistem UMKM."
        >
            <Head title="Log in - UMKM Mandalamekar" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    {/* INPUT USERNAME */}
                    <div className="grid gap-2">
                        <Label htmlFor="username" className="text-slate-700 font-bold">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            placeholder="Contoh: admin"
                            // DITAMBAHKAN text-slate-900 dan placeholder:text-slate-400 DI SINI
                            className="text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 bg-slate-50/80 px-4 py-2.5 transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        />
                        <InputError message={errors.username} />
                    </div>

                    {/* INPUT PASSWORD */}
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-slate-700 font-bold">Kata Sandi</Label>
                            {canResetPassword && (
                                <TextLink
                                    href={route('password.request')}
                                    className="text-xs font-semibold text-emerald-600 transition hover:text-emerald-700"
                                    tabIndex={5}
                                >
                                    Lupa kata sandi?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            // DITAMBAHKAN text-slate-900 dan placeholder:text-slate-400 DI SINI
                            className="text-slate-900 placeholder:text-slate-400 rounded-xl border-slate-200 bg-slate-50/80 px-4 py-2.5 transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        />
                        <InputError message={errors.password} />
                    </div>

                    {/* REMEMBER ME */}
                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            tabIndex={3}
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', checked as boolean)}
                            className="border-slate-300 text-emerald-600 data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600"
                        />
                        <Label htmlFor="remember" className="cursor-pointer text-sm font-medium text-slate-600">
                            Ingat saya
                        </Label>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <Button
                        type="submit"
                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-6 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing ? <LoaderCircle className="size-5 animate-spin" /> : <LogIn className="size-5" />}
                        <span>Masuk ke Dashboard</span>
                    </Button>
                </div>
            </form>

            {/* STATUS MESSAGE */}
            {status && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-center text-sm font-bold text-emerald-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
