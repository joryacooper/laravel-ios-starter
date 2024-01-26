<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\NewPasswordController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/w/reset-password', [NewPasswordController::class, 'create'])->name('password.reset');
Route::post('/w/reset-password', [NewPasswordController::class, 'store'])->name('password.store');
Route::get('/w/reset-password/success', function () {
    return view('auth.reset-password-success');
})->name('password.reset-success');
