import thunk from "redux-thunk";
import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { userAuthorizationReducer, userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { productListReducer, productDetailsReducer, productAddReviewReducer, productCreateReducer, productDeleteReducer, productUpdateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, getUserOrdersReducer, orderListReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  product: productDetailsReducer,
  cart: cartReducer,
  productAddReview: productAddReviewReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  userAuthorization: userAuthorizationReducer,
  orderCreate: orderCreateReducer,
  userOrders: getUserOrdersReducer,
  orderList: orderListReducer
});

const userInfoFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const shippingAdressFormStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {}

const initialState = {
  userLogin: { user: userInfoFromStorage },
  cart: {
    cartItems: [],
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
