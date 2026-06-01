import axios from "axios";

const authApi = axios.create({
  baseURL: "https://school-connect-2.onrender.com/api"
});

export default authApi;