import { useState, useEffect } from "react";

function useFormValidation(initialState, validate, authenticate) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log("Authenticated", values);
        authenticate();
        setIsSubmitting(false);
      } else {
        console.log("erros: ", errors);
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  return { handleSubmit, values, handleChange, errors, isSubmitting };
}

export default useFormValidation;
