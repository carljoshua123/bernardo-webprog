import axios from "axios";

// Backend URL (environment variable)
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Axios instance
const API = axios.create({
  baseURL: `${API_BASE_URL}/api/users`,
  withCredentials: false, // no cookies required
});

// User endpoints
export const fetchUsers = () => API.get("/");
export const createUser = (user) => API.post("/", user);
export const updateUser = (id, user) => API.put(`/${id}`, user);
export const deleteUser = (id) => API.delete(`/${id}`);
export const loginUser = (credentials) => API.post("/login", credentials);

export default API;