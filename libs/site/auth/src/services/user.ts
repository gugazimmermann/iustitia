import axios from "axios";
import header from "./header";

const API_URL = `${process.env.NX_APP_API}:${process.env.NX_API_PORT}/auth`;

export async function getCurrentUser() {
  return await axios.get(API_URL + "/me", { headers: header() });
};

