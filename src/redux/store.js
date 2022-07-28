import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./feature/postSlices";

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
