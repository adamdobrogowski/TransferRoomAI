const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, "football_data.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

app.get("/", (req, res) => {
  res.send("Serwer TransferRoomAI działa i połączył się z bazą danych");
});

app.get("/api/players", (req, res) => {
  let sql = `
        SELECT 
            player, nation, team, league,
            SUM(Performance_Gls) as Performance_Gls,
            ROUND(SUM(Expected_xG), 2) as Expected_xG,
            ROUND(SUM(Performance_Gls) - SUM(Expected_xG), 2) as xG_Diff
        FROM players_stats 
        WHERE 1=1 
    `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      count: rows.length,
      players: rows,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
