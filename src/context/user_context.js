import { createContext, useReducer } from 'react';

export const userContext = createContext();

const initialState = {
  info: {},
  isLoggedIn: false,
  token: ''
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        info: action.payload.info,
        token: action.payload.token,
        isLoggedIn: true
      };

    case 'logout':
      return {
        ...state,
        info: {},
        token: '',
        isLoggedIn: false
      };

    default:
      throw new Error('action cannot be handled');
  }
};

export const UserContextProvider = (props) => {
  const [state, disptch] = useReducer(userReducer, initialState);

  return <userContext.Provider value={{ state, disptch }}>{props.children}</userContext.Provider>;
};
