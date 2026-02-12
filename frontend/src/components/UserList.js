import React from "react";

const UserList = ({ users }) => {
  return (
    <div style={{
      width: "280px",
      margin: "20px 0 20px 20px",
      backgroundColor: "rgba(20, 20, 20, 0.8)",
      borderRadius: "20px",
      padding: "25px",
      border: "1px solid rgba(78, 24, 78, 0.3)",
      boxShadow: "0 20px 60px rgba(78, 24, 78, 0.3)",
      backdropFilter: "blur(10px)",
      height: "fit-content"
    }}>
      <h4 style={{
        marginTop: 0,
        marginBottom: "20px",
        color: "#ff6ec4",
        fontSize: "18px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "2px",
        borderBottom: "2px solid rgba(78, 24, 78, 0.3)",
        paddingBottom: "15px"
      }}>
        Online Users ({users.length})
      </h4>

      {users.length === 0 ? (
        <p style={{
          color: "#666",
          fontSize: "14px",
          textAlign: "center",
          padding: "20px 0"
        }}>
          No users online
        </p>
      ) : (
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: 0
        }}>
          {users.map((user) => (
            <li
              key={user._id}
              style={{
                padding: "15px",
                marginBottom: "10px",
                background: "linear-gradient(135deg, rgba(78, 24, 78, 0.2) 0%, rgba(139, 47, 139, 0.1) 100%)",
                borderRadius: "12px",
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: "1px solid rgba(78, 24, 78, 0.2)",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(78, 24, 78, 0.3) 0%, rgba(139, 47, 139, 0.2) 100%)";
                e.currentTarget.style.transform = "translateX(5px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(78, 24, 78, 0.2) 0%, rgba(139, 47, 139, 0.1) 100%)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <span style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#28a745",
                boxShadow: "0 0 10px #28a745",
                animation: "pulse 2s ease-in-out infinite"
              }}></span>
              <span style={{
                color: "#ffffff",
                fontWeight: "600",
                flex: 1
              }}>
                {user.username}
              </span>
              <span style={{
                fontSize: "11px",
                color: "#ff6ec4",
                textTransform: "uppercase",
                fontWeight: "700",
                backgroundColor: "rgba(78, 24, 78, 0.3)",
                padding: "4px 10px",
                borderRadius: "8px",
                letterSpacing: "1px"
              }}>
                {user.preferredLanguage}
              </span>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default UserList;
