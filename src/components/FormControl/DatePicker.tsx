import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage, FieldProps } from "formik";
import TextError from "../TextError/TextError";
import css from "./Form.module.css";

interface pickerProps {
  label: string;
  name: string;
  type: string;
  labelClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}

const DatePicker: React.FC<pickerProps> = ({
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
      <Field name={name}>
        {({ form, field }: FieldProps) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage
        name={name}
        component={TextError as React.ComponentType<{}>}
      />
    </div>
  );
};

export default DatePicker;
