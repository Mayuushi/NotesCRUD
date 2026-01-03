import { usersCollection } from "../db/mongo.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";


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

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await usersCollection.findOne({
            _id: new ObjectId(req.user.userId)
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await usersCollection.updateOne(
            { _id: user._id },
            { $set: { password: hashedPassword } }
        );

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
