<?php

use App\Http\Controllers\AkunController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\UmkmController;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ==========================================
// --- ROUTE PUBLIK STATIS ---
// ==========================================

Route::get('/', function () {
    $umkmCount = User::where('role', 'umkm')->count();
    $productCount = class_exists(Product::class) ? Product::count() : 0;
    $categoryCount = class_exists(Product::class) ? Product::distinct('kategori')->count('kategori') : 0;

    $featuredProducts = class_exists(Product::class)
        ? Product::with('user:id,name,username')
            ->latest()
            ->take(4)
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'name' => $p->nama_produk ?? $p->name ?? 'Tanpa Nama',
                    'price' => (int) ($p->harga ?? $p->price ?? 0),
                    'category' => $p->kategori ?? 'Lainnya',
                    'seller' => $p->user ? ($p->user->name ?? $p->user->username) : 'UMKM Desa',
                    'seller_username' => $p->user->username ?? '',
                    'foto' => $p->foto ?? $p->image ?? null,
                ];
            })
        : [];

    $topCategories = class_exists(Product::class)
        ? Product::select('kategori', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
            ->groupBy('kategori')
            ->orderByDesc('total')
            ->take(4)
            ->get()
            ->map(function ($item) {
                return ['label' => $item->kategori, 'count' => $item->total];
            })->toArray()
        : [];

    if (empty($topCategories)) {
        $topCategories = [
            ['label' => 'Makanan & Minuman', 'count' => 0],
            ['label' => 'Kerajinan', 'count' => 0],
            ['label' => 'Fashion', 'count' => 0],
            ['label' => 'Lainnya', 'count' => 0],
        ];
    }

    return Inertia::render('welcome', [
        'statsData' => [
            'umkm' => $umkmCount,
            'products' => $productCount,
            'categories' => $categoryCount,
        ],
        'featuredProducts' => $featuredProducts,
        'topCategories' => $topCategories
    ]);
})->name('home');

Route::get('/umkm', function () {
    $umkmList = User::where('role', 'umkm')->with('products')->latest()->get();
    return Inertia::render('umkm/umkmPage', [
        'umkmList' => $umkmList
    ]);
})->name('umkm.umkmPage');

