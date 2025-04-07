import { createContext, useReducer, useContext } from "react";
import { userReducer } from "./userReducer";

const initialState = {
  user: null,
  bookmarks: [],
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier usage
export const useUserContext = () => useContext(UserContext);
