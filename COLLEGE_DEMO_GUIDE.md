# SportSphere — College Demo Guide

## Before the demo
1. Install Node.js and MongoDB Community Server, or prepare a MongoDB Atlas database.
2. In `server`, copy `.env.example` to `.env` and configure `MONGODB_URI` and `JWT_SECRET`.
3. Install dependencies in both root and `server` folders.

## Start the application

**Terminal 1 — backend** (from project root):

```bash
cd server
npm install
npm run dev
```

Check `http://localhost:5000/api/health` in a browser. It should return a JSON health response. The server terminal should also report a successful MongoDB connection.

**Terminal 2 — frontend** (from project root):

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (or the URL Vite prints).

## Suggested demonstration sequence
1. Open the homepage and explain the SportSphere problem statement.
2. Register a new account with a demo email and password.
3. Show the dashboard and profile.
4. Create a game with a sport, venue, date and time.
5. Return to Games and show the newly saved game.
6. Create a team and show it in Teams.
7. Open Players and explain that registered users with profile details are listed from the API.
8. Open Community and show the available community functionality.

## Build check
From the project root:

```bash
npm run build
npm run lint
```

## Important
Do not claim database-backed features work unless the backend is running and MongoDB reports a successful connection. No pre-created demo credentials are included; register a demo account before the presentation. Keep `.env` private.
