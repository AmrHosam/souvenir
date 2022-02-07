import express from 'express'
import { getProducts, getProductById, createProductReview } from '../controllers/productController.js'

import asyncHandler from 'express-async-handler'
import { protect,admin } from '../middleware/authMiddleware.js'
import Product from '../models/productModel.js'
const router = express.Router()

router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

router.route('/:id/reviews').post(protect, createProductReview)

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id',protect,admin, asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
  
    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404)
      res.send({message:'Product not found'})
    }
  }))
  
  // @desc    Create a product
  // @route   POST /api/products
  // @access  Private/Admin
  router.post('/',protect,admin, asyncHandler(async (req, res) => {
    const { name , price , image , category , countInStock , description} = req.body
    const product = new Product({
      name,
      price,
      image,
      category,
      countInStock,     
      description
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  }))

router.put('/:id',protect, admin,  asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    res.send({message:'Product not found'})
  }
}))

export default router