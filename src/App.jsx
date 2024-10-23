import "./App.css";
import Navbar from "./Components/userPanelComponents/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Components/userPanelComponents/HomePage";
import AboutPage from "./Components/userPanelComponents/AboutPage";
import ContactPage from "./Components/userPanelComponents/ContactPage";
import Footer from "./Components/userPanelComponents/Footer";
import PrivacyPolicy from "./Components/userPanelComponents/PrivacyPolicy";
import DeliveryPolicy from "./Components/userPanelComponents/DeliveryPolicy";
import ScrollToTop from "./Components/userPanelComponents/ScrollToTop";
import CollectionPage from "./Components/userPanelComponents/CollectionPage";
import Login from "./Components/userPanelComponents/Login";
import SignUp from "./Components/userPanelComponents/SignUp";
import ForgotPassword from "./Components/userPanelComponents/ForgotPassword";
import ProductPage from "./Components/userPanelComponents/ProductPage";
import Cart from "./Components/userPanelComponents/Cart";
import Checkout from "./Components/userPanelComponents/Checkout";
import AdminPanelHomePage from "./Components/adminPanelComponents/AdminPanelHomePage";
import AddItems from "./Components/adminPanelComponents/AddItems";
import ListItems from "./Components/adminPanelComponents/ListItems";
import Orders from "./Components/adminPanelComponents/Orders";

function App() {
  const location = useLocation();

  // Check if the current path is any of the admin panel paths
  const isAdminRoute =
    location.pathname.startsWith("/adminPanelHomePage") ||
    location.pathname.startsWith("/add") ||
    location.pathname.startsWith("/list") ||
    location.pathname.startsWith("/orders");

  return (
    <>
      {/* Only show Navbar if it's not an admin route */}
      {!isAdminRoute && <Navbar />}

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/deliveryPolicy" element={<DeliveryPolicy />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path={`/product/:id`} element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/adminPanelHomePage/*" element={<AdminPanelHomePage />} />
        {/* <Route path="/adminPanelHomePage/add" element={<AddItems />} />
        <Route path="/adminPanelHomePage/list" element={<ListItems />} />
        <Route path="/adminPanelHomePage/orders" element={<Orders />} /> */}
      </Routes>

      {/* Only show Footer if it's not an admin route */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
