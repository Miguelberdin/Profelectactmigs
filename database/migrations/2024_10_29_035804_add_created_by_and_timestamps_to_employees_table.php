<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('employees', function (Blueprint $table) {
        $table->unsignedBigInteger('created_by')->nullable();
        $table->timestamps(); // Adds created_at and updated_at columns
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
{
    Schema::table('employees', function (Blueprint $table) {
        $table->dropColumn('created_by');
        $table->dropTimestamps();
    });
    }
};
