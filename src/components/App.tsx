import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "../pages/pages";

import { IsOnlyForUsers, IsPublic } from "../HOCs/hoc";

import { selectIsFetchingCurrentUser } from "../redux/auth/users/selectors";
import { AppDispatch } from "../redux/store";
import { refreshUserTokens } from "../redux/auth/users/operations";
import SettingsPage from "../pages/userUtilities/SettingsPage/SettingsPage";
import { refreshPharmTokens } from "../redux/auth/pharmacies/operations";
import { selectIsFetchingCurrentPharmacy } from "../redux/auth/pharmacies/selectors";
import IsOnlyForSellers from "../HOCs/IsOnlyForSellers";
import IsOnlyForAdminsAndModerators from "../HOCs/IsOnlyForAdminsAndModerators";

const App: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const isFetchingCurrentUser = useSelector(selectIsFetchingCurrentUser);
  // const isFetchingCurrentPharmacy = useSelector(
  //   selectIsFetchingCurrentPharmacy
  // );

  // useEffect(() => {
  //   dispatch(refreshUserTokens());
  //   dispatch(refreshPharmTokens());
  // }, [dispatch]);

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

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, Route, Routes } from "react-router-dom";

// import { NotFound, SharedLayout } from "./components";

// import {
//   LoginPage,
//   SignUpPage,
//   EnterPage,
//   ShopPage,
//   ShoppingCartPage,
//   SellerPage,
//   SellerOrdersPage,
// } from "../pages/pages";

// import { IsOnlyForUsers, IsPublic } from "../HOCs/hoc";

// import { selectIsFetchingCurrentUser } from "../redux/auth/users/selectors";
// import { AppDispatch } from "../redux/store";
// import { refreshUserTokens } from "../redux/auth/users/operations";
// import SettingsPage from "../pages/userUtilities/SettingsPage/SettingsPage";
// import { refreshPharmTokens } from "../redux/auth/pharmacies/operations";
// import { selectIsFetchingCurrentPharmacy } from "../redux/auth/pharmacies/selectors";
// import IsOnlyForSellers from "../HOCs/IsOnlyForSellers";
// import IsOnlyForAdminsAndModerators from "../HOCs/IsOnlyForAdminsAndModerators";

// const App: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const isFetchingCurrentUser = useSelector(selectIsFetchingCurrentUser);
//   const isFetchingCurrentPharmacy = useSelector(
//     selectIsFetchingCurrentPharmacy
//   );

//   useEffect(() => {
//     dispatch(refreshUserTokens());
//     dispatch(refreshPharmTokens());
//   }, [dispatch]);

//   return (
//     <>
//       {isFetchingCurrentUser ? (
//         <p>Loading..</p>
//       ) : (
//         <Routes>
//           <Route path="/" element={<SharedLayout />}>
//             <Route index element={<Navigate to="enter" />} />

//             <Route
//               path="cart"
//               element={
//                 <IsOnlyForUsers
//                   allowedRoles={["2021"]}
//                   children={<ShoppingCartPage />}
//                 />
//               }
//             />
//             <Route
//               path="user-settings/:id"
//               element={
//                 <IsOnlyForUsers
//                   allowedRoles={["2021"]}
//                   children={<SettingsPage />}
//                 />
//               }
//             />

//             <Route
//               path="seller-settings/:id"
//               element={
//                 <IsOnlyForSellers
//                   allowedRoles={["2024"]}
//                   children={<SellerPage />}
//                 />
//               }
//             />

//             <Route
//               path="seller-orders"
//               element={
//                 <IsOnlyForAdminsAndModerators
//                   allowedRoles={["2024", "2023"]}
//                   children={<SellerPage />}
//                 />
//               }
//             />

//             <Route path="seller-orders" element={<SellerOrdersPage />} />

//             <Route path="shop" element={<ShopPage />} />

//             <Route
//               path="signup"
//               element={<IsPublic children={<SignUpPage />} />}
//             />

//             <Route
//               path="login"
//               element={<IsPublic children={<LoginPage />} />}
//             />

//             <Route path="*" element={<NotFound />} />
//           </Route>
//           <Route path="enter" element={<EnterPage />} />
//         </Routes>
//       )}
//     </>
//   );
// };

// export default App;
