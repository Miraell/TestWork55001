# TestWork55001
## Job board application

Since the main task was to create a CRUD application, I decided to go for a job booard.
My main focus was to create basic user interface, ability to login, and CRUD job postings.

### Technologies used:

1. VueJS + Vuex
1. Laravel 8
1. SQLite
1. JWT authorization
1. BulmaCSS

### How to run this app

```
git clone git@github.com:Miraell/TestWork55001.git
cd TestWork55001/backend

// Run backend
composer install
// Before this step go to .env and set the route to database.sqlite file in database folder
php artisan migrate
php artisan serve

// Run frontend
cd ../frontend
npm install
npm run serve
```

### Screenshot:
[![index.png](https://i.postimg.cc/hGHnj5YD/index.png)](https://postimg.cc/Ffg8CDm8)
