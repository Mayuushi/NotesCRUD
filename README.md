# Notes CRUD App

A full-stack web application for creating, reading, updating, and deleting notes. Built with Node.js/Express backend and React frontend.

## Features

- Create new notes with title and content
- View all notes
- Edit existing notes
- Delete notes
- Responsive design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- CORS

### Frontend
- React
- Vite
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
   - Copy `.env.example` to `.env` in the backend directory (if available)
   - Update the MongoDB URI and other variables as needed

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

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a specific note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Project Structure

```
notes-crud/
├── backend/
│   ├── controller/
│   ├── db/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.