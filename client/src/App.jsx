import React, { useState } from "react";
import Header from "./components/common/Header";
import PlayerList from "./components/PlayerList/PlayerList";
import PlayerCompare from "./components/PlayerCompare/PlayerCompare";

function App() {
  const [view, setView] = useState("list");

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Segoe UI, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Header currentView={view} onViewChange={setView} />

      <main>{view === "list" ? <PlayerList /> : <PlayerCompare />}</main>
    </div>
  );
}

export default App;
