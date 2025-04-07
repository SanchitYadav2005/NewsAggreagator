export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "LOGOUT_USER":
      return { ...state, user: null, bookmarks: [] };

    case "ADD_BOOKMARK":
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };

    case "REMOVE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((b) => b._id !== action.payload),
      };

    case "SET_BOOKMARKS":
      return { ...state, bookmarks: action.payload };

    default:
      return state;
  }
};
