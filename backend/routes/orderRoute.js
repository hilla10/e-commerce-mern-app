import express from 'express';
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from '../controllers/orderController.js';
import adminAuth from '../middlewares/adminAuth.js';
import authUser from '../middlewares/auth.js';

const router = express.Router();

// Admin Features
router.post('/list', adminAuth, allOrders);
router.put('/status', adminAuth, updateStatus);

// Payment Features
router.post('/place', authUser, placeOrder);
router.post('/stripe', authUser, placeOrderStripe);
// router.post('/razorpay', authUser, placeOrderRazorpay);

// User Feature
router.post('/user-orders', authUser, userOrders);

// verify payment
router.post('/verifyStripe', authUser, verifyStripe);

export default router;
