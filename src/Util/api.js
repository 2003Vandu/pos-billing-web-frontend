import axios from "axios";

// Centralized Axios instance for your Render backend
const api = axios.create({
    baseURL: "https://ecom-7gon.onrender.com/api/v1.0",
});

// Automatically attach the Authorization header if a token exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;