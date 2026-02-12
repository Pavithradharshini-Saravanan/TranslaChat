import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser, createRoom, joinRoom } from "../services/api";

const Landing = () => {
    const [username, setUsername] = useState("");
    const [language, setLanguage] = useState("en");
    const [roomCode, setRoomCode] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const redirectedRoomCode = location.state?.roomCode;

    useEffect(() => {
        if (redirectedRoomCode) {
            setRoomCode(redirectedRoomCode);
        }
    }, [redirectedRoomCode]);

    const handleCreateRoom = async () => {
        if (!username.trim()) {
            alert("Please enter a username");
            return;
        }

        setLoading(true);
        try {
            const userData = await registerUser(username, language);
            const roomData = await createRoom(userData._id);
            navigate(`/room/${roomData.roomCode}`, {
                state: { userId: userData._id, username, language }
            });
        } catch (err) {
            console.error("Error creating room:", err);
            alert("Failed to create room. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleJoinRoom = async (codeToJoin) => {
        if (!username.trim()) {
            alert("Please enter a username");
            return;
        }

        const finalRoomCode = codeToJoin || roomCode;
        if (!finalRoomCode.trim()) {
            alert("Please enter a room code");
            return;
        }

        setLoading(true);
        try {
            const userData = await registerUser(username, language);
            await joinRoom(finalRoomCode, userData._id);
            navigate(`/room/${finalRoomCode}`, {
                state: { userId: userData._id, username, language }
            });
        } catch (err) {
            console.error("Error joining room:", err);
            alert("Failed to join room. Please check the room code and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        if (redirectedRoomCode) {
            handleJoinRoom(redirectedRoomCode);
        } else {
            handleCreateRoom();
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #000000 0%, #1a0a1a 50%, #4e184e 100%)",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: "20px",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Animated background circles */}
            <div style={{
                position: "absolute",
                width: "500px",
                height: "500px",
                background: "radial-gradient(circle, rgba(97,31,97,0.3) 0%, transparent 70%)",
                borderRadius: "50%",
                top: "-200px",
                right: "-200px",
                animation: "pulse 4s ease-in-out infinite"
            }}></div>
            <div style={{
                position: "absolute",
                width: "400px",
                height: "400px",
                background: "radial-gradient(circle, rgba(97,31,97,0.2) 0%, transparent 70%)",
                borderRadius: "50%",
                bottom: "-150px",
                left: "-150px",
                animation: "pulse 5s ease-in-out infinite"
            }}></div>

            <div style={{
                maxWidth: "500px",
                width: "100%",
                backgroundColor: "rgba(20, 20, 20, 0.95)",
                borderRadius: "20px",
                padding: "50px 40px",
                boxShadow: "0 20px 60px rgba(78, 24, 78, 0.5), 0 0 100px rgba(78, 24, 78, 0.2)",
                border: "1px solid rgba(78, 24, 78, 0.3)",
                backdropFilter: "blur(10px)",
                position: "relative",
                zIndex: 1
            }}>
                <h1 style={{
                    background: "linear-gradient(135deg, #ff6ec4 0%, #4e184e 50%, #ff6ec4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "10px",
                    textAlign: "center",
                    fontSize: "42px",
                    fontWeight: "800",
                    letterSpacing: "2px",
                    textShadow: "0 0 30px rgba(78, 24, 78, 0.5)"
                }}>
                    🌍 TranslaChat
                </h1>
                <p style={{
                    color: "#b8b8b8",
                    textAlign: "center",
                    marginBottom: "40px",
                    fontSize: "15px",
                    fontWeight: "300"
                }}>
                    {redirectedRoomCode
                        ? <span style={{ color: "#ff6ec4", fontWeight: "500" }}>Join room: {redirectedRoomCode}</span>
                        : "Chat with anyone in your preferred language"}
                </p>

                <div style={{ marginBottom: "25px" }}>
                    <label style={{
                        display: "block",
                        marginBottom: "10px",
                        fontWeight: "600",
                        color: "#ff6ec4",
                        fontSize: "14px",
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                    }}>
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        style={{
                            width: "100%",
                            padding: "15px 20px",
                            fontSize: "16px",
                            border: "2px solid rgba(78, 24, 78, 0.4)",
                            borderRadius: "12px",
                            boxSizing: "border-box",
                            transition: "all 0.3s ease",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "#ffffff",
                            outline: "none"
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#4e184e";
                            e.target.style.boxShadow = "0 0 20px rgba(78, 24, 78, 0.4)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "rgba(78, 24, 78, 0.4)";
                            e.target.style.boxShadow = "none";
                        }}
                    />
                </div>

                <div style={{ marginBottom: "35px" }}>
                    <label style={{
                        display: "block",
                        marginBottom: "10px",
                        fontWeight: "600",
                        color: "#ff6ec4",
                        fontSize: "14px",
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                    }}>
                        Preferred Language
                    </label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "15px 20px",
                            fontSize: "16px",
                            border: "2px solid rgba(78, 24, 78, 0.4)",
                            borderRadius: "12px",
                            boxSizing: "border-box",
                            cursor: "pointer",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "#ffffff",
                            outline: "none",
                            transition: "all 0.3s ease"
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = "#4e184e";
                            e.target.style.boxShadow = "0 0 20px rgba(78, 24, 78, 0.4)";
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = "rgba(78, 24, 78, 0.4)";
                            e.target.style.boxShadow = "none";
                        }}
                    >
                        <option value="en" style={{ backgroundColor: "#1a1a1a" }}>🇬🇧 English</option>
                        <option value="es" style={{ backgroundColor: "#1a1a1a" }}>🇪🇸 Spanish (Español)</option>
                        <option value="fr" style={{ backgroundColor: "#1a1a1a" }}>🇫🇷 French (Français)</option>
                        <option value="hi" style={{ backgroundColor: "#1a1a1a" }}>🇮🇳 Hindi (हिंदी)</option>
                        <option value="ta" style={{ backgroundColor: "#1a1a1a" }}>🇮🇳 Tamil (தமிழ்)</option>
                        <option value="zh" style={{ backgroundColor: "#1a1a1a" }}>🇨🇳 Chinese (中文)</option>
                        <option value="ja" style={{ backgroundColor: "#1a1a1a" }}>🇯🇵 Japanese (日本語)</option>
                        <option value="de" style={{ backgroundColor: "#1a1a1a" }}>🇩🇪 German (Deutsch)</option>
                        <option value="ar" style={{ backgroundColor: "#1a1a1a" }}>🇸🇦 Arabic (العربية)</option>
                        <option value="pt" style={{ backgroundColor: "#1a1a1a" }}>🇵🇹 Portuguese (Português)</option>
                    </select>
                </div>

                {redirectedRoomCode ? (
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "18px",
                            fontSize: "18px",
                            fontWeight: "700",
                            background: loading ? "#444" : "linear-gradient(135deg, #4e184e 0%, #7a2a7a 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease",
                            opacity: loading ? 0.6 : 1,
                            boxShadow: loading ? "none" : "0 10px 30px rgba(78, 24, 78, 0.4)",
                            textTransform: "uppercase",
                            letterSpacing: "1px"
                        }}
                        onMouseOver={(e) => !loading && (e.target.style.transform = "translateY(-2px)", e.target.style.boxShadow = "0 15px 40px rgba(78, 24, 78, 0.6)")}
                        onMouseOut={(e) => !loading && (e.target.style.transform = "translateY(0)", e.target.style.boxShadow = "0 10px 30px rgba(78, 24, 78, 0.4)")}
                    >
                        {loading ? "Joining..." : `🔗 Join Room ${redirectedRoomCode}`}
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleCreateRoom}
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "18px",
                                fontSize: "18px",
                                fontWeight: "700",
                                background: loading ? "#444" : "linear-gradient(135deg, #4e184e 0%, #7a2a7a 100%)",
                                color: "white",
                                border: "none",
                                borderRadius: "12px",
                                cursor: loading ? "not-allowed" : "pointer",
                                marginBottom: "20px",
                                transition: "all 0.3s ease",
                                opacity: loading ? 0.6 : 1,
                                boxShadow: loading ? "none" : "0 10px 30px rgba(78, 24, 78, 0.4)",
                                textTransform: "uppercase",
                                letterSpacing: "1px"
                            }}
                            onMouseOver={(e) => !loading && (e.target.style.transform = "translateY(-2px)", e.target.style.boxShadow = "0 15px 40px rgba(78, 24, 78, 0.6)")}
                            onMouseOut={(e) => !loading && (e.target.style.transform = "translateY(0)", e.target.style.boxShadow = "0 10px 30px rgba(78, 24, 78, 0.4)")}
                        >
                            {loading ? "Creating..." : "🚀 Create New Room"}
                        </button>

                        <div style={{
                            textAlign: "center",
                            margin: "25px 0",
                            color: "#666",
                            fontSize: "14px",
                            fontWeight: "500",
                            position: "relative"
                        }}>
                            <span style={{
                                backgroundColor: "rgba(20, 20, 20, 0.95)",
                                padding: "0 15px",
                                position: "relative",
                                zIndex: 1
                            }}>OR</span>
                            <div style={{
                                position: "absolute",
                                top: "50%",
                                left: 0,
                                right: 0,
                                height: "1px",
                                background: "linear-gradient(90deg, transparent, rgba(78, 24, 78, 0.3), transparent)",
                                zIndex: 0
                            }}></div>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                            <input
                                type="text"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value)}
                                placeholder="Enter room code"
                                onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
                                style={{
                                    width: "100%",
                                    padding: "15px 20px",
                                    fontSize: "16px",
                                    border: "2px solid rgba(78, 24, 78, 0.4)",
                                    borderRadius: "12px",
                                    boxSizing: "border-box",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "#ffffff",
                                    outline: "none",
                                    transition: "all 0.3s ease"
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#4e184e";
                                    e.target.style.boxShadow = "0 0 20px rgba(78, 24, 78, 0.4)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "rgba(78, 24, 78, 0.4)";
                                    e.target.style.boxShadow = "none";
                                }}
                            />
                        </div>

                        <button
                            onClick={() => handleJoinRoom()}
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "18px",
                                fontSize: "18px",
                                fontWeight: "700",
                                background: loading ? "#444" : "linear-gradient(135deg, #7a2a7a 0%, #4e184e 100%)",
                                color: "white",
                                border: "none",
                                borderRadius: "12px",
                                cursor: loading ? "not-allowed" : "pointer",
                                transition: "all 0.3s ease",
                                opacity: loading ? 0.6 : 1,
                                boxShadow: loading ? "none" : "0 10px 30px rgba(78, 24, 78, 0.4)",
                                textTransform: "uppercase",
                                letterSpacing: "1px"
                            }}
                            onMouseOver={(e) => !loading && (e.target.style.transform = "translateY(-2px)", e.target.style.boxShadow = "0 15px 40px rgba(78, 24, 78, 0.6)")}
                            onMouseOut={(e) => !loading && (e.target.style.transform = "translateY(0)", e.target.style.boxShadow = "0 10px 30px rgba(78, 24, 78, 0.4)")}
                        >
                            {loading ? "Joining..." : "🔗 Join Existing Room"}
                        </button>
                    </>
                )}

                <p style={{
                    marginTop: "30px",
                    fontSize: "13px",
                    color: "#888",
                    textAlign: "center",
                    fontWeight: "300"
                }}>
                    Messages are automatically translated to everyone's preferred language
                </p>
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
      `}</style>
        </div>
    );
};

export default Landing;
