import thunk from "redux-thunk";
import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { userAuthorizationReducer, userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { productListReducer, productDetailsReducer, productCreateReducer, productDeleteReducer, productUpdateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  product: productDetailsReducer,
  cart: cartReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  userAuthorization: userAuthorizationReducer
});

const userInfoFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const shippingAdressFormStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const initialState = {
  userLogin: { user: userInfoFromStorage },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAdressFormStorage
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
