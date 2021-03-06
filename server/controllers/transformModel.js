import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

import ScenePosition from '../models/transformModel.js';

const router = express.Router();

export const getPositions = async (req, res) => { 
    try {
        const transformPos = await ScenePosition.find();
                
        res.status(200).json(transformPos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosition = async (req, res) => { 
    const { trans_id } = req.params;

    try {
        const pos = await ScenePosition.findById(trans_id);
        
        res.status(200).json(pos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPosition = async (req, res) => {
    const position = req.body;
    const newPosition = new ScenePosition({ ...position, creator: req.userId, createdAt: new Date().toISOString(), postmessage: req.lastestPost });
    
    try {
        await newPosition.save();

        res.status(201).json(newPosition);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePosition = async (req, res) => {
    const { trans_id } = req.params;
    const { creator, Objnum, TransX, TransY, TransZ, RotateX, RotateY, RotateZ, ScaleX, ScaleY, ScaleZ } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(trans_id)) return res.status(404).send(`No position with id: ${trans_id}`);

    const updatedPosition = { creator, Objnum, TransX, TransY, TransZ, RotateX, RotateY, RotateZ, ScaleX, ScaleY, ScaleZ, _id: trans_id };

    await ScenePosition.findByIdAndUpdate(trans_id, updatedPosition, { new: true });

    res.json(updatedPost);
}

export const deleteTrans = async (req, res) => {
    const { trans_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(trans_id)) return res.status(404).send(`No post with id: ${trans_id}`);

    await ScenePosition.findByIdAndRemove(trans_id);

    res.json({ message: "Post deleted successfully." });
}

export default router;