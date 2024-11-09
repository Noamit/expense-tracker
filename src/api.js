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

export async function update_password(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  passwordData
) {
  try {
    const response = await axios.put(BASE_URL + "/user", passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    if (response.status === 202) {
      return { updated: false, data: response.data.message };
    }
    return { updated: true, data: response.data };
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function update_settings(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  lang_id
) {
  try {
    const response = await axios.put(
      BASE_URL + "/settings",
      { lang_id: lang_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
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
    return {};
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
  navigate,
  filters = {}
) {
  try {
    const response = await axios.get(BASE_URL + "/expense", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filters,
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
    return { expenses: [], total_pages: 1 };
  }
}

export async function get_expenses_monthly_totals(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  months
) {
  try {
    const response = await axios.get(BASE_URL + "/monthly_totals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { months },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
    return [];
  }
}

export async function get_expenses_category_totals(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  months
) {
  try {
    const response = await axios.get(BASE_URL + "/category_totals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
    return [];
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
    return {};
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
    return [];
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

export async function get_langs(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  filters = {}
) {
  try {
    const response = await axios.get(BASE_URL + "/lang", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filters,
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
    return [];
  }
}

export async function insert_lang(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  name
) {
  const postRequest = { name: name };

  try {
    const response = await axios.post(BASE_URL + "/lang", postRequest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function delete_lang(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id
) {
  try {
    const response = await axios.delete(BASE_URL + "/lang/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function update_lang(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id,
  lang
) {
  try {
    const response = await axios.put(BASE_URL + "/lang/" + id, lang, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function insert_translate(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  translate
) {
  try {
    const response = await axios.post(BASE_URL + "/translate", translate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function get_translate(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id
) {
  try {
    const response = await axios.get(BASE_URL + "/translate/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
    return {};
  }
}

export async function update_translate(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id,
  translate
) {
  try {
    const response = await axios.put(BASE_URL + "/translate/" + id, translate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function get_translates(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  filters = {}
) {
  try {
    const response = await axios.get(BASE_URL + "/translate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filters,
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
    return [];
  }
}

export async function delete_translate(
  token,
  setAccessToken,
  setRefreshToken,
  navigate,
  id
) {
  try {
    const response = await axios.delete(BASE_URL + "/translate/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handle_auth_error(setAccessToken, setRefreshToken, navigate, error);
  }
}

export async function get_gd(filters = {}) {
  try {
    const response = await axios.get(BASE_URL + "/Gd", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    return { lang_id: 1, translations: [], langs: [] };
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
  }
}
