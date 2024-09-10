<?php

use App\Http\Controllers\AlgorithmController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BluemarkController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDetailController;
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

Route::post('/otp', [AuthController::class, 'checkOTP']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', [UserController::class, 'index']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::get('/user/switchUser/{id}', [UserController::class, 'switchUser']);
Route::delete('/user/{id}', [UserController::class, 'destroy']);
Route::post('/topup/{iduser}', [UserController::class, 'topup']);
Route::post('/confirmTopup/{iduser}', [UserController::class, 'confirmTopup']);

Route::post('/buku', [BukuController::class, 'store']); // Create Buku
Route::get('/buku', [BukuController::class, 'index']); // Read Buku
Route::get('/buku/{id}', [BukuController::class, 'show']); // Read Singular Buku
Route::put('/buku/{id}', [BukuController::class, 'update']); // Update Buku
Route::delete('/buku/{id}', [BukuController::class, 'destroy']); // Delete Buku
Route::get('/getPdf/{id}', [BukuController::class, 'getPdf']);

Route::get('/order', [OrderController::class, 'index']);
Route::get('/order/{id}', [OrderController::class, 'show']);
Route::post('/order', [OrderController::class, 'store']);
Route::delete('/order/{id}', [OrderController::class, 'destroy']);
Route::get('/order/{id}/{status}', [OrderController::class, 'changeStatus']);

Route::post('/orderdetail', [OrderDetailController::class, 'store']);
Route::get('/orderdetail', [OrderDetailController::class, 'index']);
Route::get('/orderdetail/{id}', [OrderDetailController::class, 'show']);

Route::get('/trending', [AlgorithmController::class, 'trending']);

Route::get('/pinjam/index', [BluemarkController::class, 'indexPinjam']);
Route::get('/pinjam/{iduser}', [BluemarkController::class, 'showPinjam']);
Route::post('/pinjam/{idbuku}', [BluemarkController::class, 'pinjam']);
Route::get('/kembalikan/{idpinjaman}', [BluemarkController::class, 'kembali']);
Route::post('/subscribe', [BluemarkController::class, 'subscribe']);
Route::get('/checksubscription/{iduser}', [BluemarkController::class, 'checkSubscription']);
