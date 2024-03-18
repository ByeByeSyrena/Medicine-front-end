import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import {
  useDispatch,
  // useSelector
} from "react-redux";
// import {
//   selectIsUserLoggedIn,
//   selectUserAccessToken,
//   selectUserLoading,
// } from "../redux/auth/users/selectors";
import { AppDispatch } from "../redux/store";
import { refreshToken } from "../redux/auth/users/operations";

const PersistLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <>
      <Outlet />;
    </>
  );
};

export default PersistLogin;
