import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export const baseURL = REACT_APP_API_URL || "http://localhost:8000";

const api = () => axios.create({ baseURL });

export default api;
