import axios from "axios";

const API_BASE = "http://localhost:5000/api/admin";

export const adminLogin = async (email, password) => {
  const res = await axios.post(`${API_BASE}/login`, {
    email,
    password,
  });
  return res.data;
};
