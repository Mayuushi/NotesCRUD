# Combined Vercel Deployment Guide

This project is configured for **monorepo deployment** on Vercel, where both frontend and backend are deployed together.

## Project Structure

```
/
├── frontend/          # React + Vite frontend
│   ├── dist/         # Build output (generated)
│   └── ...
├── backend/          # Express.js backend
│   ├── api/
│   │   └── index.js  # Vercel serverless function entry
│   └── ...
└── vercel.json       # Combined Vercel configuration
```

## How It Works

- **Frontend**: Built from `frontend/` directory, output to `frontend/dist/`
- **Backend**: Serverless function at `backend/api/index.js`
- **Routing**: 
  - `/api/*` → Backend serverless function
  - Everything else → Frontend React app

## Deployment Steps

### 1. Push to GitHub

Make sure your code is pushed to GitHub/GitLab/Bitbucket.

### 2. Deploy to Vercel

#### Via Dashboard:

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your repository
4. **Important Settings:**
   - **Framework Preset**: Other
   - **Root Directory**: Leave as `/` (root)
   - **Build Command**: Will use `vercel.json` configuration
   - **Output Directory**: Will use `vercel.json` configuration

5. **Add Environment Variables:**
   - `MONGO_URI` - Your MongoDB connection string
   - `MONGO_DB_NAME` - Your database name
   - `VITE_API_URL` - Leave empty (uses `/api` by default) OR set to full backend URL if deploying separately

6. Click **"Deploy"**

#### Via CLI:

```bash
# From project root
npm i -g vercel
vercel
```

Follow the prompts, and Vercel will use the `vercel.json` configuration.

### 3. Verify Deployment

After deployment:
- Frontend will be at: `https://your-project.vercel.app`
- Backend API will be at: `https://your-project.vercel.app/api`

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

### Backend:
- `MONGO_URI` - MongoDB connection string
- `MONGO_DB_NAME` - Database name

### Frontend (Optional):
- `VITE_API_URL` - Only needed if backend is on a different domain
  - If empty, frontend uses `/api` (same domain)
  - If set, use full URL like `https://your-backend.vercel.app/api`

## Troubleshooting

### Frontend not loading

- Check that `frontend/dist` exists after build
- Verify build command in `vercel.json`
- Check build logs in Vercel dashboard

### API routes returning 404

- Verify `backend/api/index.js` exists
- Check that routes in `vercel.json` are correct
- Ensure environment variables are set

### MongoDB connection errors

- Verify `MONGO_URI` and `MONGO_DB_NAME` are set
- Check MongoDB Atlas network access (whitelist all IPs: `0.0.0.0/0`)
- Ensure connection string includes database name

### Build fails

- Check that both `frontend/package.json` and `backend/package.json` exist
- Verify Node.js version (requires Node 18+)
- Check build logs for specific errors

## Separate Deployments

If you prefer to deploy frontend and backend separately:

1. **Remove** root `vercel.json`
2. Use `frontend/vercel.json` for frontend deployment
3. Use `backend/vercel.json` for backend deployment
4. Set `VITE_API_URL` in frontend to point to backend URL

See individual READMEs in `frontend/` and `backend/` directories for separate deployment instructions.

