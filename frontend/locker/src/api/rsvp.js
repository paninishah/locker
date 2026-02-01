import axios from "axios";

const API_BASE = "https://locker-backend-228p.onrender.com/api/events";

export const submitRsvp = async (eventId, payload) => {
  const res = await axios.post(`${API_BASE}/${eventId}/rsvp`, payload);
  return res.data;
};

export const getRsvpsForEvent = async (eventId) => {
  const res = await axios.get(`${API_BASE}/${eventId}/rsvps`);
  return res.data;
};
