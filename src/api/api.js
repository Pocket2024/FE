import axios from "axios";

const api = axios.create({
  baseURL: "http://3.37.150.125:8080",
});

export default api;
