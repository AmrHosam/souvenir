import thunk from 'redux-thunk'
import { combineReducers, applyMiddleware,createStore } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducers'
const reducer = combineReducers({
    userLogin : userLoginReducer,
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