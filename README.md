# Team List

see a working example at: https://django-employee-list.vercel.app/

see a demo of it working here: https://youtu.be/RQF5a1KmwKY

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

Get all the secrets from the settings page of your new db.

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

# Vercel Deploy

To build for deployment prepare the react app and collect all static files

```
cd frontend
npm run build
```

Collect those static files to serve from vercel:

```
python manage.py collectstatic
```

Then push your changes up and and vercel should re-deploy

```
git add .
git commit
git push origin main
```

This serves the static files with the Django server for simplicity.

In a prod app I would recommend serving your React APP from your favorite CDN.
