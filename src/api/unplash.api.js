import axios from "axios";

export const API_URL = "https://api.unsplash.com";
export const KEY_API = "RDafqFTqmWiD0VDTA1G_VSOAie4-fy48O-FofEUv6Fs";

export const getFotosRequest = async () =>
  await axios.get(`${API_URL}/photos?per_page=20&client_id=${KEY_API}`);

export const getSearchRequest = async (query) =>
  await axios.get(
    `${API_URL}/search/photos?per_page=30&query=${query}&client_id=${KEY_API}`
  );
