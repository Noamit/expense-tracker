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

export async function insert_expense(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  formData
) {
  try {
    const response = await axios.post(BASE_URL + "/expense", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Ensure the content type is set for file upload
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function get_expense(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id
) {
  try {
    const response = await axios.get(BASE_URL + "/expense/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function update_expense(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id,
  formData
) {
  try {
    const response = await axios.put(BASE_URL + "/expense/" + id, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Ensure the content type is set for file upload
      },
    });

    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function get_expenses(
  token,
  setAccessToken,
  setRefreshToken,
  navigate
) {
  try {
    const response = await axios.get(BASE_URL + "/expense", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function delete_expenses(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id
) {
  try {
    const response = await axios.delete(BASE_URL + "/expense/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function get_category(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id
) {
  try {
    const response = await axios.get(BASE_URL + "/category/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function insert_category(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  name,
  description
) {
  const postRequest = { name: name, description: description };

  try {
    const response = await axios.post(BASE_URL + "/category", postRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function get_categories(
  token,
  setAccessToken,
  setRefreshToken,
  navigate
) {
  try {
    const response = await axios.get(BASE_URL + "/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function delete_category(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id
) {
  try {
    const response = await axios.delete(BASE_URL + "/category/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function update_category(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id,
  category
) {
  try {
    const response = await axios.put(BASE_URL + "/category/" + id, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

function handle_auth_error(setAccessToken, setRefreshToken, navigate, error) {
  if (error.response && error.response.status === 401) {
    // Token is expired or invalid
    localStorage.clear(); // Clear local storage
    setAccessToken(""); // Clear access token in state
    setRefreshToken(""); // Clear refresh token in state
    navigate("/"); // Redirect to the login page
  } else {
    console.error("An error occurred:", error);
    throw error; // Optionally rethrow the error if it's something else
  }
}
