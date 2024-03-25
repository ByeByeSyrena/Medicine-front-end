import React from "react";
import css from "./SettingsPage.module.module.css";

const SettingsPage = () => {
  return (
    <section className={css.container}>
      <h1>User Settings</h1>
      <button>Delete User</button>
    </section>
  );
};

export default SettingsPage;
