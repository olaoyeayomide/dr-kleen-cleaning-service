import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/token/`, {
      username,
      password,
    });
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) throw new Error("No refresh token available");

  try {
    const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
      refresh: refreshToken,
    });
    localStorage.setItem("access_token", response.data.access);
    return response.data;
  } catch (error) {
    console.error("Token refresh error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
