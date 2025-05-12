import express from 'express';

import {
  addToCart,
  getUserCart,
  updateCart,
} from '../controllers/cartController.js';
import authUser from '../middlewares/auth.js';

const router = express.Router();

router.post('/get', authUser, getUserCart);
router.post('/add', authUser, addToCart);
router.put('/update', authUser, updateCart);

export default router;
