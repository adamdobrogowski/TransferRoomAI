import React, { useEffect, useState } from "react";
import { use } from "react";

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching player data...");

    fetch("http://localhost:5000/api/players")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Błąd sieci: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPlayers(data.players);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1>⚽ TransferRoomAI</h1>
        <p>Top 50 Strzelców (Sezon 2024/2025 i 2025/2026)</p>
      </header>

      {loading && <h3>⏳ Ładowanie danych z bazy...</h3>}

      {error && (
        <div style={{ color: "red", border: "1px solid red", padding: "10px" }}>
          ❌ {error}
        </div>
      )}

      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Zawodnik</th>
                <th style={styles.th}>Kraj</th>
                <th style={styles.th}>Klub</th>
                <th style={styles.th}>Liga</th>
                <th style={styles.th}>Gole</th>
                <th style={styles.th}>xG</th>
                <th style={styles.th}>Różnica</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    <strong>{player.player}</strong>
                  </td>
                  <td style={styles.td}>{player.nation}</td>
                  <td style={styles.td}>{player.team}</td>
                  <td style={styles.td}>{player.league}</td>
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
      )}
    </div>
  );
}

const styles = {
  th: { padding: "12px", borderBottom: "2px solid #ddd" },
  td: { padding: "10px" },
};

export default App;
