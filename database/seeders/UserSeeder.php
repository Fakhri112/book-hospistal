<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('123'),
            'role' => "admin",
        ]);
        $user1 = User::create([
            'name' => 'User1',
            'email' => 'user1@example.com',
            'password' => bcrypt('123'),
            'role'=> "user"
        ]);
         $user2 = User::create([
            'name' => 'User2',
            'email' => 'user2@example.com',
            'password' => bcrypt('123'),
            'role'=> "user"
        ]);
         $user3 = User::create([
            'name' => 'User3',
            'email' => 'user3@example.com',
            'password' => bcrypt('123'),
            'role'=> "user"
        ]);
         $user4 = User::create([
            'name' => 'User4',
            'email' => 'user4@example.com',
            'password' => bcrypt('123'),
            'role'=> "user"
        ]);
    }
}

