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

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to set up your project.

5. Add environment variable for your backend API URL:
   - Go to your project settings on Vercel dashboard
   - Navigate to "Environment Variables"
   - Add `VITE_API_URL` with your backend API URL (e.g., `https://your-backend.vercel.app/api` or your deployed backend URL)

6. Redeploy for the environment variable to take effect.

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket.

2. Go to [Vercel](https://vercel.com) and sign in.

3. Click "New Project" and import your repository.

4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (if your repo contains both frontend and backend)
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `dist` (should auto-detect)
   - **Install Command**: `npm install` (should auto-detect)

5. Add environment variable:
   - In the "Environment Variables" section, add:
     - Name: `VITE_API_URL`
     - Value: Your backend API URL (e.g., `https://your-backend.vercel.app/api`)

6. Click "Deploy".

### Important Notes:

- Make sure your backend API is deployed and accessible (on Vercel, Railway, Render, etc.)
- Update the `VITE_API_URL` environment variable in Vercel to point to your deployed backend
- The frontend will use `/api` as the default if `VITE_API_URL` is not set, which requires the backend to be on the same domain
- If your backend is on a different domain, you must set `VITE_API_URL` to the full backend URL

