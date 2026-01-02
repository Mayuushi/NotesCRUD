import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api", userRoutes);
app.use("/api", notesRoutes);
app.use("/api/users", profileRoutes);

const PORT = process.env.PORT || 5000;

// Only listen if not in Vercel serverless environment
if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;