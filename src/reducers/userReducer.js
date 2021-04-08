const userReducer = (state = null, action) => {
  switch (action.type) {
    case "AUTH_USER":
      return action.payload;
    case "DIS_AUTH_USER":
      return null;
    default:
      return state;
  }
};

export default userReducer;
