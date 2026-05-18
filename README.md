# Wanderlust

A full-stack travel listing web application where users can explore stays, create listings, upload images, and leave reviews.

## Features

- User authentication (signup, login, logout) with Passport.js
- Create, edit, and delete listings
- Role-based authorization (owner-only listing updates/deletes)
- Image upload with Cloudinary + Multer
- Listing categories and search by location
- Reviews with rating and comments
- Flash messages and centralized error handling
- MongoDB Atlas persistence and session store with `connect-mongo`
- Map/geocoding integration using Mapbox

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS + EJS-Mate
- Passport.js
- Cloudinary + Multer
- Mapbox SDK
- Bootstrap

## Project Structure

```text
controllers/   # Route controllers
models/        # Mongoose models
routes/        # Express routers
views/         # EJS templates
public/        # Static assets (CSS/JS)
init/          # Seed scripts and seed data
```

## Environment Variables

Create a `.env` file in the project root:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_public_token
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
```

## Local Setup

1. Clone the repository
2. Install dependencies
3. Add `.env` variables
4. Start development server

```bash
npm install
npm run dev
```

App runs at:

`http://localhost:3000`

## Seed Database

To initialize sample listings:

```bash
node init/index.js
```

## Deployment (Render)

Use a **Web Service** with:

- Build command: `npm install`
- Start command: `node app.js`
- Runtime: `Node`

Add all `.env` variables in Render's Environment tab.

## Notes

- Ensure MongoDB Atlas network access allows your app host/IP.
- If using special characters in DB password, URL-encode them in `ATLASDB_URL`.
