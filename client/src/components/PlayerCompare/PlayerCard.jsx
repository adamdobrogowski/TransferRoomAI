import React from "react";
import { STAT_CATEGORIES } from "../../constants/statsConfig";

const PlayerCard = ({ player }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={{ margin: "0 0 5px 0", color: "#222" }}>{player.player}</h2>
        <div style={{ color: "#666", fontSize: "14px" }}>
          {player.team} • {player.nation} • {player.age} lat
        </div>
        <div style={styles.metaBadge}>
          Minuty: <strong>{player.Playing_Time_Min}</strong> | Mecze:{" "}
          <strong>{player.Playing_Time_MP}</strong>
        </div>
      </div>

      {Object.entries(STAT_CATEGORIES).map(([categoryName, stats]) => (
        <div key={categoryName} style={{ marginBottom: "20px" }}>
          <h4 style={styles.categoryTitle}>{categoryName}</h4>
          {stats.map((stat) => {
            const value =
              player[stat.key] !== undefined ? player[stat.key] : "-";

            let valueColor = "#333";
            if (stat.highlight) valueColor = "#007bff";
            if (stat.colorLogic) {
              if (value > 0) valueColor = "#28a745";
              else if (value < 0) valueColor = "#dc3545";
            }

            return (
              <div key={stat.key} style={styles.statRow}>
                <span style={{ color: "#666" }}>{stat.label}</span>
                <span style={{ fontWeight: "600", color: valueColor }}>
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    width: "320px",
    textAlign: "left",
    border: "1px solid #f0f0f0",
  },
  header: {
    textAlign: "center",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
    marginBottom: "15px",
  },
  metaBadge: {
    marginTop: "10px",
    fontSize: "12px",
    background: "#eef",
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "15px",
    color: "#444",
  },
  categoryTitle: {
    margin: "0 0 10px 0",
    fontSize: "12px",
    textTransform: "uppercase",
    color: "#999",
    letterSpacing: "1px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "5px",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "14px",
  },
};

export default PlayerCard;
