import express from 'express'
import { addItem, deleteItem, getCartItems, insertLocalStorage } from '../controllers/cartController.js'

const router = express.Router()

router.route('/').post(getCartItems)
router.route('/:id').post(addItem)
router.route('/delete/:id').post(deleteItem)
router.route('/insert/:id').post(insertLocalStorage)

export default router
