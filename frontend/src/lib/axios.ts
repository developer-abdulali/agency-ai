import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://spotifymernapp.netlify.app/api",
});
