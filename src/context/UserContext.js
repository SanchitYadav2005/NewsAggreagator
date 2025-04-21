import { createContext, useReducer, useContext } from "react";
import axios from "axios";
import { userReducer } from "./userReducer";

const initialState = {
  user: null,
  bookmarks: [],
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      const { user, bookmarks } = response.data;

      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_BOOKMARKS", payload: bookmarks || [] });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const signupUser = async (email, password) => {
    try {
      const response = await axios.post("/api/signup", { email, password });
      const { user, bookmarks } = response.data;

      dispatch({ type: "SET_USER", payload: user });
      dispatch({ type: "SET_BOOKMARKS", payload: bookmarks || [] });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        bookmarks: state.bookmarks,
        dispatch,
        loginUser,
        signupUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
