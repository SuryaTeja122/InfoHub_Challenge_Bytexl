// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS & JSON
app.use(cors());
app.use(express.json());

// ✅ Root route for testing
app.get("/", (req, res) => {
  res.send("✅ InfoHub Server is running successfully!");
});

/**
 * 🌤 WEATHER API
 * Fetches weather info from OpenWeatherMap API
 * Example: /api/weather?city=London
 */
app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "London";
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Weather API key not configured." });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather`;
    const resp = await axios.get(url, {
      params: { q: city, appid: apiKey, units: "metric" },
    });

    const data = resp.data;
    const simplified = {
      city: data.name,
      temperature: data.main?.temp,
      condition: data.weather?.[0]?.description,
      icon: data.weather?.[0]?.icon,
    };

    res.json(simplified);
  } catch (err) {
    console.error("Weather error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

/**
 * 💬 QUOTE API
 * Returns a random motivational quote
 */
app.get("/api/quote", (req, res) => {
  const quotes = [
    "Keep pushing forward.",
    "Believe in yourself.",
    "The best time to start was yesterday. The next best time is now.",
    "Success is not final, failure is not fatal.",
    "Dream big, work hard, stay humble.",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

/**
 * 💱 CURRENCY CONVERTER API
 * Converts INR amount to other currencies using exchangerate.host
 */
app.get("/api/currency", async (req, res) => {
  const amount = Number(req.query.amount ?? 0);
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: "Please provide a valid amount (INR)." });
  }

  try {
    const url = `https://api.exchangerate.host/latest`;
    const resp = await axios.get(url, { params: { base: "INR", symbols: "USD,EUR,GBP,JPY,AUD,CAD,AED" } });
    const rates = resp.data?.rates;
    if (!rates) return res.status(500).json({ error: "Could not get exchange rates." });

    const result = {};
    for (const [currency, rate] of Object.entries(rates)) {
      result[currency] = +(amount * rate).toFixed(2);
    }

    res.json({ amountINR: amount, converted: result });
  } catch (err) {
    console.error("Currency error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Could not fetch currency data." });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
