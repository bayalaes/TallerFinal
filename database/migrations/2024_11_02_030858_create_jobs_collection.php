<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateJobsCollection extends Migration
{
    public function up()
    {
        Schema::connection('mongodb')->table(
            'jobs',
            function (Blueprint $collection) {
                // Define aquí los campos de tu colección
            }
        );
    }
    public function down()
    {
        Schema::connection('mongodb')->table(
            'jobs',
            function (Blueprint $collection) {
                $collection->drop();
            }
        );
    }
}
