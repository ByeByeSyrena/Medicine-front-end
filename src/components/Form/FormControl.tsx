// FormControl.tsx
import React from "react";
import Input from "./Input";

type Control = "input" | "textarea" | "select" | "radio" | "checkbox" | "date";

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

    // Add cases for other control types as needed
    default:
      return null;
  }
};

export default FormControl;
