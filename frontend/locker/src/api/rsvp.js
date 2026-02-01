import axios from "axios";

const API_BASE = "https://locker-backend-228p.onrender.com/api";


export const submitRsvp = async (eventId, payload) => {
  const res = await axios.post(
    `${API_BASE}/events/${eventId}/rsvp`,
    payload
  );
  return res.data;
};

export const getRsvpsForEvent = async (eventId) => {
  const res = await axios.get(
    `${API_BASE}/events/${eventId}/rsvps`
  );
  return res.data;
};
