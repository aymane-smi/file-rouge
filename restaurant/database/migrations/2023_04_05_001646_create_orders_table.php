<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("employee_id");
            $table->unsignedBigInteger("menu_id");
            $table->unsignedBigInteger("restaurant_id");
            $table->integer("current_price");
            $table->integer("quantity");
            $table->foreign("menu_id")->on("menu")->references("id");
            $table->foreign("restaurant_id")->on("restaurant")->references("id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
