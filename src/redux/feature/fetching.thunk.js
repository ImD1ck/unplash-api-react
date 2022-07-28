import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, KEY_API } from "../../api/unplash.api";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(
    `${API_URL}/photos?per_page=20&client_id=${KEY_API}`
  );
  return response;
});
