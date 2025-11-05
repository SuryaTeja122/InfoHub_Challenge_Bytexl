import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherModule() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get("http://localhost:3001/api/weather"); // backend endpoint
        setWeather(response.data);
      } catch (err) {
        setError("Could not fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p className="text-center text-blue-500">Loading weather...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-4 bg-blue-100 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-2">🌤 Current Weather</h2>
      <p className="text-lg">
        <strong>City:</strong> {weather.city}
      </p>
      <p>
        <strong>Temperature:</strong> {weather.temp}°C
      </p>
      <p>
        <strong>Condition:</strong> {weather.condition}
      </p>
    </div>
  );
}

export default WeatherModule;
