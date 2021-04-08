export default function validateAddItem(values) {
  console.log("enter input word validation is running");
  console.log(values);
  let errors = {};
  if (!values.name) {
    errors.name = "Give it a name cmon";
  } else if (values.name.length > 10) {
    errors.name = "Too long make, it shorter (max 10 chars)";
  } else if (values.desc.length > 50) {
    errors.desc = "Too long make it shorter (max 50 chars)";
  } else if (!values.price) {
    errors.price = "It ain't free, give it a price";
  } else if (isNaN(values.price)) {
    errors.price = "Please enter number";
  } else if (parseInt(values.price) > 1000000) {
    errors.price = "Price too big";
  }
  return errors;
}
