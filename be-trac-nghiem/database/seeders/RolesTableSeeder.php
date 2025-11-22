<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    public function run()
    {
        $roles = ['admin', 'teacher', 'student'];
        foreach ($roles as $name) {
            Role::firstOrCreate(['name' => $name]);
        }
    }
}
