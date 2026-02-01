import axios from "axios";

const API_BASE = "https://locker-backend-228p.onrender.com/api/admin";

export const adminLogin = async (email, password) => {
  const res = await axios.post(`${API_BASE}/login`, {
    email,
    password,
  });
  return res.data;
};
