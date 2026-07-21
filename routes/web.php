<?php

use App\Http\Controllers\AkunController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\UmkmController;
use App\Models\Product;
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

    Route::group([], function () {
        Route::get('admin/dashboard', function () {
            if (auth()->user()->role === 'umkm') {
                return redirect()->route('umkm.dashboard');
            }
            return redirect()->route('dashboard');
        })->name('admin.dashboard');

        // CRUD Manajemen Akun
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

// Rute Khusus Kategori Produk
Route::get('admin/kategori-produk', function () {
    return Inertia::render('admin/KategoriProduk');
})->name('admin.kategori');

// --- GRUP RUTE KHUSUS DASHBOARD UMKM ---
Route::middleware(['auth'])->group(function () {
    Route::get('umkm/dashboard', function () {
        if (auth()->user()->role !== 'umkm') {
            return redirect()->route('dashboard');
        }

        $produkList = Product::where('user_id', auth()->id())->latest()->get();

        return Inertia::render('umkm/dashboard', [
            'produkList' => $produkList,
        ]);
    })->name('umkm.dashboard');

    // RUTE EDIT PROFIL UMKM
    Route::get('umkm/profil', [UmkmController::class, 'edit'])->name('umkm.profil.edit');
    Route::put('umkm/profil', [UmkmController::class, 'update'])->name('umkm.profil.update');

    // --- RUTE PRODUK UMKM (STIKER RESMI CONTROLLER) ---
    Route::get('umkm/produk', [ProdukController::class, 'index'])->name('umkm.produk.index');
    Route::get('umkm/produk/daftar', [ProdukController::class, 'daftar'])->name('umkm.produk.daftar');
    Route::post('umkm/produk', [ProdukController::class, 'store'])->name('umkm.produk.store');

    // 🛠️ PERBAIKAN RUTE UPDATE & DESTROY PRODUK
    Route::put('umkm/produk/{product}', [ProdukController::class, 'update'])->name('umkm.produk.update');
    Route::delete('umkm/produk/{product}', [ProdukController::class, 'destroy'])->name('umkm.produk.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
