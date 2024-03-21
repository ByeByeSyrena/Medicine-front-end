import React from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "../Header/Header";
// import { Loader } from "../Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify.css";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Suspense
        fallback={
          <div>
            <p>Is loading...</p>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
