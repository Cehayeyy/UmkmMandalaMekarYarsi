<?php

namespace App\Providers;

use App\Models\Product;
use App\Models\User;
use App\Models\Category;
use App\Models\PesanKontak;
use App\Observers\AdminChangeObserver;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Product::observe(AdminChangeObserver::class);
        User::observe(AdminChangeObserver::class);
        Category::observe(AdminChangeObserver::class);
        PesanKontak::observe(AdminChangeObserver::class);

        if ($this->app->environment('production')) {
            $hotFile = public_path('hot');

            if (File::exists($hotFile)) {
                File::delete($hotFile);
            }
        }
    }
}
