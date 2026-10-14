# Recipe Finder

A full-stack recipe browsing app. Search recipes, filter by category, view
ingredients and instructions, and save favorites.

**Live demo:** https://lymeng-recipe-finder.netlify.app
**API repository:** https://github.com/lymengto0/recipe-api

> The API runs on a free hosting plan and sleeps when idle. The first load
> after a quiet period can take up to a minute while it wakes up.

![Home page](screenshots/home.png)

## Features

- Search recipes by name
- Filter by category
- Recipe detail page with ingredients, instructions, and a video link
- Favorites saved in the browser (localStorage), with a live counter
- Dark mode that remembers your choice
- Loading skeletons, error handling with retry, and a responsive layout

## Tech stack

**Frontend:** Angular, TypeScript, Signals, RxJS, Angular Router, CSS
**Backend:** ASP.NET Core Web API, Entity Framework Core
**Database:** MySQL
**Hosting:** Netlify (frontend), Render (API), Aiven (database)

## Architecture

Angular (Netlify) → ASP.NET Core API (Render) → MySQL (Aiven)

## Run it locally

You need Node.js, the Angular CLI, and the API from the repository linked above.

1. Start the API (see its README for database setup)
2. Then:

    git clone git@github.com:lymengto0/recipe-finder.git
    cd recipe-finder
    npm install
    ng serve

Open http://localhost:4200. In development, the app calls the API at
http://localhost:5207/api (see src/environments).

## What I learned

- Structuring an Angular app with standalone components, services, and routing
- Managing state with signals
- Building a REST API with ASP.NET Core and EF Core migrations
- Deploying a full-stack app across three hosting services, including CORS
  and environment configuration