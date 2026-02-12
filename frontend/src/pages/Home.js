import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import ChatBox from "../components/ChatBox";
import Message from "../components/Message";
import { getMessages, getUsers, getRoomInfo, joinRoom, sendMessage } from "../services/api";

const socket = io("http://localhost:5000");

const Home = () => {
  const { roomCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("en");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (location.state) {
      setCurrentUserId(location.state.userId);
      setUsername(location.state.username);
      setLanguage(location.state.language);
    } else {
      navigate("/", { state: { roomCode } });
    }
  }, [location, navigate, roomCode]);

  useEffect(() => {
    if (currentUserId && roomCode) {
      fetchRoomInfo();
      joinRoomAndFetch();
    }
  }, [currentUserId, roomCode]);

  useEffect(() => {
    if (roomInfo && roomInfo._id && username) {
      socket.emit("joinRoom", { roomId: roomInfo._id, username });
      fetchMessages();
    }

    return () => {
      if (roomInfo && roomInfo._id && username) {
        socket.emit("leaveRoom", { roomId: roomInfo._id, username });
      }
    };
  }, [roomInfo, username]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const fetchRoomInfo = async () => {
    try {
      const data = await getRoomInfo(roomCode);
      setRoomInfo(data);
    } catch (err) {
      console.error("Error fetching room info:", err);
      alert("Room not found. Redirecting to home...");
      navigate("/");
    }
  };

  const joinRoomAndFetch = async () => {
    try {
      await joinRoom(roomCode, currentUserId);
      fetchUsers();
    } catch (err) {
      console.error("Error joining room:", err);
    }
  };

  const fetchMessages = async () => {
    try {
      if (!roomInfo || !roomInfo._id) {
        console.log("Room info not loaded yet, skipping message fetch");
        return;
      }
      const data = await getMessages(roomInfo._id);
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    if (!roomInfo || !roomInfo._id) {
      alert("Room information not loaded. Please wait or refresh the page.");
      return;
    }

    const messageData = {
      sender: currentUserId,
      text: text,
      roomId: roomInfo._id
    };

    try {
      const savedMessage = await sendMessage(messageData);
      console.log("Message sent to API for translation/save:", savedMessage);
    } catch (error) {
      console.error("Error during message send/translate:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Could not send message. Please check the backend server status.";
      alert(errorMessage);
    }
  };

  const copyToClipboard = () => {
    const roomLink = `${window.location.origin}/room/${roomCode}`;
    navigator.clipboard.writeText(roomLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentUserId) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "linear-gradient(135deg, #000000 0%, #1a0a1a 100%)",
      overflow: "hidden",
      padding: "20px"
    }}>
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(20, 20, 20, 0.8)",
        borderRadius: "20px",
        boxShadow: "0 20px 60px rgba(78, 24, 78, 0.3)",
        border: "1px solid rgba(78, 24, 78, 0.3)",
        overflow: "hidden",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{
          padding: "20px 30px",
          background: "linear-gradient(135deg, #4e184e 0%, #7a2a7a 100%)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 20px rgba(78, 24, 78, 0.4)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "700",
                letterSpacing: "1px"
              }}>
                🌍 TranslaChat
              </h2>
              <p style={{
                margin: "3px 0 0 0",
                fontSize: "12px",
                opacity: 0.8,
                fontWeight: "300"
              }}>
                {username} • {language.toUpperCase()}
              </p>
            </div>

            {/* Room Info in Header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              paddingLeft: "20px",
              borderLeft: "1px solid rgba(255, 255, 255, 0.2)"
            }}>
              <div>
                <p style={{
                  margin: 0,
                  fontSize: "10px",
                  opacity: 0.7,
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>
                  Room
                </p>
                <p style={{
                  margin: "2px 0 0 0",
                  fontSize: "14px",
                  fontWeight: "700",
                  letterSpacing: "1px"
                }}>
                  {roomCode}
                </p>
              </div>
              <div>
                <p style={{
                  margin: 0,
                  fontSize: "10px",
                  opacity: 0.7,
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>
                  Users
                </p>
                <p style={{
                  margin: "2px 0 0 0",
                  fontSize: "14px",
                  fontWeight: "700"
                }}>
                  {roomInfo?.participants?.length || 0}
                </p>
              </div>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: "8px 15px",
                  fontSize: "12px",
                  fontWeight: "600",
                  background: copied
                    ? "rgba(40, 167, 69, 0.3)"
                    : "rgba(255, 255, 255, 0.15)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}
                onMouseOver={(e) => !copied && (e.target.style.background = "rgba(255, 255, 255, 0.25)")}
                onMouseOut={(e) => !copied && (e.target.style.background = "rgba(255, 255, 255, 0.15)")}
              >
                {copied ? "✓ Copied" : "📋 Copy Link"}
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to leave?")) {
                navigate("/");
              }
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Leave Room
          </button>
        </div>

        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "30px",
          background: "rgba(0, 0, 0, 0.3)",
          scrollbarWidth: "none", /* Firefox */
          msOverflowStyle: "none" /* IE and Edge */
        }}>
          {messages.length === 0 ? (
            <div style={{
              textAlign: "center",
              color: "#888",
              marginTop: "100px"
            }}>
              <p style={{
                fontSize: "48px",
                margin: "0 0 20px 0"
              }}>💬</p>
              <p style={{
                fontSize: "22px",
                fontWeight: "600",
                color: "#ff6ec4",
                marginBottom: "10px"
              }}>No messages yet</p>
              <p style={{
                fontSize: "16px",
                color: "#666"
              }}>Be the first to say hello!</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <Message
                key={idx}
                message={msg}
                currentUsername={username}
                currentUserLanguage={language}
              />
            ))
          )}
        </div>

        <div style={{
          padding: "25px 30px",
          background: "rgba(20, 20, 20, 0.9)",
          borderTop: "1px solid rgba(78, 24, 78, 0.3)"
        }}>
          <ChatBox onSend={handleSend} />
        </div>
      </div>

      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
