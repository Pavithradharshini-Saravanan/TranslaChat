import React from "react";

const Message = ({ message, currentUsername, currentUserLanguage }) => {
  const isOwnMessage = message.sender?.username === currentUsername;

  const translatedText = message.translations?.[currentUserLanguage] || message.text;

  return (
    <div style={{
      display: "flex",
      justifyContent: isOwnMessage ? "flex-end" : "flex-start",
      marginBottom: "20px",
      animation: "slideIn 0.3s ease-out"
    }}>
      <div style={{
        maxWidth: "70%",
        padding: "15px 20px",
        borderRadius: isOwnMessage ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
        background: isOwnMessage
          ? "linear-gradient(135deg, #4e184e 0%, #7a2a7a 100%)"
          : "rgba(40, 40, 40, 0.8)",
        color: "white",
        boxShadow: isOwnMessage
          ? "0 4px 15px rgba(78, 24, 78, 0.4)"
          : "0 4px 15px rgba(0, 0, 0, 0.3)",
        border: isOwnMessage
          ? "1px solid rgba(255, 110, 196, 0.3)"
          : "1px solid rgba(78, 24, 78, 0.2)",
        backdropFilter: "blur(10px)"
      }}>
        {!isOwnMessage && (
          <div style={{
            fontSize: "12px",
            fontWeight: "700",
            color: "#ff6ec4",
            marginBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            {message.sender?.username || "Unknown"}
          </div>
        )}
        <div style={{
          fontSize: "15px",
          lineHeight: "1.5",
          wordWrap: "break-word",
          fontWeight: "400"
        }}>
          {translatedText}
        </div>
        <div style={{
          fontSize: "11px",
          color: isOwnMessage ? "rgba(255, 255, 255, 0.6)" : "#888",
          marginTop: "8px",
          textAlign: "right",
          fontWeight: "300"
        }}>
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Message;
