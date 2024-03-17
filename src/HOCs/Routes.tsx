import { useSelector } from "react-redux";
import {
  selectUserAccessToken,
  selectUserError,
} from "../redux/auth/users/selectors";
import { Navigate } from "react-router-dom";

type RoutePublicType = {
  children: React.ReactNode;
};

type RouteType = {
  children: React.ReactNode;
  restricted?: boolean;
};

export const PrivateUserRoute: React.FC<RoutePublicType> = ({ children }) => {
  const token = useSelector(selectUserAccessToken);

  return token ? <>{children}</> : <Navigate to="/login" />;
};

export const PublicRoute: React.FC<RouteType> = ({
  children,
  restricted = false,
}) => {
  const token = useSelector(selectUserAccessToken);
  const shouldRedirect = token && restricted;

  return shouldRedirect ? <Navigate to="/shop" /> : <>{children}</>;
};
