import { Route, Routes } from "react-router-dom"
import Menu from "./pages/Menu"
import Basket from "./pages/Basket"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import PrivateRoute from "./HOC/PrivateRoute"
import ProductId from "./pages/ProductId"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}> 
        <Route path="/" element={<Menu />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:id" element={<ProductId />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default App    