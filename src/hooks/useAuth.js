import { useUserContext } from "../context/UserContext";

const useAuth = () => {
  const { state, dispatch } = useUserContext();

  const login = (userData) => {
    dispatch({ type: "SET_USER", payload: userData });
  };

  const signup = (userData) => {
    dispatch({ type: "SET_USER", payload: userData });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT_USER" });
  };

  const addBookmark = (newsItem) => {
    dispatch({ type: "ADD_BOOKMARK", payload: newsItem });
  };

  const removeBookmark = (newsId) => {
    dispatch({ type: "REMOVE_BOOKMARK", payload: newsId });
  };

  const setBookmarks = (bookmarks) => {
    dispatch({ type: "SET_BOOKMARKS", payload: bookmarks });
  };

  return {
    user: state.user,
    bookmarks: state.bookmarks,
    login,
    signup,
    logout,
    addBookmark,
    removeBookmark,
    setBookmarks,
  };
};

export default useAuth;
