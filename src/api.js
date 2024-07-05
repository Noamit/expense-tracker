import axios from "axios";
const BASE_URL = "http://localhost:5000";

export async function register(username, password) {
  const postRequest = { username: username, password: password };
  return await axios.post(BASE_URL + "/auth/register", postRequest);
}

export async function login(username, password) {
  const postRequest = { username: username, password: password };
  return await axios.post(BASE_URL + "/auth/login", postRequest);
}

export async function home(token) {
  const response = await axios.get(BASE_URL + "/home", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
