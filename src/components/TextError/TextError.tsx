import React from "react";
import css from "./TextError.module.css";

type TextErrorProps = {
  children: React.ReactNode;
};

const TextError: React.FC<TextErrorProps> = (props) => {
  return <div className={css.error}>{props.children}</div>;
};

export default TextError;
