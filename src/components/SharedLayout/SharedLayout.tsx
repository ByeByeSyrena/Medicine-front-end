import React from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "../Header/Header";
// import { Loader } from "../Loader/Loader";

const SharedLayout = () => {
  return (
    <div>
      <Header />
      <Suspense
        fallback={
          <div>
            <p>Is loading...</p>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default SharedLayout;
