<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\MsKacamataController;
use App\Http\Controllers\MsMerkController;
use App\Http\Controllers\MsLaciController;
use App\Http\Controllers\MsKacamataStatusController;
use App\Http\Controllers\MsKacamataStatusLogController;
use App\Http\Controllers\ProfileController;   

/*
|--------------------------------------------------------------------------
| Web Routes (Tanpa Login)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => false,
        'canRegister' => false,
        'laravelVersion' => app()->version(),
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Route::post('/ms-kacamatas/{id}/update-status', [MsKacamataController::class, 'updateStatus'])->name('ms-kacamatas.update-status');
Route::get('/ms-kacamatas/{id}/logs', [MsKacamataController::class, 'showLogs'])->name('ms-kacamatas.logs');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

Route::middleware(['auth','verified'])->group(function () {
    Route::resource('ms-kacamatas', MsKacamataController::class);
    Route::resource('ms-merks', MsMerkController::class);
    Route::resource('ms-lacis', MsLaciController::class);
    Route::resource('ms-kacamata-statuses', MsKacamataStatusController::class);
    Route::resource('ms-kacamata-status-logs', MsKacamataStatusLogController::class);
    Route::post('/ms-laci', [MsLaciController::class, 'store'])->name('ms-laci.store');
    
});



require __DIR__.'/auth.php';
Route::match(['get', 'post'], '/register', function () {
    abort(404); // or return Inertia::render('Blocked');
});
Route::match(['get', 'post'], '/forgot-password', function () {
    abort(404); // or return Inertia::render('Blocked');
});
