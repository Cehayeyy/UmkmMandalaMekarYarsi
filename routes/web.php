<?php

use App\Http\Controllers\AkunController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/umkm', function () {
    return Inertia::render('umkm/umkmPage');
})->name('umkm.umkmPage');

Route::get('/produk', function () {
    return Inertia::render('produk');
})->name('produk');

// --- RUTE BARU UNTUK TENTANG DESA & KONTAK ---
Route::get('/tentangdesa', function () {
    return Inertia::render('TentangDesa');
})->name('tentangdesa');

Route::get('/kontak', function () {
    return Inertia::render('kontak');
})->name('kontak');
// ----------------------------------------------

// --- GRUP RUTE ADMIN & OPERATOR ---
Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::get('admin/dashboard', function () {
        return redirect()->route('dashboard');
    })->name('admin.dashboard');

    // CRUD Manajemen Akun
    Route::get('admin/manajemen-akun', [AkunController::class, 'index'])->name('admin.akun');
    Route::post('admin/manajemen-akun/operator', [AkunController::class, 'storeOperator'])->name('admin.akun.storeOperator');
    Route::post('admin/manajemen-akun/umkm', [AkunController::class, 'storeUmkm'])->name('admin.akun.storeUmkm');
    Route::put('admin/manajemen-akun/operator/{user}', [AkunController::class, 'updateOperator'])->name('admin.akun.updateOperator');
    Route::delete('admin/manajemen-akun/operator/{user}', [AkunController::class, 'destroyOperator'])->name('admin.akun.destroyOperator');
});

// --- GRUP RUTE KHUSUS DASHBOARD UMKM ---
Route::middleware(['auth'])->group(function () {
    Route::get('umkm/dashboard', function () {
        if (auth()->user()->role !== 'umkm') return redirect()->route('dashboard');
        return Inertia::render('umkm/dashboard'); // File dashboard baru untuk UMKM
    })->name('umkm.dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';