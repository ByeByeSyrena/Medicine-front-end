import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import css from "./Form.module.css";

interface SelectProps {
  label: string;
  name: string;
  type: string;
  options?: string[];
  labelClassName?: string | null;
  inputClassName?: string | null;
  wrapperClassName?: string | null;
}

const SelectComponent: React.FC<SelectProps> = ({
  label,
  options,
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
        as="select"
        id={name}
        name={name}
        type={type}
        className={`${css[inputClassName as string]}`}
      >
        {options && (options as string[]).map((option, index) => {})}
      </Field>
    </div>
  );
};

export default SelectComponent;
