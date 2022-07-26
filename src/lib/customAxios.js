import axios from "axios";

// 쿠키 허용
axios.defaults.withCredentials = true;

const customAxios = axios.create({
  baseURL:
    "http://a1eee0639847a49a980fdc126dd70a9b-1394049333.ap-northeast-2.elb.amazonaws.com:8000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8;",
  },
});

export default customAxios;
