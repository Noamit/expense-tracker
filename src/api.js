const BASE_URL = "http://localhost:5000";

export async function register() {
  let res = await fetch(`${BASE_URL}/register`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}
