<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $user = $request->user();
        $loginType = $request->input('login_type', 'operator'); // Ambil info tab dari frontend

        // 1. Cek Blokir Salah Pintu: Jika akun UMKM login di tab Operator
        if ($loginType === 'operator' && $user->role === 'umkm') {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return back()->withErrors(['username' => 'Akun Anda adalah akun UMKM. Silakan pilih tab "Login UMKM"!']);
        }

        // 2. Cek Blokir Salah Pintu: Jika Operator/Admin login di tab UMKM
        if ($loginType === 'umkm' && $user->role !== 'umkm') {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return back()->withErrors(['username' => 'Anda bukan pengelola UMKM. Silakan pilih tab "Login Operator"!']);
        }

        $request->session()->regenerate();

        // 3. Pengalihan Dashboard Sesuai Peran
        if ($user->role === 'umkm') {
            return redirect()->intended(route('umkm.dashboard'));
        }

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
