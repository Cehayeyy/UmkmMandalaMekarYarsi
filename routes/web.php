<?php



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



Route::middleware(['auth'])->group(function () {

    Route::get('dashboard', function () {
<<<<<<< HEAD
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

 Route::get('admin/dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');
=======

        return Inertia::render('dashboard');

    })->name('dashboard');

>>>>>>> 685c2dd6a6b38ac137851eb9e7dfbe82a42fb1e1
});



require __DIR__.'/settings.php';

require __DIR__.'/auth.php';

