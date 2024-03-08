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
  wrapperClassName?: string | null;
}

const CheckboxGroup: React.FC<CheckboxProps> = ({
  label,
  name,
  checkboxOptions,
  type,
  wrapperClassName,
}) => {
  return (
    <div className={`${css[wrapperClassName as string]}`}>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {(fieldProps: FieldProps) => {
          const { field } = fieldProps;
          if (!checkboxOptions || checkboxOptions.length === 0) {
            return null;
          }
          return checkboxOptions.map((option) => {
            return (
              <React.Fragment key={option.value}>
                <input
                  type={type}
                  id={option.value}
                  name={name}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                  onChange={field.onChange}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
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
