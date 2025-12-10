# Notes CRUD Backend

Express.js backend API for the Notes CRUD application with MongoDB.

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
MONGO_DB_NAME=your_database_name
PORT=5000
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up your `.env` file with MongoDB connection details.

3. Run the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Deployment Options

### Option 1: Railway (Recommended)

Railway is excellent for deploying Express + MongoDB applications.

#### Steps:

1. **Sign up** at [railway.app](https://railway.app)

2. **Create a New Project** and connect your GitHub repository

3. **Add MongoDB Service:**
   - Click "New" → "Database" → "MongoDB"
   - Railway will automatically create a MongoDB instance

4. **Add Web Service:**
   - Click "New" → "GitHub Repo" → Select your repository
   - Set Root Directory to `backend`
   - Railway will auto-detect Node.js

5. **Set Environment Variables:**
   - Go to your web service → "Variables"
   - Add:
     - `MONGO_URI` - Get this from your MongoDB service → "Connect" → "MongoDB Connection String"
     - `MONGO_DB_NAME` - Your database name (e.g., `notesdb`)
     - `PORT` - Railway sets this automatically, but you can use `3000` if needed

6. **Deploy:**
   - Railway will automatically deploy on every push to your main branch
   - Your API will be available at `https://your-app.railway.app/api`

### Option 2: Render

Render is another great option for Express applications.

#### Steps:

1. **Sign up** at [render.com](https://render.com)

2. **Create a Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Set:
     - **Name**: `notes-backend` (or your preferred name)
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Set Environment Variables:**
   - Go to "Environment" section
   - Add:
     - `MONGO_URI` - Your MongoDB Atlas connection string
     - `MONGO_DB_NAME` - Your database name
     - `PORT` - Render sets this automatically

4. **Deploy:**
   - Click "Create Web Service"
   - Your API will be available at `https://your-app.onrender.com/api`

#### Note: For MongoDB on Render
- Use **MongoDB Atlas** (free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
- Create a cluster, get connection string, and whitelist Render's IP (or use `0.0.0.0/0` for all IPs in development)

### Option 3: Vercel (Serverless)

Vercel requires converting the Express app to serverless functions.

#### Steps:

1. **Update server.js for Vercel compatibility:**
   The server needs to export a handler instead of listening directly.

2. **Deploy via Vercel CLI:**
```bash
cd backend
npm i -g vercel
vercel
```

3. **Or deploy via Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Import repository
   - Set Root Directory to `backend`
   - Add environment variables:
     - `MONGO_URI`
     - `MONGO_DB_NAME`

4. **Note:** Vercel works best with serverless functions. For traditional Express apps, Railway or Render are recommended.

### Option 4: MongoDB Atlas Setup (Required for Render/Railway MongoDB)

1. **Sign up** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a Free Cluster:**
   - Choose a cloud provider and region
   - Select M0 (Free) tier

3. **Configure Network Access:**
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (allows all IPs) or add specific IPs

4. **Create Database User:**
   - Go to "Database Access"
   - Add a new user with username/password
   - Set privileges to "Atlas admin" or create a custom role

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `notesdb`)

   Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/notesdb?retryWrites=true&w=majority`

## API Endpoints

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a single note by ID
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## CORS Configuration

The backend is configured to allow CORS from all origins. For production, you may want to restrict this to your frontend domain:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app'
}));
```

