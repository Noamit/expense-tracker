import { jwtDecode } from "jwt-decode";

export function isAdmin(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.is_admin;
  } catch (error) {
    return false;
  }
}
