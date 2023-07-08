import axios from "axios";

const instance = axios.create({
  baseURL: "https://personal-finane-mabdalbaqi.onrender.com",
});

export default instance;
