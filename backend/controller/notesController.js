import { notesCollection } from "../db/mongo.js"; 
import { ObjectId } from "mongodb";

//Read all notes
export const getAllNotes = async (req, res) => {
    const notes = await notesCollection.find({ userId: req.user.userId }).sort({createdAt: -1}).toArray();
    res.json(notes);
};

//Read a single note by ID
export const getNoteById = async (req, res) => {
    try{
        const note = await notesCollection.findOne({_id: new ObjectId(req.params.id), userId: req.user.userId});
        if(!note) return res.status(404).json({message: "Note not found"});
        res.json(note);
    }catch (err){
        res.status(500).json({message: err.message});
    }
};

export const createNote = async (req, res) => {
    try {
        const note = {
            title: req.body.title,
            content: req.body.content,
            userId: req.user.userId,
            createdAt: new Date()
        };

        const result = await notesCollection.insertOne(note);

        // Send back the created note with its _id
        res.status(201).json({ _id: result.insertedId, ...note });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const result = await notesCollection.updateOne(
            { _id: new ObjectId(id), userId: req.user.userId },
            { $set: { title, content } }
        );

        if (result.matchedCount === 0) {
            // No document matched the query
            return res.status(404).json({ message: "Note not found" });
        }

        // Optional: fetch the updated document
        const updatedNote = await notesCollection.findOne({ _id: new ObjectId(id) });

        res.json({ message: "Note updated successfully", updatedNote });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const deleteNote = async (req, res) => {
    try{
        const result = await notesCollection.deleteOne({_id: new ObjectId(req.params.id), userId: req.user.userId});
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json({message: "Note deleted"});
    }catch (err){
        res.status(500).json({message: err.message});
    }
};