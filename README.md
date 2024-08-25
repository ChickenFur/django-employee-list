# Team List

see a working example at: https://django-employee-list.vercel.app/

# Back End

Built using django's rest framwork

# Front End

React Act

# To run locally

Clone

Setup a .env file to connect to a postgres DB
This is done so you can deploy to vercel with their serveless django product

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
python manage.py runserver

# React App

The React app is in the frontend subfolder
You can edit it in dev mode

```
cd frontend
npm start
```

To build for deployment

```
npm run build
```

This serves the static files with the Django server for simplicity. In a prod app I would deploy the bundle files to file serving service like File.io, CloudFlare or AWS so they are served from a server closer to the user.
