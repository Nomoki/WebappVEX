import express from 'express';

import { getPosts, createPost, updatePost, deletePost, getPost } from '../controllers/posts.js';

import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getPosts);
router.get('/:post_id', getPost);
router.post('/', auth, createPost);
router.patch('/:post_id', auth, updatePost);
router.delete('/:post_id', auth, deletePost);

export default router;