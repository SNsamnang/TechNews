<?php

use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;
// use App\Models\Advertisement;
use App\Http\Controllers\AdvertisementController;
/*
|--------------------------------------------------------------------------
| API Routes — /api/...
|--------------------------------------------------------------------------
*/

// Posts
Route::get('/posts',          [PostController::class, 'index']);
Route::get('/posts/featured', [PostController::class, 'featured']);
Route::get('/posts/breaking', [PostController::class, 'breaking']);
Route::get('/posts/latest',   [PostController::class, 'latest']);
Route::get('/posts/popular',  [PostController::class, 'popular']);
Route::get('/posts/{slug}',   [PostController::class, 'show']);

// Categories
Route::get('/categories',              [CategoryController::class, 'index']);
Route::get('/categories/{slug}',       [CategoryController::class, 'show']);
Route::get('/categories/{slug}/posts', [CategoryController::class, 'posts']);

//advertisment 
Route::get('/ads/popup', [AdvertisementController::class, 'popup']);
Route::get('/ads/sidebar', [AdvertisementController::class, 'sidebar']);
Route::get('/ads/homepage', [AdvertisementController::class, 'homepage']);
