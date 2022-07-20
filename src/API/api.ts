import axios from "axios";
const API_URl = 'https://turbohiring.dotcode.pp.ua/api';

const axiosInstance = axios.create({baseURL:API_URl, headers: {
    'Content-Type': 'application/json'
  }});

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response.data)
  );



export {axiosInstance};
