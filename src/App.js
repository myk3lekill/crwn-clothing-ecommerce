import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";

const Shop = () => {
  return (
    <h1>I'am the shop</h1>
  )
}

const App = () => {
  return( 
  <Routes>
    <Route path = '/home' element={<Home />}>
      <Route path = 'shop' element={<Shop />}></Route>
    </Route>
    
  </Routes>
  )
};

export default App;
