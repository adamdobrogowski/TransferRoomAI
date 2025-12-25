import React from "react";
import PlayerSearchInput from "../common/PlayerSearchInput";
const CompareControls = ({
  p1,
  p2,
  season,
  onP1Change,
  onP2Change,
  onSeasonChange,
  onCompare,
}) => {
  return (
    <div style={styles.container}>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>
          Sezon:
        </label>
        <select
          value={season}
          onChange={(e) => onSeasonChange(e.target.value)}
          style={styles.select}
        >
          <option value="All">Łącznie (Wszystkie sezony)</option>
          <option value="2024-2025">2024-2025</option>
          <option value="2025-2026">2025-2026</option>
        </select>
      </div>

      <div style={styles.inputsRow}>
        <PlayerSearchInput
          placeholder="Gracz A (np. Kane)"
          value={p1}
          onChange={onP1Change}
        />

        <span style={{ fontWeight: "bold", color: "#666", margin: "0 10px" }}>
          VS
        </span>

        <PlayerSearchInput
          placeholder="Gracz B (np. Salah)"
          value={p2}
          onChange={onP2Change}
        />

        <button onClick={onCompare} style={styles.searchBtn}>
          Porównaj
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    border: "1px solid #e9ecef",
  },
  inputsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    cursor: "pointer",
  },
  searchBtn: {
    padding: "10px 25px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default CompareControls;
