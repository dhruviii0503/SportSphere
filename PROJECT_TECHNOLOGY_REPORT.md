# SportSphere — Project Technology Report

## Project overview
SportSphere is a web application intended to help people discover sports players, games and teams and participate in a local sports community.

## Technologies found in the project

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 | Component-based user interface |
| Build/dev server | Vite 8 | Development server and production bundling |
| Styling | Tailwind CSS 4 | Responsive utility-first styling |
| Routing | React Router DOM 7 | Client-side page navigation |
| UI/animation | Lucide React, Framer Motion, React Icons | Icons and interface motion |
| Backend | Node.js, Express 4 | REST API |
| Database | MongoDB with Mongoose 8 | Persistent application data and models |
| Authentication | JSON Web Token, bcryptjs | Token authentication and password hashing |
| Validation/security | express-validator, express-rate-limit, CORS | Request validation, rate limiting and cross-origin policy |

## Implemented in the codebase
- Registration, login and authenticated current-user endpoint.
- User profile and user discovery API.
- Game create/list/detail/update/delete and join/leave API.
- Team create/list/detail and join/leave API.
- Community post and like API.
- Admin API routes and notification data model/controller.
- Frontend pages for the main project areas.
- Players and teams listing pages connected to API endpoints.
- Game and team creation forms connected to authenticated API calls.

## Limitations to disclose
- This is a code inspection report, not a claim that a live deployment or database has been verified.
- MongoDB must be configured and running for persistent API features.
- Real geospatial distance search, map-based routing, real-time chat, push/email notifications and payment processing are not verified as implemented.
- The UI may still contain prototype areas that require additional integration and end-to-end testing.

## Run commands
See `README.md` and `COLLEGE_DEMO_GUIDE.md` for setup and demonstration commands.
