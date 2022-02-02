import express from 'express'
import { addItem, deleteItem, getCartItems } from '../controllers/cartController.js'

const router = express.Router()

router.route('/').post(getCartItems)
router.route('/:id').post(addItem)
router.route('/delete/:id').post(deleteItem)

export default router
