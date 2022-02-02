import {
  USER_ADMIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_ONLY,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, user: {} };
    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = { newUser: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, newUser: {} };
    case USER_REGISTER_SUCCESS:
      return { loading: false, newUser: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAuthorizationReducer = (state = {admin:false,userlogged:false} , action ) => {
  switch (action.type) {
    case USER_ADMIN:
      return {admin:true , userLogged : true}
    case USER_ONLY:
      return {admin:false, userLogged:true}
    default:
      return state

  }
}