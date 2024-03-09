import React from "react";
import data from "../../data/surveyOptions.json";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormControl from "../FormControl/FormControl";

const checkboxOptions = data;

type valueTypes = {
  checkboxOption: string[];
};

const initialValues: valueTypes = {
  checkboxOption: [],
};

const validationSchema = () =>
  Yup.object({
    checkboxOption: Yup.array().of(
      Yup.string().required("Please choose options")
    ),
  });

const onSubmit = (values: valueTypes) => {
  console.log("radio", values);
};

const Survey: React.FC = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <h1>Survey</h1>
        <FormControl
          control="checkbox"
          label="What do you use more?"
          name="checkboxOption"
          checkboxOptions={checkboxOptions}
          type="checkbox"
          labelClassName="checkboxLabel"
          inputClassName="checkboxInput"
          wrapperClassName="checkboxWrapper"
        />
        <button type="submit">Vote</button>
      </Form>
    </Formik>
  );
};

export default Survey;
