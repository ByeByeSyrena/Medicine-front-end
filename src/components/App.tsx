import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import SharedLayout from "./SharedLayout/SharedLayout";

import ShopPage from "../pages/userUtilities/ShopPage/ShopPage";
import ShoppingCartPage from "../pages/userUtilities/ShoppingCartPage/ShoppingCartPage";
import SignUpPage from "../pages/authUtilities/SignUpPage/SignUpPage";
import LoginPage from "../pages/authUtilities/LoginPage/LoginPage";
import EnterPage from "../pages/EnterPage/EnterPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="enter" />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="enter" element={<EnterPage />} />
    </Routes>
  );
};

export default App;
