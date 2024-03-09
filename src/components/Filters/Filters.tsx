import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import data from "../../data/filterOptions.json";
import FormControl from "../FormControl/FormControl";

const radioOptions = data;

type valueTypes = {
  radioOption: string;
};

const initialValues: valueTypes = {
  radioOption: "",
};

const validationSchema = () =>
  Yup.object({
    radioOption: Yup.string().required("Please choose the filter"),
  });

const onSubmit = (values: valueTypes) => {
  console.log("radio", values);
};

const Filters: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormControl
          control="radio"
          label="Filters"
          name="radioOption"
          radioOptions={radioOptions}
          type="radio"
          labelClassName="radioLabel"
          inputClassName="radioInput"
          wrapperClassName="radioWrapper"
        />
        <button type="submit">Apply</button>
      </Form>
    </Formik>
  );
};

export default Filters;
