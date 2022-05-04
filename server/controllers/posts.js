import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { post_id } = req.params;

    try {
        const post = await PostMessage.findById(post_id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { post_id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(post_id)) return res.status(404).send(`No post with id: ${post_id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: post_id };

    await PostMessage.findByIdAndUpdate(post_id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { post_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(post_id)) return res.status(404).send(`No post with id: ${post_id}`);

    await PostMessage.findByIdAndRemove(post_id);

    res.json({ message: "Post deleted successfully." });
}


export default router;