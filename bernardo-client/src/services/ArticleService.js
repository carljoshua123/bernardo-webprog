import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://bernardo-server.vercel.app";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/articles`,
});

export const fetchArticles = () => API.get("/");
export const createArticle = (article) => API.post("/", article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const deleteArticle = (id) => API.delete(`/${id}`);

export default API;