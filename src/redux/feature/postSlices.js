import { createSlice } from "@reduxjs/toolkit";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFotos: (state, action) => {
      state.posts = action.payload;
    },
    favorite: (state, action) => {
      state.posts.splice(action.payload, 1, {
        ...state.posts[action.payload],
        fav: true,
      });
    },
  },
});

export const { setFotos, favorite } = postSlice.actions;

export default postSlice.reducer;
