<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Otras rutas de web

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas de la API
Route::group(['prefix' => 'api'], function () {
    // Aquí puedes definir tus rutas API si necesitas más lógica en web.php.
});

// Esta ruta catch-all debe ir al final
Route::get('/{any}', function () {
    return view('app'); // Asegúrate de que esto apunte al archivo correcto
})->where('any', '^(?!api).*'); // Esta expresión regular asegura que las rutas que comienzan con 'api' no sean capturadas

