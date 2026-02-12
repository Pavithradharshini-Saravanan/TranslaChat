import React, { useState } from "react";

const ChatBox = ({ onSend }) => {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃",
    "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙",
    "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔",
    "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥",
    "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮",
    "🤧", "🥵", "🥶", "😎", "🤓", "🧐", "😕", "😟", "🙁", "☹️",
    "😮", "😯", "😲", "😳", "🥺", "😦", "😧", "😨", "😰", "😥",
    "😢", "😭", "😱", "😖", "😣", "😞", "😓", "😩", "😫", "🥱",
    "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉",
    "👆", "👇", "☝️", "👋", "🤚", "🖐️", "✋", "🖖", "👏", "🙌",
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
    "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️",
    "✨", "⭐", "🌟", "💫", "🔥", "💥", "💯", "✅", "🎉", "🎊"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const addEmoji = (emoji) => {
    setText(text + emoji);
    setShowEmoji(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex",
      gap: "15px",
      alignItems: "center",
      position: "relative"
    }}>
      <div style={{ flex: 1, position: "relative" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: "100%",
            padding: "15px 50px 15px 20px",
            fontSize: "16px",
            border: "2px solid rgba(78, 24, 78, 0.3)",
            borderRadius: "12px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#ffffff",
            outline: "none",
            transition: "all 0.3s ease",
            boxSizing: "border-box"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#4e184e";
            e.target.style.boxShadow = "0 0 20px rgba(78, 24, 78, 0.3)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(78, 24, 78, 0.3)";
            e.target.style.boxShadow = "none";
          }}
        />

        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          style={{
            position: "absolute",
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            padding: "5px",
            transition: "transform 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.transform = "translateY(-50%) scale(1.2)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(-50%) scale(1)"}
        >
          😊
        </button>

        {/* Emoji Picker */}
        {showEmoji && (
          <div style={{
            position: "absolute",
            bottom: "70px",
            right: "0",
            width: "350px",
            maxHeight: "300px",
            overflowY: "auto",
            backgroundColor: "rgba(20, 20, 20, 0.98)",
            border: "2px solid rgba(78, 24, 78, 0.5)",
            borderRadius: "15px",
            padding: "15px",
            boxShadow: "0 10px 40px rgba(78, 24, 78, 0.5)",
            backdropFilter: "blur(10px)",
            zIndex: 1000,
            scrollbarWidth: "thin",
            scrollbarColor: "#4e184e rgba(0, 0, 0, 0.3)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(78, 24, 78, 0.3)"
            }}>
              <span style={{
                color: "#ff6ec4",
                fontSize: "14px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}>
                Pick an Emoji
              </span>
              <button
                type="button"
                onClick={() => setShowEmoji(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#888",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "0",
                  lineHeight: "1"
                }}
              >
                ✕
              </button>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: "8px"
            }}>
              {emojis.map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => addEmoji(emoji)}
                  style={{
                    background: "rgba(78, 24, 78, 0.2)",
                    border: "1px solid rgba(78, 24, 78, 0.3)",
                    borderRadius: "8px",
                    fontSize: "24px",
                    padding: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "rgba(78, 24, 78, 0.4)";
                    e.target.style.transform = "scale(1.2)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "rgba(78, 24, 78, 0.2)";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        style={{
          padding: "15px 30px",
          fontSize: "16px",
          fontWeight: "700",
          background: "linear-gradient(135deg, #4e184e 0%, #7a2a7a 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(78, 24, 78, 0.4)",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 6px 20px rgba(78, 24, 78, 0.6)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 15px rgba(78, 24, 78, 0.4)";
        }}
      >
        Send
      </button>

      <style>{`
        /* Custom scrollbar for emoji picker */
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: #4e184e;
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #7a2a7a;
        }
      `}</style>
    </form>
  );
};

export default ChatBox;
