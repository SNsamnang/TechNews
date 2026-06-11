/*
|--------------------------------------------------------------------------
git clone
cd
composer install
npm install
cp .env.example .env
php artisan key:generate

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tech_news
DB_USERNAME=root
DB_PASSWORD=

CREATE DATABASE tech_news;

php artisan migrate
php artisan db:seed

php artisan storage:link
php artisan filament:install --panels
php artisan make:filament-user

php artisan serve
npm run dev

http://127.0.0.1:8000
http://127.0.0.1:8000/admin

git pull
composer install
php artisan migrate
npm install
npm run dev

|--------------------------------------------------------------------------
*/
|--------------------------------------------------------------------------
| Admin Panel
|--------------------------------------------------------------------------
username: admin@gmail.com
email: admin@gmail.com
password: admin
|--------------------------------------------------------------------------
| Modify UI
|--------------------------------------------------------------------------
resource/js/components/Layout.jsx
resource/js/components/PotsCard.jsx
resource/js/pages/Home.jsx
resource/js/pages/PostDetail.jsx