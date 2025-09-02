# Blog Application

This is a full-stack blog application built with modern web technologies. The project is structured in a monorepo with separate folders for the backend and frontend. It allows users to create, read, update, and delete blog posts, and add comments.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Database](#database)
- [Project Structure](#project-structure)


## Features

- **CRUD Operations for Posts**: Create, read, update, and delete blog posts.
- **Comment System**: Users can add comments on posts.
- **Responsive UI**: Mobile-friendly design with modular styling.
- **State Management**: Efficient handling of application state with Redux Toolkit.
- **Routing**: Seamless navigation using React Router v6.

## Tech Stack

### Backend
- **Framework**: Nest.js
- **Database**: PostgreSQL with TypeORM for ORM
- **Hosting**: Database hosted on Neon (serverless Postgres)

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: CSS Modules

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 
- npm 
- PostgreSQL (local setup for development, or use Neon for cloud)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DmytroSadovskyi/blog-test-task.git
   cd blog-test-task
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - In the `backend` folder, create a `.env` file based on `.env.example` (if available).
   - Include your Neon database connection string, e.g.:
     ```bash
     DATABASE_URL=postgresql://user:password@neon-host:5432/dbname?sslmode=require
     ```

## Running the Application

### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Start the server:
   ```bash
   npm run start:dev
   ```
   The backend will run on `http://localhost:3000` (or your configured port).

### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

### Full Stack
For production, build both parts:
- Backend: `npm run build` in `backend/`
- Frontend: `npm run build` in `frontend/`
Deploy using a tool like Docker or a hosting platform as needed.

## Database

The application uses PostgreSQL as the database, managed via TypeORM for entity definitions. The production database is hosted on [Neon](https://neon.tech/), a serverless Postgres platform for scalability and ease of management.

- **Connection**: Configured via `DATABASE_URL` in `.env`.


## Project Structure

```
blog-test-task/
├── backend/              # Nest.js backend
│   ├── src/              # Source code
│   ├── .env              # Environment variables
│   └── package.json      # Dependencies
├── frontend/             # React frontend
│   ├── src/              # Source code (components, redux, etc.)
│   ├── public/           # Public assets
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Dependencies
|── README.md             # This file

```
