import { usersCollection } from "../db/mongo.js";
import { ObjectId } from "mongodb";

// GET profile
export const getProfile = async (req, res) => {
    try {
        const user = await usersCollection.findOne(
            { _id: new ObjectId(req.user.userId) },
            { projection: { password: 0 } } // hide password
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE profile (username only)
export const updateProfile = async (req, res) => {
    try {
        const { username } = req.body;

        await usersCollection.updateOne(
            { _id: new ObjectId(req.user.userId) },
            { $set: { username } }
        );

        res.json({ message: "Profile updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
