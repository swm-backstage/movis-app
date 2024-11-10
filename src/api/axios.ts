import axios from "axios";
import { Platform } from "react-native";

const axiosHost = axios.create({
    baseURL: 'https://api.movis.klr.kr',
    withCredentials: true,
});

// const axiosHost = axios.create({
//     baseURL: 'http://172.18.3.211:8080',
//     withCredentials: true,
// });

// const axiosHost = axios.create({
//   baseURL: Platform.OS === 'android' 
//   ? 'http://10.0.2.2:8080' 
//   : 'http://localhost:8080',
//   withCredentials: true,
// });

// const axiosHost = axios.create({
//   baseURL: Platform.OS === 'android' 
//   ? 'http://10.0.2.2:8080/' 
//   : 'http://localhost:8080',
//   withCredentials: true,
// });

export default axiosHost;