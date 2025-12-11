import sys
import json
import time

team_name = sys.argv[1] if len(sys.argv) > 1 else "Unknown Team"
season = sys.argv[2] if len(sys.argv) > 2 else "2023/2024"

data = {
    "club": team_name,
    "season": season,
    "league": "Premier League",
    "market_value_total": "1.2B EUR",
    "top_scorers": [
        {"name": "Bukayo Saka", "goals": 15},
        {"name": "Martin Odegaard", "goals": 8}
    ],
    "message": "Dane wygenerowane przez Python"
}

print(json.dumps(data))
sys.stdout.flush()