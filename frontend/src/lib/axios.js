import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // http://192.168.1.53:8080
  headers: {
    "Content-Type": "application/json",
  },
   withCredentials: true, // Allow cookies to be sent
});

export default axiosInstance;
