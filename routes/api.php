<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController; // Breeze Auth Controller
use App\Http\Controllers\Auth\RegisteredUserController; // Breeze Auth Controller


// Public routes (no authentication required)
Route::get('/users', [UserController::class, 'index']);
Route::get('/blogs', [BlogController::class, 'index']); // Blog index (list all blogs) remains public
Route::get('/categories', [CategoryController::class, 'index']); // Category index remains public

// Breeze Authentication Routes (added by breeze:install api)
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest'); // Only accessible to unauthenticated users

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest'); // Only accessible to unauthenticated users

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum'); // Only accessible to authenticated users

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); // Get authenticated user details


// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/blogs/{blog}', [BlogController::class, 'show']);

});
