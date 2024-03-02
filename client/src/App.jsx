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

function App() {
  const location = useLocation();
  const hideHeader = ["/register", "/login"].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <div className="3xl:w-2/3 mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/statistics" element={<StatisticPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
