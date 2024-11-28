<?php
namespace App\Models;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
class Student extends Eloquent
{
    protected $connection = 'mongodb'; // especifica la conexión de MongoDB
    protected $collection = 'students'; // especifica la colección en MongoDB
    protected $fillable = [
        'name',
        'email',
        'age',
        'grade',
    ];
}