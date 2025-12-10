# Notes CRUD Frontend

A beautiful React + Vite frontend for the Notes CRUD application.

## Features

- ✨ Modern, responsive UI design
- 📝 Create, read, update, and delete notes
- 🎨 Beautiful gradient background and card-based layout
- 📱 Mobile-friendly design
- ⚡ Fast and smooth user experience with Vite's lightning-fast HMR

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Make sure the backend server is running on port 5000 (or update the API_BASE_URL in `src/services/noteService.js`)

2. Start the Vite development server:
```bash
npm run dev
```

The app will open in your browser at `http://localhost:3000`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

To preview the production build:
```bash
npm run preview
```

## Environment Variables

You can create a `.env` file in the frontend directory to customize the API URL:

```
VITE_API_URL=http://localhost:5000/api
```

Note: In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client code.

