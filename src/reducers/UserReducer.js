const INITIAL_STATE = {
  id: "",
  conversas: [],
  contatos: [],
  activeChat: "",
  mensagens: [],
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ID":
      return {
        ...state,
        id: action.id,
      };
    case "SET_CHATS":
      return {
        ...state,
        conversas: action.chats,
      };
    case "SET_CONTACTS":
      return {
        ...state,
        contatos: action.contatos,
      };
    case "SET_MESSAGES":
      return {
        ...state,
        mensagens: action.mensagens,
      };
    default:
      return state;
  }
};

export default UserReducer;
