import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../constants/cartConstants'

export const addItem = (id, quantity) => async(dispatch, getState) => {
    const { data } = await axios.get(`/shop/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
           image: data.image,
            countInStock: data.countInStock,
            price: data.price,
            quantity,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItem = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}