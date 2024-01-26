<?php

use App\Http\Controllers\AppContextController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthUserProSubscriptionController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ResultController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\PasswordController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Laravel\Fortify\Http\Controllers\ProfileInformationController;


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::delete('/user', [AuthController::class, 'destroy']);
    Route::put('/user/password', [PasswordController::class, 'update']);
    Route::put('/user/profile-information', [ProfileInformationController::class, 'update']);
    Route::post('/user/pro-subscription', [AuthUserProSubscriptionController::class, 'store']);
    Route::delete('/user/pro-subscription', [AuthUserProSubscriptionController::class, 'destroy']);

    // your routes go here
    Route::get('/app', [AppContextController::class, 'show']);
    Route::apiResource('/articles', ArticleController::class);
});

Route::middleware('public')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
});
