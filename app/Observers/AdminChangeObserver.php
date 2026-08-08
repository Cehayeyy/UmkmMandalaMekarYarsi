<?php

namespace App\Observers;

use App\Models\AdminNotification;
use Illuminate\Database\Eloquent\Model;

class AdminChangeObserver
{
    public function created(Model $model): void { $this->notify($model, 'ditambahkan', 'create'); }
    public function updated(Model $model): void { $this->notify($model, 'diperbarui', 'update'); }
    public function deleted(Model $model): void { $this->notify($model, 'dihapus', 'delete'); }

    private function notify(Model $model, string $action, string $type): void
    {
        $label = $model instanceof \App\Models\Product
            ? ($model->nama_produk ?? $model->name ?? 'Produk')
            : ($model->name ?? $model->username ?? 'Akun');

        AdminNotification::create([
            'type' => $model instanceof \App\Models\Product ? 'product' : 'user',
            'title' => class_basename($model).' '.$action,
            'message' => '"'.$label.'" telah '.$action.'.',
            'data' => ['event' => $type, 'model' => class_basename($model), 'model_id' => $model->getKey()],
        ]);
    }
}
