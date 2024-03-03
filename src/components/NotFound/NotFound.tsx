import React from "react";
import css from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={css.container}>
      <div style={{ width: "600px", height: "400px", margin: "0 auto" }}>
        <h1 style={{ color: "white" }}>Not Found</h1>
        <img
          src={require("../../images/pills_PNG16500.png")}
          alt="Results weren't found, please try later"
        />
      </div>
    </div>
  );
};

export default NotFound;
