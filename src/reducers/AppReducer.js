const INITIAL_STATE = {
  selecting: false,
  selectingSize: 0,
};

const AppReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SELECTING":
      return {
        ...state,
        selecting: action.select,
      };
    case "SET_SELECTING_SIZE":
      return {
        ...state,
        selectingSize: action.size,
      };

    default:
      return state;
  }
};

export default AppReducer;
