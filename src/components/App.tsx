import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import SharedLayout from "./SharedLayout/SharedLayout";

import ShopPage from "../pages/ShopPage/ShopPage";
import ShoppingCartPage from "../pages/ShoppingCartPage/ShoppingCartPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="shop" />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
