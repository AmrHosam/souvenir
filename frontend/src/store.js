import thunk from 'redux-thunk'
import { combineReducers, applyMiddleware,createStore } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducers'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
const reducer = combineReducers({
    userLogin : userLoginReducer,
    productList : productListReducer,
    product: productDetailsReducer,
    })

const userInfoFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null
const initialState = {
      userLogin: { user: userInfoFromStorage
       }
  }
  
  const middleware = [thunk]
  const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
  export default store;