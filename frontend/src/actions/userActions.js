import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post("/users/login", { email, password });
    console.log(data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("user");
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    console.log('errorrrrrr logout ' , error)
    throw new Error(error);
  }
};

export const register = (user) => async (dispatch) => {
  console.log(user);
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios.post("/users/register", user);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
