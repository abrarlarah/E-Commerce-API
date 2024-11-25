const express = require('express');
const { createOrder, getOrder, getUserOrders } = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/:id', authenticate, getOrder);
router.get('/user/:id', authenticate, getUserOrders);

module.exports = router;
