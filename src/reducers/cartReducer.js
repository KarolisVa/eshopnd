const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "UPLOAD_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
