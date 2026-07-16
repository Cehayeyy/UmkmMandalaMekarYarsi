<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AkunController extends Controller
{
    // 1. Menampilkan Halaman & Data Akun Asli dari Database
    public function index()
    {
        return Inertia::render('admin/ManajemenAkun', [
            'users' => User::latest()->get()
        ]);
    }

    // 2. Menyimpan Akun Baru (Hanya Username & Kata Sandi)
    public function storeOperator(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string', 'max:255', 'unique:users,username'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        User::create([
            'name' => $request->username, // Nama disamakan dengan username
            'username' => $request->username,
            'role' => 'operator', // Default peran sebagai operator
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Akun berhasil dibuat!');
    }

    // Menyimpan Akun Baru Khusus UMKM
    public function storeUmkm(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'], // Nama Toko / UMKM
            'username' => ['required', 'string', 'max:255', 'unique:users,username'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'role' => 'umkm', // PENTING: Kunci perannya sebagai umkm
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Akun UMKM berhasil dibuat!');
    }

    // 3. Memperbarui Akun (Edit Username / Password)
    public function updateOperator(Request $request, User $user)
    {
        $request->validate([
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $user->id],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        $data = [
            'name' => $request->username,
            'username' => $request->username,
        ];

        // Jika password diisi, maka update passwordnya juga
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return back()->with('success', 'Akun berhasil diperbarui!');
    }

    // 4. Menghapus Akun (Delete)
    public function destroyOperator(User $user)
    {
        // Mencegah admin menghapus dirinya sendiri saat login
        if (auth()->id() === $user->id) {
            return back()->withErrors(['error' => 'Anda tidak dapat menghapus akun Anda sendiri!']);
        }

        $user->delete();

        return back()->with('success', 'Akun berhasil dihapus!');
    }
}
