<?php

use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



    
Route::get('clinic', [ClinicController::class, "index"]);
Route::get('clinic/{id}', [ClinicController::class, "getSchedule"]);
Route::post('clinic', [ClinicController::class, "submit"]);
Route::delete('clinic/{id}', [ClinicController::class, "destroy"]);
Route::get('bookings/{id}', [BookmarkController::class, "getBookmark"]);
Route::delete('bookings/{id}', [BookmarkController::class, "removeBookmark"]);
Route::post('bookings', [BookmarkController::class, "createBookmark"]);


Route::middleware('auth')->group(function () {
    Route::get('/', function () {
    return Inertia::render('Dashboard');
    	})->name('dashboard');

    Route::get('/bookings', function () {
        return Inertia::render('Bookings');
    })->middleware('isUser')->name('bookings');

});

require __DIR__.'/auth.php';
