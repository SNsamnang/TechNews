<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| All non-admin, non-api routes are handled by the React SPA.
| Filament handles /admin itself.
*/

Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!admin|api).*$');
