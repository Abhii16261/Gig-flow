# GigFlow - Mini Freelance Marketplace (Full Stack Developer Assignment)

GigFlow is a mini freelance marketplace web application where users can register/login, create gigs, browse gigs and submit bids/applications for gigs.  
This project is developed as part of my **Full Stack Developer Assignment**, where the goal was to build a complete working web application using frontend + backend + database and deploy it online.

---

## 🔗 Live Project Links (For Submission)

✅ **Frontend (Vercel):** https://gig-flow-sand.vercel.app  
✅ **Backend (Render):** https://gig-flow-licj.onrender.com  

> Note: Render free tier sleeps when inactive. So first request may take 10-50 seconds to respond.

---

## 📌 Project Objective (What This Assignment Required)

The main purpose of the assignment was to demonstrate:
- Full stack development (Frontend + Backend)
- MongoDB Atlas database integration
- JWT Authentication
- Environment variable handling (no secret values in GitHub)
- Deployment of frontend and backend
- Proper README documentation

---

## ✅ Features Implemented

### 1) User Authentication (JWT Based)
- User can register using:
  - Name
  - Email
  - Password
- User can login using email and password
- JWT token is generated during login
- JWT token is used for protected actions (like creating a gig / bidding)

📌 Why this is used:
- JWT helps in secure authentication
- Only logged-in users can access protected routes

---

### 2) Gig Management
A gig is basically a job posting.

✅ Implemented:
- Create Gig (only logged-in user)
- View all gigs
- View gig details

Each gig contains:
- Title
- Description
- Budget
- Posted by user

---

### 3) Bid / Application System
✅ Implemented:
- Logged in user can apply/bid on gigs
- Store bid data in MongoDB
- Bid contains:
  - Amount
  - Message
  - User reference
  - Gig reference

---

### 4) Frontend UI Pages
Frontend is created as a React SPA.

Main pages:
- Landing page
- Browse gigs page
- Gig details page
- Login page
- Signup page
- Create gig page

---

### 5) Database (MongoDB Atlas)
Database is hosted on **MongoDB Atlas** (cloud MongoDB).

Used:
- Cluster (Free tier)
- DB user + password
- Mongoose models for schema

---

## 🛠 Tech Stack Used

### Frontend
- React + TypeScript (Vite)
- TailwindCSS + Shadcn UI
- Axios (API call)
- Vercel deployment

### Backend
- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- JWT authentication
- Render deployment

---

## 📂 Project Structure
Gig-flow/
┣ backend/
┃ ┣ src/
┃ ┣ server.js
┃ ┣ package.json
┃ ┣ .env.example
┣ frontend/
┃ ┣ src/
┃ ┣ index.html
┃ ┣ vite.config.ts
┃ ┣ package.json
┃ ┣ .env.example
┣ README.md


---

# ✅ What Work Was Done (Detailed Explanation)

## ✅ Backend Work (Node + Express + MongoDB)

### Step 1: Created Express Server
I created an Express server that handles API requests from frontend.

Basic server setup includes:
- express.json() middleware
- CORS setup
- Route handling
- MongoDB connection using mongoose

---

### Step 2: MongoDB Connection
MongoDB Atlas cluster connection is done using:
- MONGO_URI (stored in environment variables)

Used Mongoose to connect like:
- mongoose.connect(MONGO_URI)

This allows the backend server to read/write data in cloud database.

---

### Step 3: Authentication System
Implemented:
- Register API
- Login API
- JWT token generation

On login:
- Server checks email and password
- If correct, it generates JWT token
- Token is sent back to frontend
- Frontend stores token and sends it for protected routes

---

### Step 4: Gig API
Created APIs:
- POST /api/gigs (create gig)
- GET /api/gigs (list gigs)
- GET /api/gigs/:id (gig details)

Protected API uses JWT middleware to verify user.

---

### Step 5: Bid API
Created APIs:
- POST /api/bids (apply/bid)
- GET bids based on gig (if needed)

This stores bids in MongoDB.

---

# ✅ Frontend Work (React + Vite)

### Step 1: Created React Application using Vite
Frontend is a Vite React TS project.

---

### Step 2: UI Components and Pages
Used Tailwind and shadcn UI for clean UI.

Added pages:
- Auth forms
- Browse gigs
- Create gig form
- Gig details

---

### Step 3: API Integration
Used Axios to connect frontend to backend APIs.

Base URL is controlled using env variable:

`VITE_API_BASE_URL`

So locally it can be:
- http://localhost:5000/api

And in deployment it becomes:

https://gig-flow-1icj.onrender.com

