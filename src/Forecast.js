import React from "react";
// receives data and unit 
export default function Forecast({ data, unit }) {
  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));
// groups data by day or shows
  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {daily.map((item, idx) => {
          const celsiusTemp = item.main.temp;
          const displayTemp = unit === "imperial"
            ? Math.round((celsiusTemp * 9) / 5 + 32)
            : Math.round(celsiusTemp);

          return (
            <div key={idx} className="forecast-card">
              <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
              <p>{displayTemp}°{unit === "metric" ? "C" : "F"}</p>
              <p>{item.weather[0].main}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
