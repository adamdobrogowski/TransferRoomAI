import soccerdata as sd
import pandas as pd
import sqlite3
import os
import time

LIGA_PAKIET = "Big 5 European Leagues Combined"
SEZONY = ['2024-2025', '2025-2026']

def aktualizuj_dane():
    print(f"--- Start scrapowania: {LIGA_PAKIET} ---")
    print(f"--- Sezony: {SEZONY} ---")
    
    print("\n>>> Pobieranie danych z FBref (Statystyki)...")
    time.sleep(3)

    try:
        fbref = sd.FBref(leagues=LIGA_PAKIET, seasons=SEZONY, no_cache=True)
        
        print("   Pobieranie modułów statystycznych...")
        std = fbref.read_player_season_stats(stat_type="standard")
        sho = fbref.read_player_season_stats(stat_type="shooting")
        pas = fbref.read_player_season_stats(stat_type="passing")
        ptype = fbref.read_player_season_stats(stat_type="passing_types")
        gca = fbref.read_player_season_stats(stat_type="goal_shot_creation")
        defs = fbref.read_player_season_stats(stat_type="defense")
        poss = fbref.read_player_season_stats(stat_type="possession")
        misc = fbref.read_player_season_stats(stat_type="misc")

        keep = fbref.read_player_season_stats(stat_type="keeper")
        
        print("   Łączenie tabel w jedną całość...")
        df = std.join(sho, rsuffix='_sho')\
                .join(pas, rsuffix='_pas')\
                .join(ptype, rsuffix='_ptype')\
                .join(gca, rsuffix='_gca')\
                .join(defs, rsuffix='_def')\
                .join(poss, rsuffix='_poss')\
                .join(misc, rsuffix='_misc')\
                .join(keep, rsuffix='_gk')

        df = df.reset_index()
        
        print(f"   Pobrano {len(df)} wierszy. Przystępuję do czyszczenia.")

        df = df.loc[:, ~df.columns.duplicated()]

        new_columns = []
        for col in df.columns:
            if isinstance(col, tuple):
                col_name = "_".join(str(c) for c in col if c) 
            else:
                col_name = str(col)
            
            clean_col = col_name.replace('+', '_plus_')\
                                .replace('/', '_per_')\
                                .replace('-', '_')\
                                .replace(' ', '_')\
                                .replace('.', '')\
                                .replace(':', '')\
                                .replace('%', '_pct')
            new_columns.append(clean_col)
        df.columns = new_columns

        base_dir = os.path.dirname(os.path.abspath(__file__))
        server_dir = os.path.join(base_dir, '..', 'server')
        
        if not os.path.exists(server_dir):
            os.makedirs(server_dir) 
            
        db_path = os.path.join(server_dir, 'football_data.db')

        conn = sqlite3.connect(db_path)
        df.to_sql('players_stats', conn, if_exists='replace', index=False)
        conn.close()
        
        print(f"\n--- SUKCES! ---")
        print(f"Baza danych została zapisana w: {db_path}")
        
    except Exception as e:
        print(f"\nBŁĄD KRYTYCZNY FBref: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    aktualizuj_dane()