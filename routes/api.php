<?php
use App\Http\Controllers\StudentController;

Route::get('/students', [StudentController::class, 'index']);
Route::post('/students', [StudentController::class, 'store']);
Route::get('/students/best', [StudentController::class, 'bestGrade']);
Route::get('/students/worst', [StudentController::class, 'worstGrade']);
