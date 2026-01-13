# GigFlow - Mini Freelance Marketplace

A simplified freelancing platform where users can post gigs, submit bids, and hire freelancers.

## Features

### User Authentication
- Register with name, email, and password
- Login with email and password
- JWT-based authentication (backend)

### Gig Management
- Post new gigs with title, description, and budget
- Browse all open gigs
- View gig details
- Search gigs by title

### Bidding System
- Submit bids on open gigs
- View all bids on a gig (gig owner only)
- Hire a freelancer from submitted bids

### Dashboard
- View posted gigs
- View submitted bids
- Track bid status (pending/hired)

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management

### Backend (To be implemented)
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Gig Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/gigs | Create a new gig |
| GET | /api/gigs | Get all open gigs |
| GET | /api/gigs/:id | Get gig by ID |

### Bid Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/bids | Submit a bid |
| GET | /api/bids/gig/:gigId | Get all bids for a gig |
| PATCH | /api/bids/:id/hire | Hire a freelancer |

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Gig
```javascript
{
  title: String,
  description: String,
  budget: Number,
  postedBy: ObjectId (ref: User),
  status: String (open/closed)
}
```

### Bid
```javascript
{
  gigId: ObjectId (ref: Gig),
  freelancerId: ObjectId (ref: User),
  bidAmount: Number,
  message: String,
  status: String (pending/hired)
}
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd gigflow
```

2. Install frontend dependencies
```bash
npm install
```

3. Start the frontend development server
```bash
npm run dev
```

4. For backend setup, create a Node.js server with Express and connect to MongoDB

### Environment Variables

Create a `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React Context providers
├── pages/            # Page components
├── types/            # TypeScript interfaces
└── lib/              # Utility functions
```

## Submission

- **Name**: [Your Name]
- **Email**: [Your Email]
- **GitHub Repository**: [Repository URL]
- **Deployed Link**: [Deployment URL]
