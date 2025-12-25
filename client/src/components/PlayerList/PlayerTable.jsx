import React from "react";

const PlayerTable = ({ players }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Zawodnik</th>
            <th style={styles.th}>Kraj</th>
            <th style={styles.th}>Klub</th>
            <th style={styles.th}>Liga</th>
            <th style={styles.th}>Gole</th>
            <th style={styles.th}>xG</th>
            <th style={styles.th}>G-xG</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>
                <strong>{player.player}</strong>
              </td>
              <td style={styles.td}>{player.nation}</td>
              <td style={styles.td}>{player.team}</td>
              <td style={styles.td}>
                {player.league
                  ? player.league.replace("Big 5 European Leagues Combined", "")
                  : "-"}
              </td>
              <td style={{ ...styles.td, fontWeight: "bold" }}>
                {player.Performance_Gls}
              </td>
              <td style={styles.td}>{player.Expected_xG}</td>
              <td
                style={{
                  ...styles.td,
                  fontWeight: "bold",
                  color:
                    player.xG_Diff > 0
                      ? "green"
                      : player.xG_Diff < 0
                      ? "red"
                      : "black",
                }}
              >
                {player.xG_Diff > 0 ? "+" : ""}
                {player.xG_Diff}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
    marginTop: "10px",
  },
  headerRow: { backgroundColor: "#f8f9fa", textAlign: "left" },
  th: { padding: "12px", borderBottom: "2px solid #ddd", color: "#444" },
  td: { padding: "10px", color: "#333" },
};

export default PlayerTable;
