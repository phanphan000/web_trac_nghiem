<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // id, INT, PK, AUTO_INCREMENT
            $table->string('username', 50)->unique(); // username, VARCHAR(50), UNIQUE
            $table->string('password'); // password, VARCHAR(255) → bcrypt khi lưu
            $table->string('full_name', 100); // full_name, VARCHAR(100)
            $table->string('email', 100)->nullable()->unique();
            $table->unsignedBigInteger('class_id')->nullable(); // class_id, INT, FK → classes.id, NULLABLE
            $table->text('avatar_url')->nullable(); // avatar_url, TEXT, NULLABLE
            $table->timestamps(); // created_at & updated_at, DATETIME

            // Khóa ngoại
            // $table->foreign('class_id')->references('id')->on('classes')->onDelete('set null');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // Schema::create('sessions', function (Blueprint $table) {
        //     $table->string('id')->primary();
        //     $table->foreignId('user_id')->nullable()->index();
        //     $table->string('ip_address', 45)->nullable();
        //     $table->text('user_agent')->nullable();
        //     $table->longText('payload');
        //     $table->integer('last_activity')->index();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        // Schema::dropIfExists('sessions');
    }
};
