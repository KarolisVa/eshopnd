export default function validateLogin(values) {
  console.log("validation is running");
  let errors = {};
  //email errors
  if (!values.email) {
    //if is not empty
    errors.email = "Email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    //if is not valid
    errors.email = "Invalid email adresss.";
  }

  //password error
  if (!values.password) {
    //if is not empty
    errors.password = "password required";
  } else if (values.password.length < 6) {
    errors.password = "password must be at least 6 letters long";
  }

  if (!values.name) {
    errors.name = "name required";
  }

  return errors;
}
