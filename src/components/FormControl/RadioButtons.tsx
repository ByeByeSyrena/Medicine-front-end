import React from "react";
import css from "./Form.module.css";
import { Field, ErrorMessage, FieldProps } from "formik";
import TextError from "../TextError/TextError";
import { radioOption } from "./FormControl";

interface RadioProps {
  label: string;
  name: string;
  type: string;
  radioOptions?: radioOption[];
  wrapperClassName?: string | null;
}

const RadioButtons: React.FC<RadioProps> = ({
  label,
  name,
  radioOptions,
  type,
  wrapperClassName,
}) => {
  return (
    <div className={`${css[wrapperClassName as string]}`}>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {(fieldProps: FieldProps) => {
          const { field } = fieldProps;
          if (!radioOptions || radioOptions.length === 0) {
            return null;
          }
          return radioOptions.map((option) => {
            return (
              <React.Fragment key={option.value}>
                <input
                  type={type}
                  id={option.value}
                  name={name}
                  value={option.value}
                  checked={field.value === option.value}
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

export default RadioButtons;
