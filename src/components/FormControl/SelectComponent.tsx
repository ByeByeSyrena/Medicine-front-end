import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import css from "./Form.module.css";
import { Option } from "./FormControl";

interface SelectProps {
  label: string;
  name: string;
  type: string;
  options?: Option[];
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
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </Field>
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />
    </div>
  );
};

export default SelectComponent;
