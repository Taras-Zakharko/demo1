import axios from "axios";
const API_URl = 'https://turbohiring.dotcode.pp.ua/api';
let tokenStr = localStorage?.getItem('kt-auth-react-v');
let jsonToken = JSON.parse(tokenStr ? tokenStr : '{}')


const axiosInstance = axios.create({baseURL:API_URl, headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${jsonToken.access_token}`
  }});

  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response.data)
  );



export {axiosInstance};
