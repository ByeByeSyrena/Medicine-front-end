import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
import css from "./Form.module.css";

interface TextAreaProps {
  label: string;
  name: string;
  type: string;
  labelClassName?: string | null;
  inputClassName?: string | null;
  wrapperClassName?: string | null;
}

const TextArea: React.FC<TextAreaProps> = ({
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
      <div className={css.scrollWrapper}>
        <Field
          as="textarea"
          id={name}
          name={name}
          type={type}
          className={`${css[inputClassName as string]}`}
        />
      </div>
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />
    </div>
  );
};

export default TextArea;
