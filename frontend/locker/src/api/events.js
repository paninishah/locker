import axios from "axios";

const API_BASE = "https://locker-backend-228p.onrender.com/api/events";

export const getAllEvents = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getEventById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};
