import React, { useState, useEffect, useRef } from "react";

const PlayerSearchInput = ({ placeholder, value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!value || value.length < 2) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      fetch(`http://localhost:5000/api/search?q=${value}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
          setShowDropdown(true);
        })
        .catch((err) => console.error(err));
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (playerName) => {
    onChange(playerName);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "220px" }}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value.length >= 2 && setShowDropdown(true)}
        style={styles.input}
      />

      {showDropdown && suggestions.length > 0 && (
        <ul style={styles.dropdown}>
          {suggestions.map((s, index) => (
            <li
              key={index}
              onClick={() => handleSelect(s.player)}
              style={styles.item}
              onMouseEnter={(e) => (e.target.style.background = "#f0f0f0")}
              onMouseLeave={(e) => (e.target.style.background = "white")}
            >
              <div style={{ fontWeight: "bold" }}>{s.player}</div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {s.team} ({s.nation})
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  input: {
    padding: "10px",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "0 0 6px 6px",
    listStyle: "none",
    padding: 0,
    margin: 0,
    zIndex: 1000,
    maxHeight: "200px",
    overflowY: "auto",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  item: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },
};

export default PlayerSearchInput;
