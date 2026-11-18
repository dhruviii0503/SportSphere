# SportSphere

SportSphere is a location-oriented sports community platform built with React and Vite, with an Express/MongoDB API.

## Features present in this codebase
- React single-page application with routes for home, authentication, dashboard, games, players, teams and community.
- Express REST API with JWT authentication and bcrypt password hashing.
- Mongoose models/controllers for users, games, teams, community posts and notifications.
- Authenticated game and team creation/join flows.
- Player and team discovery pages load records from the API (not hardcoded player/team cards).
- Vite development proxy forwards `/api` requests to the backend at port 5000.

Some advanced features such as real-time chat, geographic radius calculations, email delivery and production deployment are not implemented in this version.

## Requirements
- Node.js 20+ (Node 22 LTS recommended)
- npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Setup

### 1. Backend
Open a terminal in the project root:

```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env`, then set `MONGODB_URI` and a long random `JWT_SECRET`.

```bash
npm run dev
```

The API health endpoint is `http://localhost:5000/api/health`.

### 2. Frontend
Open a second terminal in the project root:

```bash
npm install
npm run dev
```

Open the URL Vite prints (normally `http://localhost:5173`). The Vite proxy sends `/api` calls to `http://localhost:5000`.

### 3. Production build

```bash
npm run build
npm run lint
```

### Notes
- Register a normal account through the app to test authenticated features.
- Do not commit `.env` files. `.env.example` contains placeholders only.
- The frontend needs the backend and a reachable MongoDB database for live data. If MongoDB is unavailable, data-backed pages will show an API/database error rather than pretending sample data is live.
