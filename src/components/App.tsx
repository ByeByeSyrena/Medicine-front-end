import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import SharedLayout from "./SharedLayout/SharedLayout";

import ShopPage from "../pages/userUtilities/ShopPage/ShopPage";
import ShoppingCartPage from "../pages/userUtilities/ShoppingCartPage/ShoppingCartPage";
import SignUpPage from "../pages/authUtilities/SignUpPage/SignUpPage";
import LoginPage from "../pages/authUtilities/LoginPage/LoginPage";
import EnterPage from "../pages/EnterPage/EnterPage";
// import { PublicRoute, PrivateUserRoute } from "../HOCs/Routes";
import SellerPage from "../pages/sellerUtilities/Seller page/SellerPage";
import SellerOrdersPage from "../pages/sellerUtilities/OrderPage/SellerOrdersPage";
import RequireAuth from "../HOCs/RequireAuth";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../redux/auth/users/selectors";

const App: React.FC = () => {
  const isLoggedIn = useSelector(selectIsUserLoggedIn);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Navigate to="enter" />} />

          <Route element={<RequireAuth allowedRoles={["2021"]} />}>
            <Route path="cart" element={<ShoppingCartPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["2024"]} />}>
            <Route path="seller-settings" element={<SellerPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["2024", "2023"]} />}>
            <Route path="seller-orders" element={<SellerOrdersPage />} />
          </Route>

          <Route path="shop" element={<ShopPage />} />

          <Route path="signup" element={<SignUpPage />} />

          <Route
            path="login"
            element={isLoggedIn ? <Navigate to="/shop" /> : <LoginPage />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="enter" element={<EnterPage />} />
      </Routes>
    </>
  );
};

export default App;
