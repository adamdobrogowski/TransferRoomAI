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
  const { search, league } = req.query;

  let sql = `
        SELECT 
            player,
            nation,
            team,
            league,
            SUM(Performance_Gls) as Performance_Gls,
            ROUND(SUM(Expected_xG), 2) as Expected_xG,
            ROUND(SUM(Performance_Gls) - SUM(Expected_xG), 2) as xG_Diff
        FROM players_stats 
        WHERE 1=1 
    `;

  const params = [];

  if (search) {
    sql += " AND player LIKE ?";
    params.push(`%${search}%`);
  }

  if (league && league !== "All") {
    sql += " AND league = ?";
    params.push(league);
  }

  sql += ` 
        GROUP BY player
        ORDER BY Performance_Gls DESC 
        LIMIT 50
    `;

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ count: rows.length, players: rows });
  });
});

app.get("/api/search", (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 3) {
    return res.json([]);
  }

  const sql = `
        SELECT DISTINCT player, team, nation 
        FROM players_stats 
        WHERE player LIKE ? 
        LIMIT 10
    `;

  db.all(sql, [`%${q}%`], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/api/versus", (req, res) => {
  const { p1, p2, season } = req.query;

  if (!p1 || !p2) {
    return res.status(400).json({ error: "Missing player names" });
  }

  const sql = `SELECT * FROM players_stats WHERE player LIKE ? OR player LIKE ?`;

  db.all(sql, [`%${p1}%`, `%${p2}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const playersData = {};

    rows.forEach((row) => {
      if (season !== "All" && row.season !== season) return;

      const name = row.player;
      if (!playersData[name]) {
        playersData[name] = { ...row };

        if (season === "All") {
          Object.keys(row).forEach((key) => {
            if (
              typeof row[key] === "number" &&
              key !== "age" &&
              key !== "born"
            ) {
              playersData[name][key] = 0;
            }
          });
        }
      }

      if (season === "All") {
        Object.keys(row).forEach((key) => {
          if (typeof row[key] === "number" && key !== "age" && key !== "born") {
            playersData[name][key] += row[key];
          }
        });
        if (row.age > playersData[name].age) playersData[name].age = row.age;
        playersData[name].team = row.team;
      } else {
        playersData[name] = row;
      }
    });

    const result = Object.values(playersData).map((p) => {
      [
        "Expected_xG",
        "Expected_xAG",
        "Expected_npxG",
        "Per_90_Gls",
        "Per_90_Ast",
      ].forEach((key) => {
        if (p[key]) p[key] = Math.round(p[key] * 100) / 100;
      });
      if (p.Performance_Gls !== undefined && p.Expected_xG !== undefined) {
        p.xG_Diff = Math.round((p.Performance_Gls - p.Expected_xG) * 100) / 100;
      }
      return p;
    });

    res.json(result);
  });
});

app.get("/api");

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
