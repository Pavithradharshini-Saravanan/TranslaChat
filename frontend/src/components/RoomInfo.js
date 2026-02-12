import React, { useState } from "react";

const RoomInfo = ({ roomCode, participantCount }) => {
    const [copied, setCopied] = useState(false);
    const roomLink = `${window.location.origin}/room/${roomCode}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(roomLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{
            background: "linear-gradient(135deg, rgba(78, 24, 78, 0.2) 0%, rgba(139, 47, 139, 0.1) 100%)",
            padding: "20px 25px",
            borderRadius: "15px",
            border: "1px solid rgba(78, 24, 78, 0.3)",
            boxShadow: "0 4px 15px rgba(78, 24, 78, 0.2)"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px"
            }}>
                <div>
                    <p style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "#888",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: "600"
                    }}>
                        Room Code
                    </p>
                    <p style={{
                        margin: "5px 0 0 0",
                        fontSize: "24px",
                        fontWeight: "800",
                        color: "#ff6ec4",
                        letterSpacing: "2px"
                    }}>
                        {roomCode}
                    </p>
                </div>
                <div style={{
                    textAlign: "right"
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "#888",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: "600"
                    }}>
                        Participants
                    </p>
                    <p style={{
                        margin: "5px 0 0 0",
                        fontSize: "24px",
                        fontWeight: "800",
                        color: "#ff6ec4"
                    }}>
                        {participantCount}
                    </p>
                </div>
            </div>

            <div style={{
                display: "flex",
                gap: "10px",
                alignItems: "center"
            }}>
                <input
                    type="text"
                    value={roomLink}
                    readOnly
                    style={{
                        flex: 1,
                        padding: "12px 15px",
                        fontSize: "14px",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "#aaa",
                        border: "1px solid rgba(78, 24, 78, 0.3)",
                        borderRadius: "10px",
                        outline: "none",
                        fontFamily: "monospace"
                    }}
                />
                <button
                    onClick={copyToClipboard}
                    style={{
                        padding: "12px 20px",
                        fontSize: "14px",
                        fontWeight: "600",
                        background: copied
                            ? "linear-gradient(135deg, #28a745 0%, #20c997 100%)"
                            : "linear-gradient(135deg, #4e184e 0%, #7a2a7a 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(78, 24, 78, 0.3)",
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                    }}
                    onMouseOver={(e) => !copied && (e.target.style.transform = "translateY(-2px)", e.target.style.boxShadow = "0 6px 20px rgba(78, 24, 78, 0.5)")}
                    onMouseOut={(e) => !copied && (e.target.style.transform = "translateY(0)", e.target.style.boxShadow = "0 4px 15px rgba(78, 24, 78, 0.3)")}
                >
                    {copied ? "✓ Copied!" : "📋 Copy Link"}
                </button>
            </div>
        </div>
    );
};

export default RoomInfo;
