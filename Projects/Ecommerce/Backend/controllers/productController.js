const productModel = require('../models/ProductModel');
const CatchAsyncErrors = require('../utils/CatchAsyncErrors');
const ErrorHandle = require('../utils/ErrorHandle')
const _ = require('lodash');
const FilterProductBy = require('../APIs/productFilterAPI');

exports.createProduct = CatchAsyncErrors(async (req, res, next) => {
    let itemName = await req.body.name;
    itemName = _.capitalize(itemName);
    const productFound = await productModel.findOne({ name: itemName });
    req.body.userResponsible = req.user.id;
    if (!productFound) {
        const product = await productModel.create(req.body);
        if (product) {
            return res.status(201).json({
                success: true,
                message: "Product is created",
                product
            })
        }
    } else {
        return next(new ErrorHandle("Product already registered", 400))
    }
});

exports.getAllProducts = CatchAsyncErrors(async (req, res, next) => {
    const productCount = await productModel.countDocuments();
    const allProducts = await productModel.find()
    res.status(200).json({
        success: true,
        allProducts,
        productCount
    })
});

exports.getProduct = CatchAsyncErrors(async (req, res, next) => {
    let itemName = await req.params.name;
    itemName = _.capitalize(itemName);
    const product = await productModel.findOne({ name: itemName });
    if (product) {
        return res.status(200).json({
            success: true,
            product
        })
    } else {
        return next(new ErrorHandle("Product not found", 404))
    }
});

exports.updateProduct = CatchAsyncErrors(async (req, res, next) => {
    let itemName = await req.params.name;
    itemName = _.capitalize(itemName);
    const product = await productModel.findOne({ name: itemName });
    if (product) {
        const productUpdated = await productModel.findOneAndUpdate({ name: itemName }, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            productUpdated
        })
    } else {
        return next(new ErrorHandle("Product not found", 404))
    }
});

exports.deleteProduct = CatchAsyncErrors(async (req, res, next) => {
    let itemName = await req.params.name;
    itemName = _.capitalize(itemName);
    const product = await productModel.findOne({ name: itemName });
    if (product) {
        const product = await productModel.findOneAndDelete({ name: itemName });
        return res.status(200).json({
            success: true,
            message: `${itemName} is deleted from inventory`
        })
    }
    return next(new ErrorHandle("Product not found", 404))
});

//Apply filters on all products:
exports.getProductByFilter = CatchAsyncErrors(async (req, res, next) => {
    const itemsPerPage = 4;
    const productCount = await productModel.countDocuments();
    const filterInstance = new FilterProductBy(productModel, req.query).search().pagention(itemsPerPage).filter();
    const product = await filterInstance.mongooseModel;
    res.status(200).json({
        success: true,
        product,
        productCount
    })
})

exports.createOrUpdateReview = CatchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.username,
        rating: Number(rating),
        comment
    }

    const productFound = await productModel.findById(productId);
    if (!productFound) {
        return next(new ErrorHandle("Product not found", 404))
    }

    var isReviewedAlreadyByUser = productFound.reviews.find(rev =>
        rev.user.toString() === req.user._id.toString()
      
    )
    if(isReviewedAlreadyByUser){
        productFound.reviews.forEach(rev=>{
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    }else{
        productFound.reviews.push(review);
        productFound.reviewCount = productFound.reviews.length;
    }

    let sumOfRatings = 0;
    productFound.reviews.forEach(rev=>{
        sumOfRatings += rev.rating;
    })

    var avg = sumOfRatings / productFound.reviews.length;

    productFound.productRating = avg;

    await productFound.save({validateBeforeSave:false});

    return res.status(200).json({
        success:true,
        message:"Review is updated"
    })
});


exports.getProductReviews = CatchAsyncErrors(async (req, res, next) => {
    const productFound = await productModel.findById(req.query.productId);
    if (!productFound) {
        return next(new ErrorHandle("Product not found", 404))
    }

    const allReviews = productFound.reviews;
    res.status(200).json({
        success:true,
        allReviews
    })
});


exports.deleteProductReviews = CatchAsyncErrors(async (req, res, next) => {
    const productFound = await productModel.findById(req.query.productId);
    if (!productFound) {
        return next(new ErrorHandle("Product not found", 404))
    }
    // console.log(req.user.id);
    productFound.reviews = productFound.reviews.filter((rev)=>{
        if(rev.user.toString() != req.user.id.toString()){
            return rev;
        };
    })
    
    productFound.reviewCount = productFound.reviews.length;
    let sumOfRatings = 0;
    productFound.reviews.forEach(rev=>{
        sumOfRatings += rev.rating;
    })

    var avg = sumOfRatings / productFound.reviews.length;

    productFound.productRating = avg;

    await productFound.save({validateBeforeSave:false});
    res.status(200).json({
        success:true
    })
})