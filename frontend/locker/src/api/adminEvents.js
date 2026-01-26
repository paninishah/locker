import axios from "axios";

const API_BASE = "http://localhost:5000/api/events";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getAdminEvents = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const createEvent = async (payload) => {
  const res = await axios.post(API_BASE, payload, authHeader());
  return res.data;
};

export const updateEvent = async (id, payload) => {
  const res = await axios.put(`${API_BASE}/${id}`, payload, authHeader());
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`, authHeader());
  return res.data;
};
