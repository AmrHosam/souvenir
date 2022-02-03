import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const addItem = asyncHandler(async(req, res) => {
    const { quantity, userId } = req.body

    const currentUser = await User.findById(userId)
    const existItem = currentUser.cart.find((item) => item.product.toString() === req.params.id)
    if(existItem)
        existItem.quantity = quantity
    else{
        currentUser.cart.push({
            product: req.params.id,
            quantity,
        })
    }
    const savedUser = await currentUser.save()
    res.json(savedUser)
    // console.log(savedUser)
})

const deleteItem = asyncHandler(async(req, res) => {
    const { userId } = req.body
    const currentUser = await User.findById(userId)
    currentUser.cart = currentUser.cart.filter((item) => item.product.toString() !== req.params.id)
    const savedUser = await currentUser.save()
    res.json(savedUser)
    console.log(savedUser)
})

const getCartItems = asyncHandler(async(req, res) => {
    const { userId } = req.body
    console.log(req.body)
    const currentUser = await User.findById(userId)
    console.log(currentUser)
    if(currentUser){
        const cartItems = currentUser.cart
        res.json(cartItems)
        console.log(cartItems)
    }
})

const insertLocalStorage = asyncHandler(async(req, res) => {
    const { localCart, userId } = req.body
    const addedList = []
    const currentUser = await User.findById(userId)
    for(const product of localCart){
        const existItem = currentUser.cart.find((item) => item.product.toString() === product.product)
        if(existItem)
            existItem.quantity = product.quantity
        else{
            addedList.push({
                product: product.product,
                quantity: product.quantity,
            })
        }
    }
    if(addedList.length !== 0){
        currentUser.cart = currentUser.cart.concat(addedList)
    }
    const savedUser = await currentUser.save()
    res.json(savedUser)
    console.log(savedUser)
})

export {
    addItem,
    deleteItem,
    getCartItems,
    insertLocalStorage
}