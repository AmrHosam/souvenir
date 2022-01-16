import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../constants/cartConstants'

export const addItem = (id, quantity) => async(dispatch, getState) => {
    const { item } = await axios.get(`/shop/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: item._id,
            name: item.name,
            image: item.image,
            countInStock: item.countInStock,
            price: item.price,
            quantity,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}