import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, KEY_API } from "../../api/unplash.api";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};
