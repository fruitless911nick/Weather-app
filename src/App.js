import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";
import Forecast from "./Forecast";
import Search from "./Search";
import UnitToggle from "./UnitToggle";
import { WiDaySunny } from "react-icons/wi";
import "./App.css";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric"); // "metric" or "imperial"
  const [history, setHistory] = useState([]);

  const API_KEY = "aab4689db9d5df063c73df2e457f3a8f"; // replace with your API key

  useEffect(() => {
    const saved = localStorage.getItem("searchHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }, [history]);

  const handleSearch = async (city) => {
    if (!city) return;
    setLoading(true);
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(weatherRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setForecastData(forecastRes.data);

      setHistory(prev => [city, ...prev.filter(item => item !== city)]);
    } catch (error) {
      alert("City not found!");
    }
    setLoading(false);
  };

  return (
    <div className="app-wrapper">
      <div className="app rgb-glow">
        <h1 className="app-title">
          <WiDaySunny className="title-icon" />
          Weather App
        </h1>
        <UnitToggle unit={unit} toggleUnit={(newUnit) => setUnit(newUnit)} />
        <Search onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {weatherData && <Weather data={weatherData} unit={unit} />}
        {forecastData && <Forecast data={forecastData} unit={unit} />}
        <div className="history">
          <h3>Search History</h3>
          <ul>
            {history.map((city, idx) => (
              <li key={idx} onClick={() => handleSearch(city)}>{city}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
