import express from 'express';

import { getPositions, updatePosition, createPosition } from '../controllers/transformModel.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPositions);
router.post('/', auth, createPosition);
router.patch('/:id', auth, updatePosition);


export default router;