# Homestay Review Analyzer

An AI-powered Full Stack web application that analyzes homestay guest reviews. The application performs sentiment analysis, identifies key themes, and generates AI-based responses to help homestay owners improve customer satisfaction.

---

# Features

## Frontend

- Home Page
- About Page
- Dashboard
- Login Page
- Responsive Design
- Dark / Light Mode
- Reusable UI Components
  - Button
  - Input
  - Modal
  - Loader
  - Toast

## Backend

- Express.js REST API
- CRUD Operations
- Search Reviews
- Error Handling Middleware
- Environment Variables using dotenv
- CORS Enabled

---

# Tech Stack

## Frontend

- Next.js 16
- React 19
- Tailwind CSS v4

## Backend

- Node.js
- Express.js
- CORS
- dotenv
- Nodemon

---

# Project Structure

```
my-app
│
├── src
│   ├── app
│   ├── components
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── data
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── package.json
└── README.md
```

---

# Frontend Setup

Open terminal:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# Backend Setup

Open another terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder.

Add:

```
PORT=5000
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

# REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/reviews | Get all reviews |
| GET | /api/reviews/:id | Get review by ID |
| POST | /api/reviews | Create review |
| PUT | /api/reviews/:id | Update review |
| DELETE | /api/reviews/:id | Delete review |
| GET | /api/reviews/search?q=keyword | Search reviews |

---

# Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000
```

---

# Run the Project

### Terminal 1

```bash
cd backend
npm install
npm run dev
```

### Terminal 2

```bash
npm install
npm run dev
```

Open:

```
Frontend:
http://localhost:3000

Backend:
http://localhost:5000
```

---

# Author

Ajay Singh

AI-Assisted Full Stack Web Development Internship
