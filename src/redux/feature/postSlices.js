import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFotosRequest } from "../../api/unplash.api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", getFotosRequest);

const initialState = {
  posts: [],
  favorites: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createFavorite: (state, action) => {
      const { fotoObj, index } = action.payload;
      state.favorites.push(fotoObj);
      state.posts.splice(index, 1, {
        ...state.posts[index],
        fav: true,
      });
    },
    deleteFavorite: (state, action) => {
      const id = state.posts[action.payload].id;
      state.favorites = state.favorites.filter((fav) => fav.id !== id);
      state.posts[action.payload].fav = false;
    },
    getFavorite: (state) => {
      const data = localStorage.getItem("fav");
      state.favorites = !data ? [] : JSON.parse(data);
    },
    delFavMyPhotos: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      const idFav = state.favorites.map((fav) => fav.id);
      state.posts = action.payload.map((post) =>
        idFav.includes(post.id) ? { ...post, fav: true } : post
      );
    });
  },
});

export const { createFavorite, deleteFavorite, getFavorite, delFavMyPhotos } =
  postSlice.actions;

export default postSlice.reducer;
