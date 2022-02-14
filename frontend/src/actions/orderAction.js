import axios from "axios";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    USER_ORDER_LIST_REQUEST,
    USER_ORDER_LIST_SUCCESS,
    USER_ORDER_LIST_FAIL
} from "../constants/orderConstants";
import { logout } from "./userActions";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const {userLogin: { user }} = getState()
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }

        const { data } = await axios.post(`/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        })
    }
}

export const listUserOrders = () => async(dispatch, getState) => {
    try {
        dispatch({type: USER_ORDER_LIST_REQUEST})
        const {userLogin: { user }} = getState()
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
        const { data } = await axios.get('/orders/', config)
        dispatch({type: USER_ORDER_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: USER_ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}
export const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      })
  
      const {
        userLogin: { user },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
  
      const { data } = await axios.get(`/orders/listAll`, config)
  
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      })
    }
  }
  
