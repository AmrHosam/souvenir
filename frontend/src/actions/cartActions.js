import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_ADD_ITEM_DB_REQUEST,
    CART_ADD_ITEM_DB_SUCCESS,
    CART_ADD_ITEM_DB_FAIL,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD

} from '../constants/cartConstants'

export const addItem = (id, quantity) => async (dispatch, getState) => {
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

export const addItemDB = (userId, itemId, quantity) => async(dispatch) => {
    try {
        dispatch({
            type: CART_ADD_ITEM_DB_REQUEST
        })
        await dispatch(addItem(itemId, quantity))
        const { data } = await axios.post(`/cart/${itemId}`, { quantity, userId})
        dispatch({
            type: CART_ADD_ITEM_DB_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch(removeItem(itemId))
        dispatch({
            type: CART_ADD_ITEM_DB_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
    
}

export const removeItem = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })
    localStorage.setItem('PAYMENTmETHOD', JSON.stringify(data))
}
