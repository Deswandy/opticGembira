<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleSelectionController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\KaryawanDashboardController;
use App\Http\Controllers\KacamataController;
use App\Http\Controllers\UserController;

// Role selection (homepage)
Route::get('/', [RoleSelectionController::class, 'index'])->name('home');
Route::post('/select-role', [RoleSelectionController::class, 'selectRole'])->name('select.role');

// Admin routes
Route::middleware(['role:superadmin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::resource('users', UserController::class);
});

// Karyawan routes
Route::middleware(['role:karyawan'])->prefix('karyawan')->name('karyawan.')->group(function () {
    Route::get('/dashboard', [KaryawanDashboardController::class, 'index'])->name('dashboard');
});

// Kacamata routes (accessible by both roles)
// Kacamata routes (accessible by both roles)
Route::middleware(['role:superadmin,karyawan'])->group(function () {
    Route::resource('kacamata', KacamataController::class)->except(['show']);
    Route::get('kacamata/{kacamata}/status', [KacamataController::class, 'editStatus'])->name('kacamata.edit-status');
    Route::put('kacamata/{kacamata}/status', [KacamataController::class, 'updateStatus'])->name('kacamata.update-status');
    Route::get('kacamata/{kacamata}/label', [KacamataController::class, 'printLabel'])->name('kacamata.print-label');
    
    // Ubah route edit dan update untuk menggunakan {id}
    Route::get('kacamata/{id}/edit', [KacamataController::class, 'edit'])->name('kacamata.edit');
    Route::put('kacamata/{id}', [KacamataController::class, 'update'])->name('kacamata.update');
});

// Simple logout route
Route::get('/logout', function () {
    // In a real app, this would handle proper logout
    return redirect('/')->with('success', 'Logged out successfully');
})->name('logout');