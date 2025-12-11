import sys
import json
import sqlite3
import pandas as pd
import os


team_name_query = sys.argv[1] if len(sys.argv) > 1 else "Jagiellonia"

base_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(base_dir, '..', 'server', 'football_data.db')


def get_data(team):
    if not os.path.exists(db_path):
        return {"error": "Baza danych nie istnieje. Uruchom najpierw update_db.py"}

    conn = sqlite3.connect(db_path)

    query = f"""
    SELECT 
        player, team, league, Age, Gls, Ast, xG_Expected, PrgP
    FROM 
        players_stats 
    WHERE 
        team LIKE '%{team}%'
    ORDER BY 
        Gls DESC
    """
    
    try:
        df = pd.read_sql_query(query, conn)
        conn.close()
        
        if df.empty:
            return {"message": f"Nie znaleziono danych dla drużyny: {team}"}

        return df.to_dict(orient='records')
        
    except Exception as e:
        conn.close()
        return {"error": str(e)}

if __name__ == "__main__":
    result = get_data(team_name_query)
    
    print(json.dumps(result))
    sys.stdout.flush()