# Notes CRUD App

A full-stack web application for creating, reading, updating, and deleting notes. Built with Node.js/Express backend and React frontend. Features user authentication with JWT tokens.

## Features

- User registration and login
- Create new notes with title and content
- View all notes (user-specific)
- Edit existing notes
- Delete notes
- Responsive design
- JWT-based authentication

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- CORS

### Frontend
- React
- Vite
- Axios
- CSS

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd notes-crud
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
   - In `backend/.env`, update the MongoDB URI and JWT secret as needed

5. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5173` (or the port shown by Vite)

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user

### Notes (Protected)
- `GET /api/notes` - Get all notes for authenticated user
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Project Structure

```
notes-crud/
├── backend/
│   ├── controller/
│   │   ├── notesController.js
│   │   └── userController.js
│   ├── db/
│   │   └── mongo.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── notesRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── NoteForm.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── noteService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── README.md
```

## Usage

1. Register a new account or login with existing credentials
2. Create notes using the form at the top
3. View, edit, or delete your notes in the grid below
4. Logout when done

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.