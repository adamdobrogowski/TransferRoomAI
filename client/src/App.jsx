import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setData(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/test-python?team=Arsenal&year=2024/25"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
      alert("Wystąpił błąd podczas pobierania danych z serwera.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel Skautingu</h1>

      <button onClick={fetchData} disabled={loading}>
        {loading ? "Ładowanie..." : "Pobierz dane"}
      </button>

      {data && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h2>Klub: {data.club}</h2>
          <p>Sezon: {data.season}</p>

          <h3>Strzelcy:</h3>
          <ul>
            {data.top_scorers &&
              data.top_scorers.map((player, index) => (
                <li key={index}>
                  <strong>{player.name}</strong>: {player.goals} goli
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
