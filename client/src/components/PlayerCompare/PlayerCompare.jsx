import React, { useState } from "react";
import CompareControls from "./CompareControls";
import PlayerCard from "./PlayerCard";

const PlayerCompare = () => {
  const [p1Search, setP1Search] = useState("");
  const [p2Search, setP2Search] = useState("");
  const [season, setSeason] = useState("All");
  const [compareData, setCompareData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCompare = () => {
    if (!p1Search || !p2Search) return alert("Wpisz nazwiska obu piłkarzy!");
    setLoading(true);

    fetch(
      `http://localhost:5000/api/versus?p1=${p1Search}&p2=${p2Search}&season=${season}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Błąd pobierania danych");
        return res.json();
      })
      .then((data) => {
        setCompareData(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Nie znaleziono danych lub błąd serwera.");
        setLoading(false);
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <CompareControls
        p1={p1Search}
        onP1Change={setP1Search}
        p2={p2Search}
        onP2Change={setP2Search}
        season={season}
        onSeasonChange={setSeason}
        onCompare={handleCompare}
      />

      {loading && <div>⏳ Ładowanie...</div>}
      {error && <div style={{ color: "red" }}>❌ {error}</div>}

      {!loading && compareData.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {compareData.map((player, index) => (
            <PlayerCard key={index} player={player} />
          ))}
        </div>
      )}

      {!loading && compareData.length === 0 && (
        <p style={{ color: "#888", marginTop: "20px" }}>
          Wpisz nazwiska i kliknij Porównaj.
        </p>
      )}
    </div>
  );
};

export default PlayerCompare;
