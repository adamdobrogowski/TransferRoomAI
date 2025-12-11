const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Witaj w TransferRoomAI! Serwer działa poprawnie." });
});

app.get("/api/test-python", (req, res) => {
  const team = req.query.team || "default_team";
  const year = req.query.year || "2024";

  const scriptPath = path.join(__dirname, "../scripts/test_data.py");

  const pythonProcess = spawn("python", [scriptPath, team, year]);

  let dataBuffer = "";

  pythonProcess.stdout.on("data", (data) => {
    dataBuffer += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Błąd skryptu Python" });
    }

    try {
      const parsedData = JSON.parse(dataBuffer);
      res.json(parsedData);
    } catch (e) {
      res
        .status(500)
        .json({ error: "Błąd parsowania danych z Pythona", raw: dataBuffer });
    }
  });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
