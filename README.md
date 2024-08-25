# Team List

see a working example at: https://django-employee-list.vercel.app/

# Back End

Built using django's rest framwork

# Front End

React App located in /frontend folder

# To run locally

Clone

Setup a .env file to connect to a postgres DB
This is done so you can deploy to vercel with their serveless django product

You can setup a supabase free db quickly here:

https://supabase.com/dashboard/projects

Get all the secrets from teh settings page of your new db.

```
SUPABASE_HOST=
SUPABASE_PW=
SUPABASE_DB_USER=
SUPABASE_DB_NAME=
SUPABASE_PORT=
DJANGO_SECRET_KEY=
```

Install all your dependencies

```
pip install -r requirements.txt
```

Setup Migrations and Tables on your DB

```
python manage.py makemigrations
python manage.py migrate
```

Run the Python Server

```
python manage.py runserver
```

# React App

The React app is in the frontend subfolder
You can edit it in dev mode

```
cd frontend
npm start
```

This will run the react app on localhost:3000 and will interact with your local django server at localhost:8000

To build for deployment

```
npm run build
```

Collect those static files and server up with django on vercel:

```
python manage.py collectstatic
```

For a Vercel deploy just committ and push up all your changes

This serves the static files with the Django server for simplicity.

In a prod app I would reccomend serving your React APP from your favorite CDN
