import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/articles",
});

export const fetchArticles = () => API.get("/");
export const createArticle = (article) => API.post("/", article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const deleteArticle = (id) => API.delete(`/${id}`);

export default API;
