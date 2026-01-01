import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();

const db = mongoClient.db(process.env.MONGO_DB_NAME);
export const notesCollection = db.collection("notes");
export const usersCollection = db.collection("users");

console.log("Connected to MongoDB");