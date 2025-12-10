// Vercel serverless function entry point
import app from '../server.js';

// Export the Express app for Vercel
// @vercel/node will automatically handle the conversion
export default app;

