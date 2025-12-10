# Vercel Backend Deployment Guide

## Important: Vercel Dashboard Settings

When deploying the backend to Vercel, you **MUST** configure these settings in the Vercel Dashboard:

### 1. Root Directory Configuration

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **General**
3. Under **Root Directory**, set it to: `backend`
4. Click **Save**

### 2. Build Settings

1. Go to **Settings** → **Build & Development Settings**
2. Verify/Set:
   - **Framework Preset**: Other
   - **Build Command**: Leave empty (Vercel will auto-detect)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install` (or leave empty for auto-detect)

### 3. Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Add these variables:
   - `MONGO_URI` - Your MongoDB connection string
   - `MONGO_DB_NAME` - Your database name

### 4. Node.js Version

1. Go to **Settings** → **Node.js Version**
2. Select **Node.js 18.x** or higher

## Deployment Steps

### Via Dashboard:

1. **Push your code to GitHub** (if not already done)

2. **Go to Vercel Dashboard** → **New Project**

3. **Import your repository**

4. **Configure Project Settings:**
   - **Root Directory**: `backend` ⚠️ **CRITICAL**
   - Framework: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

5. **Add Environment Variables** (before deploying)

6. **Deploy**

### Via CLI:

```bash
cd backend
npm i -g vercel
vercel
```

When prompted:
- Set root directory? **Yes** → `backend`
- Override settings? **Yes** (if you want to use vercel.json)

## Troubleshooting

### Build completes too quickly (34ms)

This usually means:
- ❌ Root Directory is not set to `backend` in Vercel Dashboard
- ❌ package.json is not being found
- ❌ Dependencies are not being installed

**Solution**: Go to Vercel Dashboard → Settings → Root Directory → Set to `backend` → Redeploy

### Functions not found

- Check that `api/index.js` exists
- Verify `vercel.json` is in the `backend` directory
- Ensure Root Directory is set correctly

### MongoDB connection issues

- Verify `MONGO_URI` and `MONGO_DB_NAME` are set in Environment Variables
- Check MongoDB Atlas network access (whitelist `0.0.0.0/0` for all IPs)
- Ensure MongoDB connection string includes database name

## Alternative: Use Railway or Render

For Express + MongoDB apps, **Railway** or **Render** are often easier:
- ✅ Better suited for traditional Express servers
- ✅ Built-in MongoDB support (Railway)
- ✅ Simpler configuration
- ✅ More predictable cold starts

See `README.md` for Railway/Render deployment instructions.

