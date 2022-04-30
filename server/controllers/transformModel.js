import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

import TransformPosition from '../models/transformModel.js';

const router = express.Router();

export const getPositions = async (req, res) => { 
    try {
        const transformPos = await TransformPosition.find();
                
        res.status(200).json(transformPos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosition = async (req, res) => { 
    const { trans_id } = req.params;

    try {
        const pos = await TransformPosition.findById(trans_id);
        
        res.status(200).json(pos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPosition = async (req, res) => {
    const position = req.body;
    const post = PostMessage.findOne({ _id: req.params.post_id });

    const newPosition = new TransformPosition({ ...position, creator: req.userId, createdAt: new Date().toISOString(), post: post });

    try {
        
        await newPosition.save().then(p => p.populate('post'));


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

    await TransformPosition.findByIdAndUpdate(trans_id, updatedPosition, { new: true });

    res.json(updatedPost);
}

export const deleteTrans = async (req, res) => {
    const { trans_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(trans_id)) return res.status(404).send(`No post with id: ${trans_id}`);

    await TransformPosition.findByIdAndRemove(trans_id);

    res.json({ message: "Post deleted successfully." });
}

export default router;