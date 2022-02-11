import asyncHandler from 'express-async-handler'
import Order from '../models/ordersModel.js'

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        ItemsPrice,
        shippingPrice,
        totalPrice,
    } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')

    } else {
        const order = new Order({
            orderItems,
            shippingAddress,
            paymentMethod,
            ItemsPrice,
            shippingPrice,
            totalPrice,
        })

        const createdorder = await order.save()

        res.status(201).json(createdorder)
    }
})

const getUserOrders = asyncHandler(async(req, res) => {
    const userId = req.user._id.toString()
    const orders = await Order.find({user:userId})
    res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
  })
export { addOrderItems, getUserOrders ,getOrders}