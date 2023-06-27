export const setSelected = (select, dispatch) => {
  dispatch({
    type: "SELECTING",
    select,
  });
};

export const changeSize = (size, dispatch) => {
  dispatch({
    type: "SET_SELECTING_SIZE",
    size,
  });
};
