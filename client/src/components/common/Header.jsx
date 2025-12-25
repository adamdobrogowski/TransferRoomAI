import React from "react";

const Header = ({ currentView, onViewChange }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>⚽ TransferRoomAI</h1>
      <div style={styles.navContainer}>
        <button
          onClick={() => onViewChange("list")}
          style={currentView === "list" ? styles.activeBtn : styles.btn}
        >
          📋 Lista Top 50
        </button>
        <button
          onClick={() => onViewChange("compare")}
          style={currentView === "compare" ? styles.activeBtn : styles.btn}
        >
          ⚔️ Porównanie 1vs1
        </button>
      </div>
    </header>
  );
};

const styles = {
  header: { textAlign: "center", marginBottom: "30px" },
  title: { marginBottom: "20px" },
  navContainer: { display: "flex", justifyContent: "center", gap: "10px" },
  btn: {
    padding: "10px 20px",
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#555",
  },
  activeBtn: {
    padding: "10px 20px",
    border: "1px solid #007bff",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default Header;
