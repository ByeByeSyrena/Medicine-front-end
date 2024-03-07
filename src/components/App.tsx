import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import SharedLayout from "./SharedLayout/SharedLayout";

import ShopPage from "../pages/userUtilities/ShopPage/ShopPage";
import ShoppingCartPage from "../pages/userUtilities/ShoppingCartPage/ShoppingCartPage";
import SignUpPage from "../pages/authUtilities/SignUpPage/SignUpPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="shop" />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};

export default App;
