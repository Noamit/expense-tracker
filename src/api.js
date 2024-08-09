import axios from "axios";
const BASE_URL = "http://localhost:5000";

export async function register(username, password) {
  const postRequest = { username: username, password: password };
  return await axios.post(BASE_URL + "/register", postRequest);
}

export async function login(username, password) {
  const postRequest = { username: username, password: password };
  return await axios.post(BASE_URL + "/login", postRequest);
}

export async function home(token) {
  const response = await axios.get(BASE_URL + "/home", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function insert_expense(token, name, amount, date) {
  const postRequest = { name: name, amount: amount, date: date };
  console.log(date);
  const response = await axios.post(BASE_URL + "/expense", postRequest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function get_expenses(token) {
  const response = await axios.get(BASE_URL + "/expense", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function delete_expenses(token, id) {
  const response = await axios.delete(BASE_URL + "/expense/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
