import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://bernardo-server.vercel.app";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/users`,
});

export const fetchUsers = () => API.get("/");
export const createUser = (user) => API.post("/", user);
export const updateUser = (id, user) => API.put(`/${id}`, user);
export const deleteUser = (id) => API.delete(`/${id}`);
export const loginUser = (credentials) => API.post("/login", credentials);

export default API;