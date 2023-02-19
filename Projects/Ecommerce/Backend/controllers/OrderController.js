const OrderModel = require('../models/OrderModel');
const ProductModel = require('../models/ProductModel');
const productModel = require('../models/ProductModel');
const CatchAsyncErrors = require('../utils/CatchAsyncErrors');
const ErrorHandle = require('../utils/ErrorHandle')

exports.createOrder = CatchAsyncErrors(async (req, res, next) => {
    const {
        shippingAddress,
        orderItems,
        payementInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const newOrder = await OrderModel.create({
        shippingAddress,
        orderItems,
        payementInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        newOrder
    })
});


exports.getOrderByID = CatchAsyncErrors(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id)
        .populate(
            "user", "username email");

    if (!order) {
        return next(new ErrorHandle("Order not found", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
});

exports.myOrders = CatchAsyncErrors(async (req, res, next) => {
    const allOrders = await OrderModel.find({ user: req.user._id });
    return res.status(200).json({
        success: true,
        allOrders
    })
});


exports.getAllOrderByAdmin = CatchAsyncErrors(async (req, res, next) => {
    const allOrders = await OrderModel.find();

    let totalAmountOfOrders = 0;

    allOrders.forEach(order => totalAmountOfOrders += order.totalPrice)

    return res.status(200).json({
        success: true,
        totalAmountOfOrders,
        allOrders
    })
});

exports.updateOrderStatus = CatchAsyncErrors(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id)

    if(!order){
        return next(new ErrorHandle("No order found", 404))
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandle("Order has been delievered already", 400))
    }

    order.orderStatus = req.body.status;
    if (order.orderStatus == "Delivered") {
        order.deliveredAt = Date.now();
        order.orderItems.forEach(async (order) => {
            await updateProductStock(order.product, order.quantity)
        })
    }

    await order.save({validateBeforeSave:false});

    res.status(200).json({
        success: true,
        order
    })
});

const updateProductStock = async (productID, productQuantityOrdered) => {
    const product = await ProductModel.findById(productID);
    product.stock -= productQuantityOrdered;
    await product.save({ validateBeforeSave: false })
}

exports.deleteOrderById = CatchAsyncErrors(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandle("Order not found", 404))
    }
    await order.remove();
    return res.status(6+200).json({
        success: true
    })
});