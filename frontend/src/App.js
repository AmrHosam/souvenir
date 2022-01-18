import { Container } from "react-bootstrap";
import ShopScreen from "./Screens/ShopScreen";
import MyNav from "./Components/MyNav";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginScreen from "./Screens/LoginScreen";
import ProductScreen from "./Screens/ProductScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import CartScreen from './Screens/CartScreen';
import ShippingScreen from "./Screens/shippingScreen";

function App() {
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
          <Route path='/cart' element={<CartScreen />}></Route>
          <Route path='/cart/:id' element={<CartScreen />}></Route>
          <Route path='/shipping' element={<ShippingScreen />}></Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
