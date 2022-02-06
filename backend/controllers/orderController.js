import asyncHandler from 'express-async-handler'
import Order from '../models/ordersModel.js'

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAdress,
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
            shippingAdress,
            paymentMethod,
            ItemsPrice,
            shippingPrice,
            totalPrice,
        })

        const createdorder = await order.save()

        res.status(201).json(createdorder)
    }
})

export { addOrderItems }