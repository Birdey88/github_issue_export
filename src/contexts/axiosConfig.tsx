import axios from "axios";
import * as authHelper from "../helpers/authHelper";

const token = authHelper.GetTokenFromStorage();

const instance = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `Bearer ${token}`,
    AccessControlAllowOrigin: "*"
  },
});

export default instance;
