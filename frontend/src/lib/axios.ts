import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mern-spotify-iota.vercel.app/api",
});
