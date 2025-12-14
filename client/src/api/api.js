// import axios from 'axios';
// const api = axios.create({ baseURL: 'process.env.REACT_APP_API_URL || https:smart-city-solutions-backend.onrender.com/api', });

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;


//for deployment the changes
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://smart-city-solutions-backend.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
