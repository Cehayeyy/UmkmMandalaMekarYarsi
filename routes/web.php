<?php

use App\Http\Controllers\AkunController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\UmkmController;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ==========================================
// --- ROUTE PUBLIK ---
// ==========================================
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/umkm', function () {
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


// ==========================================
// --- ROUTE ADMIN & OPERATOR ---
// ==========================================
Route::middleware(['auth'])->group(function () {

    // 1. Dashboard Admin
    Route::get('dashboard', function () {
        $user = auth()->user();

        if ($user->role === 'umkm') {
            return redirect()->route('umkm.dashboard');
        }

        $totalUmkm = User::where('role', 'umkm')->count();
        $totalAkunUmkm = User::where('role', 'umkm')->count();
        $totalProduk = class_exists(Product::class) ? Product::count() : 0;
        $umkmAktif = User::where('role', 'umkm')->count();

        $umkmTerbaru = User::where('role', 'umkm')->latest()->take(3)->get()->map(function ($u) {
            return [
                'name' => $u->name ?? $u->username,
                'category' => 'UMKM Desa',
                'joined' => $u->created_at ? $u->created_at->translatedFormat('d M Y') : 'Baru saja',
                'tone' => 'from-amber-700 via-amber-800 to-stone-900',
            ];
        });

        $akunUmkm = User::where('role', 'umkm')->latest()->take(5)->get()->map(function ($u) {
            return [
                'id' => $u->id,
                'name' => $u->name ?? '-',
                'owner' => $u->username,
                'email' => $u->email ?? $u->username . '@mandalamekar.desa',
                'status' => 'Aktif',
                'tone' => 'from-emerald-700 via-emerald-800 to-stone-900',
            ];
        });

        $chartData = [
            ['label' => 'Senin', 'value' => 10],
            ['label' => 'Selasa', 'value' => 25],
            ['label' => 'Rabu', 'value' => 45],
            ['label' => 'Kamis', 'value' => 30],
            ['label' => 'Jumat', 'value' => 60],
            ['label' => 'Sabtu', 'value' => 75],
            ['label' => 'Minggu', 'value' => 50],
        ];

        $aktivitas = [
            ['icon' => 'Sprout', 'text' => 'Sistem pemantauan real-time aktif', 'by' => 'Sistem Mandalamekar', 'time' => 'Baru saja'],
        ];

        return Inertia::render('admin/dashboard', [
            'statsData' => [
                'totalUmkm' => $totalUmkm,
                'totalProduk' => $totalProduk,
                'totalAkunUmkm' => $totalAkunUmkm,
                'umkmAktif' => $umkmAktif,
            ],
            'umkmTerbaru' => $umkmTerbaru,
            'akunUmkm' => $akunUmkm,
            'chartData' => $chartData,
            'aktivitas' => $aktivitas,
        ]);
    })->name('dashboard');

    Route::get('admin/dashboard', function () {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');
        return redirect()->route('dashboard');
    })->name('admin.dashboard');

    // 2. Manajemen UMKM Admin
    Route::get('admin/manajemen-umkm', function () {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');

        $umkms = User::where('role', 'umkm')->latest()->get()->map(function ($u) {
            return [
                'id' => $u->id,
                'name' => $u->name ?? 'Belum ada nama toko',
                'username' => $u->username,
                'email' => $u->email ?? '-',
                'status' => 'Aktif & Terverifikasi',
                'joined_at' => $u->created_at ? $u->created_at->translatedFormat('d M Y') : 'Baru saja',
            ];
        });

        return Inertia::render('admin/ManajemenUmkm', [
            'umkms' => $umkms
        ]);
    })->name('admin.umkm');

    // 3. Manajemen Akun Admin
    Route::get('admin/manajemen-akun', function () {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');
        return app(AkunController::class)->index();
    })->name('admin.akun');

    Route::post('admin/manajemen-akun/operator', [AkunController::class, 'storeOperator'])->name('admin.akun.storeOperator');
    Route::post('admin/manajemen-akun/umkm', [AkunController::class, 'storeUmkm'])->name('admin.akun.storeUmkm');
    Route::put('admin/manajemen-akun/operator/{user}', [AkunController::class, 'updateOperator'])->name('admin.akun.updateOperator');
    Route::delete('admin/manajemen-akun/operator/{user}', [AkunController::class, 'destroyOperator'])->name('admin.akun.destroyOperator');

    // 4. Kategori Produk Admin
    Route::get('admin/kategori-produk', function () {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');

        $categories = class_exists(\App\Models\Category::class)
            ? \App\Models\Category::withCount('products')->latest()->get()->map(function ($c) {
                return [
                    'id' => $c->id,
                    'name' => $c->name,
                    'slug' => $c->slug ?? str()->slug($c->name),
                    'total_products' => $c->products_count ?? 0,
                    'created_at' => $c->created_at ? $c->created_at->translatedFormat('d M Y') : '-',
                ];
            })
            : [
                ['id' => 1, 'name' => 'Makanan & Minuman', 'slug' => 'makanan-minuman', 'total_products' => 12, 'created_at' => '10 Mei 2026'],
                ['id' => 2, 'name' => 'Fashion & Batik', 'slug' => 'fashion-batik', 'total_products' => 8, 'created_at' => '11 Mei 2026'],
                ['id' => 3, 'name' => 'Kerajinan Bambu', 'slug' => 'kerajinan-bambu', 'total_products' => 5, 'created_at' => '12 Mei 2026'],
            ];

        return Inertia::render('admin/KategoriProduk', [
            'categories' => $categories
        ]);
    })->name('admin.kategori');

    // 5. Produk Admin
    Route::get('admin/produk', function () {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');

        $products = class_exists(\App\Models\Product::class)
            ? \App\Models\Product::with(['user'])->latest()->get()->map(function ($p) {
                return [
                    'id' => $p->id,
                    'name' => $p->name,
                    'price' => $p->price ?? 0,
                    'stock' => $p->stock ?? 0,
                    'status' => $p->status ?? 'Aktif',
                    'umkm_name' => $p->user ? ($p->user->name ?? $p->user->username) : 'UMKM Desa',
                    'category_name' => $p->category ?? 'UMKM Desa',
                    'created_at' => $p->created_at ? $p->created_at->translatedFormat('d M Y') : '-',
                ];
            })
            : [];

        return Inertia::render('admin/Produk', [
            'products' => $products
        ]);
    })->name('admin.produk');

    // 6. Pengaturan Website Admin Real-Time
    Route::get('admin/pengaturan', function () {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');

        $webSettings = [
            'app_name' => 'UMKM Desa Mandalamekar',
            'app_description' => 'Platform digitalisasi dan pemasaran produk UMKM unggulan Desa Mandalamekar, Jawa Barat.',
            'contact_email' => 'admin@mandalamekaryarsi.app',
            'contact_phone' => '+62 812-3456-7890',
            'address' => 'Balai Desa Mandalamekar, Kec. Jatiwaras, Kab. Tasikmalaya, Jawa Barat',
            'enable_register_umkm' => true,      // Toggle real-time pendaftaran UMKM
            'enable_auto_verify' => false,       // Verifikasi manual oleh admin
            'maintenance_mode' => false,         // Mode perbaikan website
            'payment_gateway' => 'midtrans',     // Gateway pembayaran produk
            'currency' => 'IDR (Rp)',
            'last_updated' => now()->translatedFormat('d M Y, H:i'),
        ];

        return Inertia::render('admin/PengaturanWebsite', [
            'settings' => $webSettings
        ]);
    })->name('admin.pengaturan');
});


// ==========================================
// --- ROUTE UMKM ---
// ==========================================
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

    Route::get('umkm/profil', [UmkmController::class, 'edit'])->name('umkm.profil.edit');
    Route::put('umkm/profil', [UmkmController::class, 'update'])->name('umkm.profil.update');

    Route::get('umkm/produk', [ProdukController::class, 'index'])->name('umkm.produk.index');
    Route::get('umkm/produk/daftar', [ProdukController::class, 'daftar'])->name('umkm.produk.daftar');
    Route::post('umkm/produk', [ProdukController::class, 'store'])->name('umkm.produk.store');
    Route::put('umkm/produk/{product}', [ProdukController::class, 'update'])->name('umkm.produk.update');
    Route::delete('umkm/produk/{product}', [ProdukController::class, 'destroy'])->name('umkm.produk.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
