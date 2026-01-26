import axios from "axios"; // Permet d'effectuer des requêtes HTTP //

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http//localhost:3000",
  withCredentials: true, // Ce qui permet d'envoyer et recevoir les cookies //
});

export default api;
