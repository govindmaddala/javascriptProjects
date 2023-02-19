const express = require('express');
const { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, getProductByFilter, createOrUpdateReview, getProductReviews, deleteProductReviews } = require('../controllers/productController');
const { isAuthenticated, userRole } = require('../middleware/auth');

const router = express.Router();

router.route('/create').post(isAuthenticated,userRole("admin"),createProduct);
// router.route('/all').get(isAuthenticated,getAllProducts);
router.route('/all').get(getProductByFilter);
router.route('/:name').get(getProduct)
                      .put(isAuthenticated,userRole("admin"),updateProduct)
                      .delete(isAuthenticated,userRole("admin"),deleteProduct);


router.route('/reviews/review').put(isAuthenticated,createOrUpdateReview);
router.route('/reviews/productId').get(isAuthenticated,getProductReviews);
router.route('/reviews/deleteReview').delete(isAuthenticated,deleteProductReviews);





module.exports = router;