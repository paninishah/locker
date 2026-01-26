import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getAllEvents = async () => {
  const res = await axios.get(`${API_BASE}/events`);
  return res.data;
};

export const getEventById = async (id) => {
  const res = await axios.get(`${API_BASE}/events/${id}`);
  return res.data;
};
