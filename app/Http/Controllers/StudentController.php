<?php
namespace App\Http\Controllers;

use MongoDB\Client;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    protected $collection;

    public function __construct()
    {
        // Asegúrate de definir 'DB_CONNECTION_URL' en tu archivo .env
        $client = new Client(env('DB_CONNECTION_URL'));
        $this->collection = $client->estudiantes->students;
    }

    public function index()
    {
        // Obtén los estudiantes y conviértelos en un array
        $students = $this->collection->find()->toArray();

        // Convierte los _id de ObjectId a string
        foreach ($students as &$student) {
            $student['_id'] = (string) $student['_id'];
        }

        return response()->json($students);
    }

    public function store(Request $request)
    {
        $student = [
            'name' => $request->input('name'),
            'grade' => (int) $request->input('grade')
        ];
        $result = $this->collection->insertOne($student);

        // Convierte el _id a string antes de devolver la respuesta
        $student['_id'] = (string) $result->getInsertedId();

        return response()->json($student);
    }

    public function bestGrade()
    {
        $bestStudent = $this->collection->findOne([], [
            'sort' => ['grade' => -1]
        ]);

        if ($bestStudent) {
            $bestStudent['_id'] = (string) $bestStudent['_id'];
        }

        return response()->json($bestStudent);
    }

    public function worstGrade()
    {
        $worstStudent = $this->collection->findOne([], [
            'sort' => ['grade' => 1]
        ]);

        if ($worstStudent) {
            $worstStudent['_id'] = (string) $worstStudent['_id'];
        }

        return response()->json($worstStudent);
    }
}
