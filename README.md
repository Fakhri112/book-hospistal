# Hospital Booking Management

**Hospital Booking Management** adalah aplikasi manajemen pemesanan rumah sakit yang memiliki dua peran pengguna, yaitu **admin** dan **user**. Aplikasi ini dibangun dengan menggunakan Laravel, Inertia, dan React.js.

## Akun Contoh yang Otomatis Terseed

Pada saat migrasi dan seeding, beberapa akun pengguna akan otomatis dibuat. Berikut adalah contoh akun yang dapat digunakan:

```php
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
```

## Persiapan Environment

Pastikan untuk mengikuti contoh file .env.example dan mengisinya menjadi file .env untuk mengatur variabel-variabel lingkungan yang diperlukan, termasuk konfigurasi database.

## Panduan Instalasi

-   composer install
-   php artisan key:generate
-   php artisan migrate:fresh --seed
-   php artisan storage:link
-   npm install
-   npm run build
-   php artisan serve

## Teknologi yang Digunakan

-   Backend: Laravel
-   Frontend: Inertia.js, React.js
-   Database: MySQL
