// In a file named 'pages.tsx'

// Import the components
import LoginPage from "./authUtilities/LoginPage/LoginPage";
import SignUpPage from "./authUtilities/SignUpPage/SignUpPage";
import EnterPage from "./EnterPage/EnterPage";
import ShopPage from "./userUtilities/ShopPage/ShopPage";
import ShoppingCartPage from "./userUtilities/ShoppingCartPage/ShoppingCartPage";
import SellerPage from "./sellerUtilities/Seller page/SellerPage";
import SellerOrdersPage from "./sellerUtilities/OrderPage/SellerOrdersPage";
// Re-export the components using object shorthand syntax
export {
  LoginPage,
  SignUpPage,
  EnterPage,
  ShopPage,
  ShoppingCartPage,
  SellerPage,
  SellerOrdersPage,
};
