import express from 'express';
import { createPost } from '../controllers/posts.js';

import { getPositions, updatePosition, createPosition, getPosition, deleteTrans } from '../controllers/transformModel.js';
import auth from '../middleware/auth.js';
import lastestpost from '../middleware/lastestpost.js';


const router = express.Router();

router.get('/', getPositions);
router.get('/:trans_id', getPosition);
router.get('/:post_id', createPost).post('/', auth, lastestpost, createPosition);
router.patch('/:trans_id', auth, updatePosition);
router.delete('/:trans_id', auth, deleteTrans);



export default router;