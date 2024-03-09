import React from "react";
import { checkboxOption } from "./FormControl";
import css from "./Form.module.css";
import { ErrorMessage, Field, FieldProps } from "formik";
import TextError from "../TextError/TextError";

interface CheckboxProps {
  label: string;
  name: string;
  type: string;
  checkboxOptions?: checkboxOption[];
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const CheckboxGroup: React.FC<CheckboxProps> = ({
  label,
  name,
  checkboxOptions,
  type,
  wrapperClassName,
  labelClassName,
  inputClassName,
}) => {
  return (
    <div className={css["upperCheckboxWrapper"]}>
      <label htmlFor={name} className={css["labelMargin"]}>
        {label}
      </label>
      <Field name={name} className={`${css[wrapperClassName as string]}`}>
        {(fieldProps: FieldProps) => {
          const { field } = fieldProps;
          if (!checkboxOptions || checkboxOptions.length === 0) {
            return null;
          }
          return checkboxOptions.map((option) => {
            return (
              <div key={option.value}>
                <input
                  type={type}
                  id={option.value}
                  name={name}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                  onChange={field.onChange}
                  className={`${css[inputClassName as string]}`}
                />
                <label
                  htmlFor={option.value}
                  className={`${css[labelClassName as string]}`}
                >
                  {option.key}
                </label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />
    </div>
  );
};

export default CheckboxGroup;
