import "./App.css";
import Header from "./components/Header";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillsPage from "./pages/BillsPage";
import CustomersPage from "./pages/CustomersPage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const location = useLocation();
  const hideHeader = ["/register", "/login"].includes(location.pathname);
  const isLoggedIn = sessionStorage.getItem("userToken");

  return (
    <>
      {!hideHeader && <Header />}
      <div className="3xl:w-2/3 mx-auto">
        <Routes>
          <Route
            path="/cart"
            element={isLoggedIn ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/bills"
            element={isLoggedIn ? <BillsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/customers"
            element={isLoggedIn ? <CustomersPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={isLoggedIn ? <ProductsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/statistics"
            element={isLoggedIn ? <StatisticPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
          />

          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
