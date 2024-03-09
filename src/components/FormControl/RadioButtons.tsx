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
  labelClassName?: string;
  inputClassName?: string;
}

const RadioButtons: React.FC<RadioProps> = ({
  label,
  name,
  radioOptions,
  type,
  wrapperClassName,
  labelClassName,
  inputClassName,
}) => {
  return (
    <div className={`${css[wrapperClassName as string]}`}>
      <h1>{label}</h1>
      <div className={css["fieldRadioClass"]}>
        <Field name={name}>
          {(fieldProps: FieldProps) => {
            const { field } = fieldProps;
            if (!radioOptions || radioOptions.length === 0) {
              return null;
            }
            return radioOptions.map((option) => {
              return (
                <div key={option.value}>
                  <input
                    type={type}
                    id={option.value}
                    name={name}
                    value={option.value}
                    checked={field.value === option.value}
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
      </div>
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />
    </div>
  );
};

export default RadioButtons;
