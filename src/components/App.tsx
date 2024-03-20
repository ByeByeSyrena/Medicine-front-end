import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import SharedLayout from "./SharedLayout/SharedLayout";

import ShopPage from "../pages/userUtilities/ShopPage/ShopPage";
import ShoppingCartPage from "../pages/userUtilities/ShoppingCartPage/ShoppingCartPage";
import SignUpPage from "../pages/authUtilities/SignUpPage/SignUpPage";
import LoginPage from "../pages/authUtilities/LoginPage/LoginPage";
import EnterPage from "../pages/EnterPage/EnterPage";
import SellerPage from "../pages/sellerUtilities/Seller page/SellerPage";
import SellerOrdersPage from "../pages/sellerUtilities/OrderPage/SellerOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { selectIsFetchingCurrentUser } from "../redux/auth/users/selectors";
import IsOnlyForUsers from "../HOCs/IsOnlyForUsers";
import { AppDispatch } from "../redux/store";
import { refreshToken } from "../redux/auth/users/operations";
import IsPublic from "../HOCs/IsPublic";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isFetchingCurrentUser = useSelector(selectIsFetchingCurrentUser);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  console.log("isFetchingCurrentUser:", isFetchingCurrentUser);

  return (
    <>
      {isFetchingCurrentUser ? (
        <p>Loading..</p>
      ) : (
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

            <Route path="seller-settings" element={<SellerPage />} />

            <Route path="seller-orders" element={<SellerOrdersPage />} />

            <Route path="shop" element={<ShopPage />} />

            <Route
              path="signup"
              element={<IsPublic children={<SignUpPage />} />}
            />

            <Route
              path="login"
              element={<IsPublic children={<LoginPage />} />}
            />

            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="enter" element={<EnterPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
