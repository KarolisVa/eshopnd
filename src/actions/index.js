export const authUser = (user) => {
  return {
    type: "AUTH_USER",
    payload: user,
  };
};

export const DisAuthUser = (user) => {
  return {
    type: "DIS_AUTH_USER",
  };
};

export const getItems = (data) => {
  return {
    type: "GET_ITEMS",
    payload: data,
  };
};

export const addToCart = (data) => {
  return {
    type: "UPLOAD_DATA",
    payload: data,
  };
};
