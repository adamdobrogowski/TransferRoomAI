import React, { useEffect, useState } from "react";
import PlayerTable from "./PlayerTable";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("All");

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
        if (selectedLeague !== "All") params.append("league", selectedLeague);

        const response = await fetch(
          `http://localhost:5000/api/players?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Błąd pobierania danych");
        }

        const data = await response.json();
        setPlayers(data.players);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchPlayers();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedLeague]);

  return (
    <div>
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Szukaj na liście..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          style={styles.select}
        >
          <option value="All">Wszystkie Ligi</option>
          <option value="ENG-Premier League">Premier League</option>
          <option value="ESP-La Liga">La Liga</option>
          <option value="ITA-Serie A">Serie A</option>
          <option value="GER-Bundesliga">Bundesliga</option>
          <option value="FRA-Ligue 1">Ligue 1</option>
        </select>
      </div>

      {loading && <div style={styles.info}>⏳ Ładowanie...</div>}
      {error && <div style={styles.error}>❌ {error}</div>}

      {!loading && !error && <PlayerTable players={players} />}
    </div>
  );
};

const styles = {
  filterContainer: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  input: {
    padding: "10px",
    width: "220px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    cursor: "pointer",
  },
  info: { textAlign: "center", padding: "20px" },
  error: { color: "red", textAlign: "center", padding: "20px" },
};

export default PlayerList;
