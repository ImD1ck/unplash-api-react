import axios from "axios";

export const API_URL = "https://api.unsplash.com/";
export const KEY_API = "RDafqFTqmWiD0VDTA1G_VSOAie4-fy48O-FofEUv6Fs";

export const getFotosRequest = async (query = "") => {
  let url = "photos?per_page=30&client_id=";
  if (query.length === 0) {
    const response = await axios.get(`${API_URL}${url}${KEY_API}`);
    return response.data;
  }
  url = "search/photos?per_page=30&query=";
  const response = await axios.get(
    `${API_URL}${url}${query}&client_id=${KEY_API}`
  );
  return response.data.results;
};
