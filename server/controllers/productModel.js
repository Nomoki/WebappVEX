import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

import ProductPosition from '../models/productModel.js';

const router = express.Router();

export const getPositions = async (req, res) => { 
    try {
        const transformPos = await ProductPosition.find();
                
        res.status(200).json(transformPos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosition = async (req, res) => { 
    const { transprod_id } = req.params;

    try {
        const pos = await ProductPosition.findById(transprod_id);
        
        res.status(200).json(pos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPosition = async (req, res) => {
    const position = req.body;
    const newPosition = new ProductPosition({ ...position, creator: req.userId, createdAt: new Date().toISOString(), postmessage: req.lastestPost });
    
    try {
        await newPosition.save();

        res.status(201).json(newPosition);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePosition = async (req, res) => {
    const { transprod_id } = req.params;
    const { creator, Objnum, TransX, TransY, TransZ, RotateX, RotateY, RotateZ, ScaleX, ScaleY, ScaleZ } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(transprod_id)) return res.status(404).send(`No position with id: ${transprod_id}`);

    const updatedPosition = { creator, Objnum, TransX, TransY, TransZ, RotateX, RotateY, RotateZ, ScaleX, ScaleY, ScaleZ, _id: transprod_id };

    await ProductPosition.findByIdAndUpdate(transprod_id, updatedPosition, { new: true });

    res.json(updatedPost);
}

export const deleteTrans = async (req, res) => {
    const { transprod_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(transprod_id)) return res.status(404).send(`No post with id: ${transprod_id}`);

    await ProductPosition.findByIdAndRemove(transprod_id);

    res.json({ message: "Post deleted successfully." });
}

export default router;