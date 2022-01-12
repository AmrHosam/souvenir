import { Container } from "react-bootstrap";
import ShopScreen from "./Screens/ShopScreen";
import MyNav from "./Components/MyNav";

function App() {
  return (
    <>
      <MyNav></MyNav>
      <Container>
        <ShopScreen/>
      </Container>
    </>
  );
}

export default App;
