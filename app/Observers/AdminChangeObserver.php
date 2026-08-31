<?php

namespace App\Observers;

use App\Models\AdminNotification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class AdminChangeObserver
{
    public function created(Model $model): void { $this->notify($model, 'ditambahkan', 'create'); }
    public function updated(Model $model): void { $this->notify($model, 'diperbarui', 'update', $model->getChanges()); }
    public function deleted(Model $model): void { $this->notify($model, 'dihapus', 'delete'); }

    private function notify(Model $model, string $action, string $event, array $changes = []): void
    {
        $modelName = class_basename($model);
        $label = match ($modelName) {
            'Product' => $model->nama_produk ?? $model->name ?? 'Produk',
            'PesanKontak' => $model->subjek ?? 'Pesan kontak',
            'Category' => $model->name ?? 'Kategori',
            default => $model->name ?? $model->username ?? 'Akun',
        };
        $entity = match ($modelName) {
            'Product' => 'produk',
            'PesanKontak' => 'pesan kontak',
            'Category' => 'kategori',
            default => ($model->role === 'umkm' ? 'profil UMKM' : 'akun'),
        };
        $actor = Auth::user();
        $changedFields = array_values(array_diff(array_keys($changes), ['updated_at', 'password', 'remember_token']));

        AdminNotification::create([
            'type' => $model instanceof \App\Models\Product ? 'product' : ($model instanceof \App\Models\User ? 'user' : 'system'),
            'title' => ucfirst($entity).' '.$action,
            'message' => '"'.$label.'" telah '.$action.'.',
            'data' => [
                'event' => $event,
                'model' => $modelName,
                'model_id' => $model->getKey(),
                'entity' => $entity,
                'actor_name' => $actor?->name ?? 'Sistem / pengunjung',
                'actor_role' => $actor?->role,
                'changed_fields' => $changedFields,
            ],
        ]);
    }
}
