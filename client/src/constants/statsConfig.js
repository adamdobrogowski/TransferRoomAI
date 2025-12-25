export const STAT_CATEGORIES = {
  "⚔️ Atak": [
    { label: "Gole", key: "Performance_Gls", highlight: true },
    { label: "Oczekiwane Gole (xG)", key: "Expected_xG" },
    { label: "Gole minus xG", key: "xG_Diff", colorLogic: true },
    { label: "Strzały ogółem", key: "Performance_Sh" },
    { label: "Strzały celne", key: "Performance_SoT" },
    { label: "Rzuty karne", key: "Performance_PK" },
  ],
  "🎯 Rozegranie": [
    { label: "Asysty", key: "Performance_Ast", highlight: true },
    { label: "Oczekiwane Asysty (xA)", key: "Expected_xAG" },
    { label: "Podania celne", key: "Passing_Total_Cmp" },
    { label: "Próby podań", key: "Passing_Total_Att" },
    { label: "Podania progresywne", key: "Passing_Prog" },
    { label: "Kluczowe podania", key: "Passing_KP" },
  ],
  "🛡️ Obrona": [
    { label: "Odbiory (Tackles)", key: "Defense_Tkl" },
    { label: "Przechwyty", key: "Defense_Int" },
    { label: "Bloki", key: "Defense_Blocks" },
    { label: "Wybicia", key: "Defense_Clr" },
  ],
  "⚽ Posiadanie": [
    { label: "Kontakty z piłką", key: "Possession_Touches" },
    { label: "Udane dryblingi", key: "Possession_Succ" },
    { label: "Próby dryblingu", key: "Possession_Att" },
  ],
  "⚠️ Dyscyplina": [
    { label: "Żółte kartki", key: "Performance_CrdY" },
    { label: "Czerwone kartki", key: "Performance_CrdR" },
    { label: "Faule popełnione", key: "Performance_Fls" },
  ],
};
