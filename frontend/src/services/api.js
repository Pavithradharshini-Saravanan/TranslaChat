import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  } catch (err) {
    console.error("Get users error:", err);
    return [];
  }
};

export const registerUser = async (username, preferredLanguage) => {
  try {
    const res = await axios.post(`${API_URL}/users/register`, {
      username,
      preferredLanguage
    });
    return res.data;
  } catch (err) {
    console.error("Register user error:", err.response?.data || err.message);
    throw err;
  }
};

// ----------------- ROOM FUNCTIONS -----------------
export const createRoom = async (userId) => {
  try {
    const res = await axios.post(`${API_URL}/rooms/create`, { userId });
    return res.data;
  } catch (err) {
    console.error("Create room error:", err.response?.data || err.message);
    throw err;
  }
};

export const getRoomInfo = async (roomCode) => {
  try {
    const res = await axios.get(`${API_URL}/rooms/${roomCode}`);
    return res.data;
  } catch (err) {
    console.error("Get room info error:", err.response?.data || err.message);
    throw err;
  }
};

export const joinRoom = async (roomCode, userId) => {
  try {
    const res = await axios.post(`${API_URL}/rooms/${roomCode}/join`, { userId });
    return res.data;
  } catch (err) {
    console.error("Join room error:", err.response?.data || err.message);
    throw err;
  }
};

export const getMessages = async (roomId) => {
  try {
    const res = await axios.get(`${API_URL}/messages?roomId=${roomId}`);
    return res.data;
  } catch (err) {
    console.error("Get messages error:", err);
    return [];
  }
};

// ➡️ NEW FUNCTION FOR SENDING/TRANSLATING MESSAGES ⬅️
export const sendMessage = async (messageData) => {
  try {
    // Send the message data to the backend translation route
    const res = await axios.post(`${API_URL}/messages/send`, messageData);
    return res.data;
  } catch (err) {
    console.error("Send message error:", err.response?.data || err.message);
    throw err;
  }
};