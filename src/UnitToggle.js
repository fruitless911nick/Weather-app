import React from "react";
import "./UnitToggle.css";

export default function UnitToggle({ unit, toggleUnit }) {
  return (
    <div className="unit-toggle">
      <button
        className={unit === "metric" ? "active" : ""}
        onClick={() => unit !== "metric" && toggleUnit("metric")}
      >
        °C
      </button>
      <button
        className={unit === "imperial" ? "active" : ""}
        onClick={() => unit !== "imperial" && toggleUnit("imperial")}
      >
        °F
      </button>
    </div>
  );
}
