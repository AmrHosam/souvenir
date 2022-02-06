import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /shop
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const products = await Product.find({...keyword})
    res.json(products)
})


// @desc    Fetch single product
// @route   GET /shop/:id
// @access  Public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product)
        res.json(product)
    else
        res.status(404, json({message: "Product not found"}))
})

  // @desc    Create a new review
  // @route   POST /shop/:id/reviews
  // @access  Private
  const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    
    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400).json({message: 'Product already reviewed'})
            throw new Error('Product already reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length
        await product.save()
        res.status(201).json({ message: 'Review added '})
    }else{
        res.status(404).json({message: 'Product not found'})
        throw new Error('Product not found')
    }
  })

export {
    getProducts,
    getProductById,
    createProductReview,
}
