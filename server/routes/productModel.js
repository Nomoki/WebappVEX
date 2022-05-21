import express from 'express';
import { createPost } from '../controllers/posts.js';

import { getPositions, updatePosition, createPosition, getPosition, deleteTrans } from '../controllers/productModel.js';
import auth from '../middleware/auth.js';
import lastestpost from '../middleware/lastestpost.js';


const router = express.Router();

router.get('/', getPositions);
router.get('/:transprod_id', getPosition);
router.post('/', auth, createPosition);
router.patch('/:transprod_id', auth, updatePosition);
router.delete('/:transprod_id', auth, deleteTrans);



export default router;