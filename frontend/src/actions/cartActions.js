import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_ADD_ITEM_DB_REQUEST,
    CART_ADD_ITEM_DB_SUCCESS,
    CART_ADD_ITEM_DB_FAIL,
    CART_ITEMS_LIST_REQUEST,
    CART_ITEMS_LIST_SUCCESS,
    CART_ITEMS_LIST_FAIL,
    CART_REMOVE_ITEM,
    CART_REMOVE_ITEM_DB_REQUEST,
    CART_REMOVE_ITEM_DB_SUCCESS,
    CART_REMOVE_ITEM_DB_FAIL,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_RESET,
    CART_INITIALIZE,
    CART_INSERT_LOCAL_STORAGE_TO_DB_REQUEST,
    CART_INSERT_LOCAL_STORAGE_TO_DB_SUCCESS,
    CART_INSERT_LOCAL_STORAGE_TO_DB_FAIL

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
        const { data:product } = await axios.get(`/shop/${itemId}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: product._id,
                name: product.name,
                image: product.image,
                countInStock: product.countInStock,
                price: product.price,
                quantity,
            }
        })
        const { data } = await axios.post(`/cart/${itemId}`, { quantity, userId})
        dispatch({
            type: CART_ADD_ITEM_DB_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: itemId
        })
        dispatch({
            type: CART_ADD_ITEM_DB_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
    
}


export const getCartItems = (userId) => async(dispatch, getState) => {
    try {
        dispatch({type: CART_ITEMS_LIST_REQUEST})
        const cartList = []
        const { data } = await axios.post('/cart', { userId })
        for (const item of data){
            const product = await axios.get(`/shop/${item.product}`)
            cartList.push({
                product: product.data._id,
                name: product.data.name,
                image: product.data.image,
                countInStock: product.data.countInStock,
                price: product.data.price,
                quantity: item.quantity,
            })
        }
        dispatch({
                type: CART_ITEMS_LIST_SUCCESS,
                payload: cartList,
        })
    } catch (error) {
        dispatch({
            type: CART_ITEMS_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error
        })
    }
}

export const removeItem = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemDB = (userId, itemId) => async(dispatch) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM_DB_REQUEST
        })
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: itemId
        })
        const { data } = await axios.post(`/cart/delete/${itemId}`, {userId})
        dispatch({
            type: CART_REMOVE_ITEM_DB_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const { data:product } = await axios.get(`/shop/${itemId}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: product._id,
                name: product.name,
                image: product.image,
                countInStock: product.countInStock,
                price: product.price,
                quantity: 1,
            }
        })
        dispatch({
            type: CART_REMOVE_ITEM_DB_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}

export const resetCart = () => async(dispatch) => {
    localStorage.setItem('cartItems', JSON.stringify([]))
    dispatch({type:CART_RESET})
}

export const initializeCart = () => async(dispatch) => {
    const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    dispatch({
        type: CART_INITIALIZE,
        payload: cartItemsFromStorage
    })
}

export const insertLocalStorageToDB = (userId) => async(dispatch) => {
    try {
        const localCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
        dispatch({
            type: CART_INSERT_LOCAL_STORAGE_TO_DB_REQUEST
        })
        const { data } = await axios.post(`/cart/insert/${userId}`, {localCart, userId})
        dispatch({
            type: CART_INSERT_LOCAL_STORAGE_TO_DB_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: CART_INSERT_LOCAL_STORAGE_TO_DB_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
    
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
