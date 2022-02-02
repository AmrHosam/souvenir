import {
    CART_ADD_ITEM,
    CART_ADD_ITEM_DB_REQUEST,
    CART_ADD_ITEM_DB_SUCCESS,
    CART_ADD_ITEM_DB_FAIL,
    CART_REMOVE_ITEM,
    CART_REMOVE_ITEM_DB_REQUEST,
    CART_REMOVE_ITEM_DB_SUCCESS,
    CART_REMOVE_ITEM_DB_FAIL,
    CART_ITEMS_LIST_REQUEST,
    CART_ITEMS_LIST_SUCCESS,
    CART_ITEMS_LIST_FAIL,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            //replace the item with the new one if it is already in cart
            if (existItem)
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === item.product ? item : x)
                }
            else
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
        case CART_ADD_ITEM_DB_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CART_ADD_ITEM_DB_SUCCESS:
            return {
                ...state,
                loading: false,
                newItem: action.payload
            }
        case CART_ADD_ITEM_DB_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            case CART_ITEMS_LIST_REQUEST:
                return {
                    ...state,
                    loading: true,
                }
            case CART_ITEMS_LIST_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    cartItems: action.payload
                }
            case CART_ITEMS_LIST_FAIL:
                return{
                    ...state,
                    loading: false,
                    error: action.payload,
                }  
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== action.payload)
            }
            case CART_REMOVE_ITEM_DB_REQUEST:
                return {
                    ...state,
                    loading: true,
                }
            case CART_REMOVE_ITEM_DB_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    newItem: action.payload
                }
            case CART_REMOVE_ITEM_DB_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        default:
            return state;
    }
}