Route::get('/produk', function () {
    $umkmList = User::where('role', 'umkm')->get(['id', 'name', 'username']);

    $products = class_exists(Product::class)
        ? Product::with('user:id,name,username,no_whatsapp')->latest()->get()->map(function ($p) {
            return [
                'id' => $p->id,
                'nama_produk' => $p->nama_produk ?? $p->name ?? 'Tanpa Nama',
                'harga' => (int) ($p->harga ?? $p->price ?? 0),
                'kategori' => $p->kategori ?? 'Lainnya',
                'foto' => $p->foto ?? $p->image ?? null,
                'deskripsi' => $p->deskripsi ?? '',
                'umkm_id' => $p->user_id,
                'seller' => $p->user ? ($p->user->name ?? $p->user->username) : 'UMKM Desa',
                'seller_username' => $p->user ? $p->user->username : '',
                'no_whatsapp' => $p->user ? $p->user->no_whatsapp : null,
            ];
        })
        : [];

    $categoriesData = collect($products)->groupBy('kategori')->map(function ($items, $key) {
        return ['label' => $key, 'count' => count($items)];
    })->values()->toArray();

    array_unshift($categoriesData, ['label' => 'Semua Kategori', 'count' => count($products)]);

    return Inertia::render('produk', [
        'products' => $products,
        'umkmList' => $umkmList,
        'categoriesData' => $categoriesData,
    ]);
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

    // ---------------------------------------------------------
    // DATA NOTIFIKASI GLOBAL UNTUK ADMIN
    // ---------------------------------------------------------
    $getAdminNotifications = function () {
        if (!\Illuminate\Support\Facades\Schema::hasTable('admin_notifications')) return [];

        return \App\Models\AdminNotification::latest()->take(30)->get()->map(fn ($notification) => [
            'id' => $notification->id,
            'title' => $notification->title,
            'message' => $notification->message,
            'time' => $notification->created_at->diffForHumans(),
            'read' => (bool) $notification->read_at,
            'type' => $notification->type,
        ])->values();
    };

    // Rute Global: Untuk Fitur "Tandai Dibaca" Notifikasi
    Route::post('admin/notifikasi/read-all', function () {
        if (\Illuminate\Support\Facades\Schema::hasTable('admin_notifications')) {
            \App\Models\AdminNotification::whereNull('read_at')->update(['read_at' => now()]);
        }
        return back();
    })->name('admin.notifikasi.readAll');

    // 1. Dashboard Admin
    Route::get('admin/dashboard', function () {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');
        return redirect()->route('dashboard');
    })->name('admin.dashboard');

    Route::get('dashboard', function (\Illuminate\Http\Request $request) use ($getAdminNotifications) {
        $user = auth()->user();
        if ($user->role === 'umkm') return redirect()->route('umkm.dashboard');

        $selectedDate = $request->input('date', now()->toDateString());
        try {
            $selectedDate = \Illuminate\Support\Carbon::parse($selectedDate)->toDateString();
        } catch (\Throwable $e) {
            $selectedDate = now()->toDateString();
        }

        $totalUmkm = User::where('role', 'umkm')->count();
        $totalAkunUmkm = User::where('role', 'umkm')->count();
        $totalProduk = class_exists(Product::class) ? Product::count() : 0;
        $umkmAktif = User::where('role', 'umkm')->count();
        $aktivitas = \Illuminate\Support\Facades\Schema::hasTable('visitor_activities')
            ? \App\Models\VisitorActivity::whereDate('last_seen_at', $selectedDate)->latest('last_seen_at')->take(24)->get()->map(fn ($visit) => [
                'name' => $visit->visitor_name,
                'path' => $visit->path,
                'visits' => $visit->visits,
                'time' => $visit->last_seen_at->diffForHumans(),
            ])->values()
            : collect();

        $umkmTerbaru = User::where('role', 'umkm')->latest()->take(3)->get()->map(function ($u) {
            return [
                'name' => $u->name ?? $u->username,
                'category' => 'UMKM Desa',
                'joined' => $u->created_at ? $u->created_at->translatedFormat('d M Y') : 'Baru saja',
                'tone' => 'from-emerald-700 via-emerald-800 to-stone-900',
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

        return Inertia::render('admin/dashboard', [
            'statsData' => [
                'totalUmkm' => $totalUmkm,
                'totalProduk' => $totalProduk,
                'totalAkunUmkm' => $totalAkunUmkm,
                'umkmAktif' => $umkmAktif,
            ],
            'umkmTerbaru' => $umkmTerbaru,
            'akunUmkm' => $akunUmkm,
            'chartData' => [],
            'aktivitas' => $aktivitas,
            'notifications' => \Illuminate\Support\Facades\Schema::hasTable('admin_notifications')
                ? \App\Models\AdminNotification::whereDate('created_at', $selectedDate)->latest()->take(30)->get()->map(fn ($notification) => [
                    'id' => $notification->id,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'time' => $notification->created_at->diffForHumans(),
                    'read' => (bool) $notification->read_at,
                    'type' => $notification->type,
                ])->values()
                : [],
            'selectedDate' => $selectedDate,
        ]);
    })->name('dashboard');

    // 2. Manajemen UMKM Admin
    Route::get('admin/manajemen-umkm', function () use ($getAdminNotifications) {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');

        $umkms = User::where('role', 'umkm')->latest()->get()->map(function ($u) {
            return [
                'id' => $u->id,
                'name' => $u->name ?? 'Belum ada nama toko',
                'username' => $u->username,
                'email' => $u->email ?? '-',
                'status' => $u->status ?? 'aktif',
                'joined_at' => $u->created_at ? $u->created_at->translatedFormat('d M Y') : 'Baru saja',
            ];
        });

        return Inertia::render('admin/ManajemenUmkm', [
            'umkms' => $umkms,
            'notifications' => $getAdminNotifications(),
        ]);
    })->name('admin.umkm');

    Route::delete('admin/manajemen-umkm/{id}', function ($id) {
        $user = \App\Models\User::find($id);
        if ($user) $user->delete();
        return back();
    })->name('admin.umkm.destroy');

    Route::put('admin/manajemen-umkm/{id}/approve', function ($id) {
        if (auth()->user()->role === 'umkm') return abort(403);
        $user = User::findOrFail($id);
        if ($user->role === 'umkm' && $user->status === 'pending') {
            $user->update(['status' => 'aktif']);
            return redirect()->back()->with('success', 'Akun UMKM berhasil disetujui.');
        }
        return redirect()->back()->with('error', 'Akun tidak valid atau sudah aktif.');
    })->name('admin.umkm.approve');

    // 3. Manajemen Akun Admin
    Route::get('admin/manajemen-akun', function () use ($getAdminNotifications) {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');

        $users = \App\Models\User::latest()->get();

        return Inertia::render('admin/ManajemenAkun', [
            'users' => $users,
            'notifications' => $getAdminNotifications(),
        ]);
    })->name('admin.akun');

    Route::post('admin/manajemen-akun/operator', [AkunController::class, 'storeOperator'])->name('admin.akun.storeOperator');
    Route::post('admin/manajemen-akun/umkm', [AkunController::class, 'storeUmkm'])->name('admin.akun.storeUmkm');
    Route::put('admin/manajemen-akun/operator/{user}', [AkunController::class, 'updateOperator'])->name('admin.akun.updateOperator');
    Route::delete('admin/manajemen-akun/operator/{user}', [AkunController::class, 'destroyOperator'])->name('admin.akun.destroyOperator');

    // 4. Kategori Produk Admin
    Route::get('admin/kategori-produk', function () use ($getAdminNotifications) {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');

        $categories = (class_exists(\App\Models\Category::class) && \Illuminate\Support\Facades\Schema::hasTable('categories'))
            ? \App\Models\Category::latest()->get()->map(function ($c) {
                $hasForeignKey = \Illuminate\Support\Facades\Schema::hasColumn('products', 'category_id')
                              || \Illuminate\Support\Facades\Schema::hasColumn('products', 'kategori_id');

                $count = 0;
                if ($hasForeignKey && method_exists($c, 'products')) {
                    try {
                        $count = $c->products()->count();
                    } catch (\Exception $e) {
                        $count = 0;
                    }
                }

                return [
                    'id' => $c->id,
                    'name' => $c->name,
                    'slug' => $c->slug ?? str()->slug($c->name),
                    'total_products' => $count,
                    'created_at' => $c->created_at ? $c->created_at->translatedFormat('d M Y') : '-',
                ];
            })
            : [
                ['id' => 1, 'name' => 'Makanan & Minuman', 'slug' => 'makanan-minuman', 'total_products' => 12, 'created_at' => '10 Mei 2026'],
                ['id' => 2, 'name' => 'Fashion & Batik', 'slug' => 'fashion-batik', 'total_products' => 8, 'created_at' => '11 Mei 2026'],
                ['id' => 3, 'name' => 'Kerajinan Bambu', 'slug' => 'kerajinan-bambu', 'total_products' => 5, 'created_at' => '12 Mei 2026'],
            ];

        return Inertia::render('admin/KategoriProduk', [
            'categories' => $categories,
            'notifications' => $getAdminNotifications(),
        ]);
    })->name('admin.kategori');

    // 5. Produk Admin
    Route::get('admin/produk', function () use ($getAdminNotifications) {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');

        $products = class_exists(\App\Models\Product::class)
            ? \App\Models\Product::with(['user'])
                ->latest()
                ->paginate(12)
                ->withQueryString()
                ->through(function ($p) {
                    return [
                        'id' => $p->id,
                        'name' => $p->name ?? $p->nama_produk ?? $p->nama ?? 'Tanpa Nama',
                        'price' => (int) ($p->price ?? $p->harga ?? 0),
                        'stock' => (int) ($p->stock ?? $p->stok ?? $p->qty ?? 0),
                        'image' => $p->image ?? $p->foto ?? $p->gambar ?? null,
                        'status' => $p->status ?? 'Aktif',
                        'umkm_name' => $p->user ? ($p->user->name ?? $p->user->username) : 'UMKM Desa',
                        'category_name' => $p->category ?? $p->kategori ?? 'UMKM Desa',
                        'created_at' => $p->created_at ? $p->created_at->translatedFormat('d M Y') : '-',
                    ];
                })
            : [
                'data' => [],
                'links' => [],
                'total' => 0,
                'current_page' => 1,
            ];

        return Inertia::render('admin/Produk', [
            'products' => $products,
            'notifications' => $getAdminNotifications(),
        ]);
    })->name('admin.produk');

    // 6. Pengaturan Website Admin Real-Time
    Route::get('admin/pengaturan', function () use ($getAdminNotifications) {
        if (auth()->user()->role === 'umkm') return redirect()->route('umkm.dashboard');

        $webSettings = [
            'app_name' => 'UMKM Desa Mandalamekar',
            'app_description' => 'Platform digitalisasi dan pemasaran produk UMKM unggulan Desa Mandalamekar, Jawa Barat.',
            'enable_register_umkm' => true,
            'maintenance_mode' => false,
            'contact_phone' => '+62 812-3456-7890',
            'last_updated' => now()->translatedFormat('d M Y, H:i'),
        ];

        return Inertia::render('admin/PengaturanWebsite', [
            'settings' => $webSettings,
            'notifications' => $getAdminNotifications(),
        ]);
    })->name('admin.pengaturan');
});

// ==========================================
// --- ROUTE PANEL UMKM (HARUS DI ATAS RUTE DINAMIS) ---
// ==========================================
Route::middleware(['auth'])->group(function () {

    Route::get('umkm/dashboard', function () {
        if (auth()->user()->role !== 'umkm') return redirect()->route('dashboard');

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


// ==========================================
// --- ROUTE DINAMIS UMKM (PALING BAWAH) ---
// ==========================================
Route::get('/umkm/{username}', function ($username) {
    $umkm = User::where('username', $username)
                ->where('role', 'umkm')
                ->firstOrFail();

    $products = Product::where('user_id', $umkm->id)->latest()->get();

    return Inertia::render('umkm/DetailUmkm', [
        'umkm' => $umkm,
        'products' => $products
    ]);
})->name('umkm.detail');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
