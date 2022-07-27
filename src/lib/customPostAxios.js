import axios from "axios";

const customPostAxios = axios.create({
  //   baseURL:
  //     "http://a1eee0639847a49a980fdc126dd70a9b-1394049333.ap-northeast-2.elb.amazonaws.com:8000",
  //   baseURL: "http://localhost:8000",
  baseURL:
    // "http://a1eee0639847a49a980fdc126dd70a9b-1394049333.ap-northeast-2.elb.amazonaws.com:8000",
  "http://a1eee0639847a49a980fdc126dd70a9b-1394049333.ap-northeast-2.elb.amazonaws.com:8000",
  // "http://43.200.122.174:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default customPostAxios;
