import axios from "axios";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });
        const { data } = await axios.post('/orders', order);
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: order });

        //   dispatch({ type: ORDER_CREATE_SUCCESS, payload: order });
        //   localStorage.setItem("user", JSON.stringify(order));
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};