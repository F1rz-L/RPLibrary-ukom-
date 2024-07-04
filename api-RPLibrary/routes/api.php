<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\RequestBukuController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return response()->json([
        'status' => false,
        'message' => 'Unauthorized',
    ], 401);
})->name('login');

// Route::get('/requestbuku', [RequestBukuController::class, 'index'])->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user/{id}', [UserController::class, 'show']);

Route::post('/buku', [BukuController::class, 'store']); // Create Buku
Route::get('/buku', [BukuController::class, 'index']); // Read Buku
Route::get('/buku/{id}', [BukuController::class, 'show']); // Read Singular Buku
Route::put('/buku/{id}', [BukuController::class, 'update']); // Update Buku
Route::delete('/buku/{id}', [BukuController::class, 'destroy']); // Delete Buku
Route::get('/buku/{filter}', [BukuController::class, 'filter']); // Filter Buku

