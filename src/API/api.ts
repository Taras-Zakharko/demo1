import axios from "axios";
import { getAuth } from "../app/modules/auth";
const API_URl = 'https://turbohiring.dotcode.pp.ua/api';
// let jsonToken = getAuth();



const axiosInstance = axios.create({baseURL:API_URl, headers: {
    'Content-Type': 'application/json',
    // 'Authorization':`Bearer ${(jsonToken)&&jsonToken!.access_token}`
  }});

  axiosInstance.interceptors.response.use(
    (response: any) => response.data,
    (error: any) => Promise.reject(error.response.data)
  );

  axiosInstance.interceptors.request.use((req) => {
      req.headers.Authorization = `Bearer ${getAuth()?.access_token}`;
      return req;
    }
  )


export {axiosInstance};
