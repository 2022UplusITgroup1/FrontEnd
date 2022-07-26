import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://43.200.122.174:8000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8;",
  },
});

export default customAxios;
