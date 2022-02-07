import { Container } from "react-bootstrap";
import ShopScreen from "./Screens/ShopScreen";
import MyNav from "./Components/MyNav";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import LoginScreen from "./Screens/LoginScreen";
import ProductScreen from "./Screens/ProductScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import CartScreen from './Screens/CartScreen';
import ShippingScreen from "./Screens/shippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import PlaceOrederScreen from "./Screens/PlaceOrederScreen";
import { useSelector } from 'react-redux';
import _ from "lodash";
function App() {
  const RequireAuthAdmin = ({ children }) => {
    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin
    const location = useLocation()
    console.log(location.pathname)
    if (user) {
      return user.isAdmin ? children : <Navigate to={location.state.from} />;
    }
    else {
      console.log('ayyy')
      return <Navigate to='/login' replace state={{ from: location.pathname }} />
    }
  }
  const RequireAuthUser = ({ children }) => {
    const userLogin = useSelector(state=> state.userLogin)
    const {user } = userLogin
    const location = useLocation()
    console.log(location.pathname)
    
          return user ? children : <Navigate to='/login' replace state={{from : location.pathname}}/>
        
  }
  return (
    <Router>
      <MyNav></MyNav>
      <Container>

        <Routes>

          <Route path='/login' element={<LoginScreen />} exact></Route>
          <Route path='/register' element={<RegisterScreen />} exact></Route>
          <Route path='/' element={<ShopScreen />} exact></Route>
          <Route path='/shop' element={<ShopScreen />} exact></Route>
          <Route path='/shop/:id' element={<ProductScreen />}></Route>
          <Route path='/shop/search/:keyword' element={<ShopScreen />}></Route>
          <Route path='/cart' element={<CartScreen />}></Route>
          <Route path='/cart/:id' element={<CartScreen />}></Route>
          <Route path='/shipping' element={<ShippingScreen />}></Route>
          <Route path='/placeorder' element={<PlaceOrederScreen />}></Route>
          <Route path='/payment' element={<PaymentScreen />}></Route>

          <Route path='/admin/productlist' element={<RequireAuthAdmin ><ProductListScreen /></RequireAuthAdmin>} exact></Route>
          <Route path='/admin/productlist/create' element={<RequireAuthAdmin ><ProductEditScreen /></RequireAuthAdmin>} exact></Route>
          <Route path='/admin/product/:id/edit' element={<RequireAuthAdmin ><ProductEditScreen /></RequireAuthAdmin>} exact></Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
