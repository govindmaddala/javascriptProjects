const express = require('express');
const { createOrder, getOrderByID, myOrders, getAllOrderByAdmin, updateOrderStatus, deleteOrderById } = require('../controllers/OrderController');
const { isAuthenticated, userRole } = require('../middleware/auth');

const router = express.Router();

router.route('/create').post(isAuthenticated,createOrder);
router.route('/:id').get(isAuthenticated,userRole("admin"),getOrderByID);
router.route('/myaccount/orders').get(isAuthenticated,myOrders);
router.route('/admin/allorders').get(isAuthenticated,userRole("admin"),getAllOrderByAdmin);
router.route('/admin/updateStatus/:id').put(isAuthenticated,userRole("admin"),updateOrderStatus);
router.route('/admin/deleteOrder/:id').put(isAuthenticated,userRole("admin"),deleteOrderById);



module.exports = router;