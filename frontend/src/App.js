import { Container } from "react-bootstrap";
import ShopScreen from "./Screens/ShopScreen";
import MyNav from "./Components/MyNav";
import {BrowserRouter as Router,Route,Routes}  from 'react-router-dom'
import LoginScreen from "./Screens/LoginScreen";

function App() {
  return (
    <Router>
      <MyNav></MyNav>
      <Container>
        
          <Routes>

          <Route path='/login' element={<LoginScreen />} exact></Route>
          <Route path='/' element={<ShopScreen/>} exact></Route>

        
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
