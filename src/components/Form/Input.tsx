import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import css from "./Form.module.css";

interface InputProps {
  label: string;
  name: string;
  type: string;
  labelClassName?: string | null;
  inputClassName?: string | null;
  wrapperClassName?: string | null;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  labelClassName,
  inputClassName,
  wrapperClassName,
}) => {
  return (
    <div className={`${css[wrapperClassName as string]}`}>
      <label htmlFor={name} className={`${css[labelClassName as string]}`}>
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        className={`${css[inputClassName as string]}`}
      />
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />
    </div>
  );
};

export default Input;
