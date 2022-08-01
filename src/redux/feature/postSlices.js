import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFotosRequest } from "../../api/unplash.api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", getFotosRequest);

const initialState = {
  posts: [],
  favorites: [],
  currentFav: {},
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
    getFavorites: (state) => {
      const data = localStorage.getItem("fav");
      state.favorites = !data ? [] : JSON.parse(data);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    delFavMyPhotos: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
    },
    currentFav: (state, action) => {
      state.currentFav = state.favorites[action.payload];
    },
    setDescription: (state, action) => {
      const newArr = state.favorites.map((fav) =>
        fav.id === state.currentFav.id
          ? { ...fav, description: action.payload }
          : fav
      );
      console.log(newArr);
      localStorage.setItem("fav", JSON.stringify(newArr));
      state.favorites = newArr;
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

export const {
  createFavorite,
  deleteFavorite,
  getFavorites,
  setFavorites,
  currentFav,
  delFavMyPhotos,
  filterFav,
  setDescription,
} = postSlice.actions;

export default postSlice.reducer;
