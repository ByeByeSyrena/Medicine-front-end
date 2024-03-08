import React from "react";
import { FieldArray, ErrorMessage, Field } from "formik";
import css from "./Form.module.css";
import classNames from "classnames";
import TextError from "../TextError/TextError";

interface FieldArrayProps {
  label: string;
  name: string;
  type: string;
  labelClassName?: string | null;
  wrapperClassName?: string | null;
}

const FieldArrayComponent: React.FC<FieldArrayProps> = ({
  label,
  name,
  type,
  labelClassName,
  wrapperClassName,
}) => {
  return (
    <div className={`${css[wrapperClassName as string]}`}>
      <label htmlFor={name} className={`${css[labelClassName as string]}`}>
        {label}
      </label>
      <FieldArray name={name}>
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values, errors } = form;
          const arrayToRender = values[name] || [];

          return (
            <div>
              {arrayToRender.map((item: string, index: number) => (
                <div key={index}>
                  <Field
                    type={type}
                    name={`pnNumbers[${index}]`}
                    className={classNames(css["dark-input"])}
                  />
                  {errors && Array.isArray(errors.pnNumbers) && (
                    <ErrorMessage
                      name={`pnNumbers[${index}]`}
                      component={TextError as React.ComponentType<{}>}
                    />
                  )}
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Delete
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      push("");
                    }}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default FieldArrayComponent;
