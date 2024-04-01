import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { NotFound, SharedLayout } from "./components";

import {
  LoginPage,
  SignUpPage,
  EnterPage,
  ShopPage,
  ShoppingCartPage,
  SellerPage,
  SellerOrdersPage,
  SettingsPage,
} from "../pages/pages";

import {
  IsOnlyForUsers,
  IsPublic,
  IsOnlyForSellers,
  IsOnlyForAdminsAndModerators,
} from "../HOCs/hoc";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="enter" />} />

        <Route
          path="cart"
          element={
            <IsOnlyForUsers
              allowedRoles={["2021"]}
              children={<ShoppingCartPage />}
            />
          }
        />
        <Route
          path="user-settings/:id"
          element={
            <IsOnlyForUsers
              allowedRoles={["2021"]}
              children={<SettingsPage />}
            />
          }
        />

        <Route
          path="seller-settings/:id"
          element={
            <IsOnlyForSellers
              allowedRoles={["2024"]}
              children={<SellerPage />}
            />
          }
        />

        <Route
          path="seller-orders"
          element={
            <IsOnlyForAdminsAndModerators
              allowedRoles={["2024", "2023"]}
              children={<SellerPage />}
            />
          }
        />

        <Route path="seller-orders" element={<SellerOrdersPage />} />

        <Route path="shop" element={<ShopPage />} />

        <Route path="signup" element={<IsPublic children={<SignUpPage />} />} />

        <Route path="login" element={<IsPublic children={<LoginPage />} />} />

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="enter" element={<EnterPage />} />
    </Routes>
  );
};

export default App;
