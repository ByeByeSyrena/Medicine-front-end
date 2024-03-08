// FormControl.tsx
import React from "react";
import FieldArrayComponent from "./FieldArray";
import Input from "./Input";
import TextArea from "./TextArea";

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
  labelClassName?: string | null;
  inputClassName?: string | null;
  wrapperClassName?: string | null;
};

const FormControl: React.FC<Props> = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "fieldArray":
      return <FieldArrayComponent {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    // Add cases for other control types as needed
    default:
      return null;
  }
};

export default FormControl;
