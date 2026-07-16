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
        $request->session()->regenerate();

        $user = $request->user();
        $loginType = $request->input('login_type', 'operator');

        // LOGIKA KEAMANAN:
        // Jika User adalah UMKM, tapi mencoba login di tab Operator -> Tolak!
        if ($user->role === 'umkm' && $loginType === 'operator') {
            Auth::guard('web')->logout();
            return back()->withErrors(['username' => 'Akun ini terdaftar sebagai UMKM, silakan gunakan tab "Login UMKM"!']);
        }

        // Jika User adalah Admin/Operator, tapi mencoba login di tab UMKM -> Tolak!
        if ($user->role !== 'umkm' && $loginType === 'umkm') {
            Auth::guard('web')->logout();
            return back()->withErrors(['username' => 'Akun ini terdaftar sebagai Operator, silakan gunakan tab "Login Operator"!']);
        }

        // PENGALIHAN DASHBOARD (Yang ini wajib diperbaiki):
        if ($user->role === 'umkm') {
            return redirect()->intended(route('umkm.dashboard'));
        }

        // Semua role selain umkm (admin/superadmin/operator) akan ke sini:
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
