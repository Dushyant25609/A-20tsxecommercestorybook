import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import PageNotFound from "./Components/PageNotFound";

import { useLocation } from "react-router-dom";
import CartList from "./Components/CartList";
import LoginPage from "./Components/LoginPage";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";

import AuthRoute from "./Components/AuthRoute";
import Alert from "./Components/Alert/Alert";
import AlertProvider from "./Providers/AlertProvider";

import UserProvider from "./Providers/UserProvider";
import CartProvider from "./Providers/CartProvider";

function App() {


  const location = useLocation();
  const showNavbarFooter =
    location.pathname !== "/login" && location.pathname !== "/signUp";
  
  
  return (
    <>
      <div className="h-screen overflow-scroll    flex flex-col ">
        <UserProvider>
          <CartProvider>
          <AlertProvider>
            {showNavbarFooter && <Navbar/>}
            <Alert></Alert>
            <Routes>
              <Route path="/" element={<ProductList/>}></Route>
              <Route
                path="/ProductDetail/:id"
                element={<ProductDetail />}
              ></Route>
              <Route
                path="/cart"
                element={
                  <CartList   />
                }
              ></Route>

             
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    <LoginPage />{" "}
                  </AuthRoute>
                }
              ></Route>
              <Route
                path="/signUp"
                element={
                  <AuthRoute>
                    <SignUp />{" "}
                  </AuthRoute>
                }
              ></Route>
              <Route
                path="/ForgotPassword"
                element={<ForgotPassword />}
              ></Route>
             
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </AlertProvider>
          </CartProvider>
          </UserProvider>
        {showNavbarFooter && <Footer />}
      </div>
    </>
  );
}

export default App;
