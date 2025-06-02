<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\MsKacamataController;
use App\Http\Controllers\MsMerkController;
use App\Http\Controllers\MsLaciController;
use App\Http\Controllers\MsKacamataStatusController;
use App\Http\Controllers\MsKacamataStatusLogController;

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
});

// Route resource tanpa auth middleware
Route::resource('ms-kacamatas', MsKacamataController::class);
Route::resource('ms-merks', MsMerkController::class);
Route::resource('ms-lacis', MsLaciController::class);
Route::resource('ms-kacamata-statuses', MsKacamataStatusController::class);
Route::resource('ms-kacamata-status-logs', MsKacamataStatusLogController::class);
