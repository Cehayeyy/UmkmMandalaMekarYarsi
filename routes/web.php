<?php

use App\Http\Controllers\AkunController;
use App\Http\Controllers\ProdukController; // <--- 1. Tambahkan ini
use App\Models\User; 
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/umkm', function () {
    // Ambil data user yang merupakan UMKM secara dinamis
    $umkmList = User::where('role', 'umkm')->latest()->get();

    return Inertia::render('umkm/umkmPage', [
        'umkmList' => $umkmList
    ]);
})->name('umkm.umkmPage');

Route::get('/produk', function () {
    return Inertia::render('produk');
})->name('produk');

Route::get('/tentangdesa', function () {
    return Inertia::render('TentangDesa');
})->name('tentangdesa');

Route::get('/kontak', function () {
    return Inertia::render('kontak');
})->name('kontak');

// --- GRUP RUTE ADMIN & OPERATOR ---
Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        if (auth()->user()->role === 'umkm') {
            return redirect()->route('umkm.dashboard');
        }

        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    // PERBAIKAN: Menggunakan rute group untuk fungsi pengecekan Admin
    Route::group([], function () {
        Route::get('admin/dashboard', function () {
            if (auth()->user()->role === 'umkm') {
                return redirect()->route('umkm.dashboard');
            }
            return redirect()->route('dashboard');
        })->name('admin.dashboard');

        // CRUD Manajemen Akun (Ditambahkan pengecekan manual agar aman dari URL bypass)
        Route::get('admin/manajemen-akun', function () {
            if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');
            return app(AkunController::class)->index();
        })->name('admin.akun');

        Route::post('admin/manajemen-akun/operator', [AkunController::class, 'storeOperator'])->name('admin.akun.storeOperator');
        Route::post('admin/manajemen-akun/umkm', [AkunController::class, 'storeUmkm'])->name('admin.akun.storeUmkm');
        Route::put('admin/manajemen-akun/operator/{user}', [AkunController::class, 'updateOperator'])->name('admin.akun.updateOperator');
        Route::delete('admin/manajemen-akun/operator/{user}', [AkunController::class, 'destroyOperator'])->name('admin.akun.destroyOperator');
    });
});

// --- GRUP RUTE KHUSUS DASHBOARD UMKM ---
Route::middleware(['auth'])->group(function () {
    Route::get('umkm/dashboard', function () {
        if (auth()->user()->role !== 'umkm') {
            return redirect()->route('dashboard');
        }

        return Inertia::render('umkm/dashboard'); 
    })->name('umkm.dashboard');

    // RUTE EDIT PROFIL UMKM
    Route::get('umkm/profil', function () {
        if (auth()->user()->role !== 'umkm') return redirect()->route('dashboard');
        return app(\App\Http\Controllers\UmkmController::class)->edit(request());
    })->name('umkm.profil.edit');

    Route::put('umkm/profil', function () {
        if (auth()->user()->role !== 'umkm') return redirect()->route('dashboard');
        return app(\App\Http\Controllers\UmkmController::class)->update(request());
    })->name('umkm.profil.update');

    // --- RUTE PRODUK UMKM ---
    Route::get('umkm/produk', function () {
        if (auth()->user()->role !== 'umkm') return redirect()->route('dashboard');
        return app(ProdukController::class)->index(request());
    })->name('umkm.produk.index');

    Route::post('umkm/produk', function () {
        if (auth()->user()->role !== 'umkm') return redirect()->route('dashboard');
        return app(ProdukController::class)->store(request());
    })->name('umkm.produk.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';