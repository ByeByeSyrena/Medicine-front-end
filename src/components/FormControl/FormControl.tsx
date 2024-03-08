import React from "react";
import FieldArrayComponent from "./FieldArray";
import Input from "./Input";
import RadioButtons from "./RadioButtons";
import SelectComponent from "./SelectComponent";
import TextArea from "./TextArea";

export interface Option {
  value: string;
  label: string;
  key: string;
}

export interface radioOption {
  value: string;
  key: string;
}

type Control =
  | "input"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "fieldArray";

type Props = {
  control: Control;
  label: string;
  name: string;
  type: string;
  options?: Option[];
  labelClassName?: string | null;
  inputClassName?: string | null;
  wrapperClassName?: string | null;
  radioOptions?: radioOption[];
};

const FormControl: React.FC<Props> = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "fieldArray":
      return <FieldArrayComponent {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <SelectComponent {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    default:
      return null;
  }
};

export default FormControl;
