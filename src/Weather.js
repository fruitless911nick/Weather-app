import React from "react";

export default function Weather({ data, unit }) {
  const celsiusTemp = data.main.temp;
  const displayTemp = unit === "imperial"
    ? Math.round((celsiusTemp * 9) / 5 + 32)
    : Math.round(celsiusTemp);

  const windSpeed = unit === "imperial"
    ? (data.wind.speed * 2.237).toFixed(1) // m/s to mph
    : data.wind.speed.toFixed(1);

  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>
      <h3>{displayTemp}°{unit === "metric" ? "C" : "F"}</h3>
      <p>{data.weather[0].description}</p>
      <div className="details">
        <p>💧 {data.main.humidity}%</p>
        <p>💨 {windSpeed} {unit === "metric" ? "m/s" : "mph"}</p>
      </div>
    </div>
  );
}
