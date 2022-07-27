import axios from "axios";

// 쿠키 허용
axios.defaults.withCredentials = true;

const customAxios = axios.create({
  //   baseURL:
  //     "http://a1eee0639847a49a980fdc126dd70a9b-1394049333.ap-northeast-2.elb.amazonaws.com:8000",
  //   baseURL: "http://localhost:8000",
  baseURL:
    "http://a1eee0639847a49a980fdc126dd70a9b-1394049333.ap-northeast-2.elb.amazonaws.com:8000",
    // "http://43.200.122.174:8000",
  // "http://a1eee0639847a49a980fdc126dd70a9b-1394049333.ap-northeast-2.elb.amazonaws.com:8000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8;",
    // Cache: "no-cache",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers": "*",
    // "Access-Control-Allow-Credentials": "true",
    // withCredentials: true,
  },
  //   credentials: "same-origin",
  //   mode: "same-origin",
  //   withCredentials: true,
});

export default customAxios;

//https://cors-anywhere.herokuapp.com/
