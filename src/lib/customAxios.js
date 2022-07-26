import axios from "axios";

// 쿠키 허용
axios.defaults.withCredentials = true;

const customAxios = axios.create({
  baseURL: "http://43.200.122.174:8000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8;",
  },
});

export default customAxios;
