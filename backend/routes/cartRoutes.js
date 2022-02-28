import express from 'express'
import { addItem, deleteItem, getCartItems, insertLocalStorage } from '../controllers/cartController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getCartItems)
router.route('/:id').post(addItem)
router.route('/:id').delete(protect, deleteItem)
router.route('/insert/:id').post(insertLocalStorage)

export default router
