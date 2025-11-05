const express = require("express");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = 3001;

// enable CORS and JSON
app.use(cors());
app.use(express.json());

// Mock weather API
app.get("/api/weather", async (req, res) => {
  try {
    // For now, let's use mock data (you can later replace it with real API data)
    const mockWeather = {
      city: "London",
      temp: 25,
      condition: "Sunny",
    };
    res.json(mockWeather);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

// Mock Quote API
app.get("/api/quote", (req, res) => {
  const quotes = [
    "Keep pushing forward.",
    "Believe in yourself.",
    "The best time to start was yesterday. The next best time is now.",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

// CurrencyConverter API
app.get("/api/currency", async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount);
    if (isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    
    const response = await axios.get("https://api.exchangerate-api.com/v4/latest/INR");

    const rates = response.data.rates;
    const result = {
      usd: (amount * rates.USD).toFixed(2),
      eur: (amount * rates.EUR).toFixed(2),
      gbp: (amount * rates.GBP).toFixed(2),
      jpy: (amount * rates.JPY).toFixed(2),
      aud: (amount * rates.AUD).toFixed(2),
      cad: (amount * rates.CAD).toFixed(2),
      aed: (amount * rates.AED).toFixed(2),
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch currency data." });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});// server/server.js
require('dotenv').config();


const axios = require('axios');


app.use(cors());
app.use(express.json());


/**
 * Simple Quote API - serves a random quote from local array.
 */
const quotes = [
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

app.get('/api/quote', (req, res) => {
  try {
    const idx = Math.floor(Math.random() * quotes.length);
    return res.json({ quote: quotes[idx] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not fetch quote.' });
  }
});

/**
 * Weather API - fetches simplified weather info from OpenWeatherMap
 * Expects OPENWEATHER_API_KEY in .env
 * Optional query param: city (default: London)
 */
app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'London';
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Weather API key not configured.' });

    const url = `https://api.openweathermap.org/data/2.5/weather`;
    const resp = await axios.get(url, {
      params: { q: city, appid: apiKey, units: 'metric' }
    });

    const data = resp.data;
    const simplified = {
      city: data.name,
      temperature: data.main?.temp,
      condition: data.weather?.[0]?.description,
      icon: data.weather?.[0]?.icon
    };

    return res.json({ weather: simplified });
  } catch (err) {
    console.error('Weather error:', err?.response?.data || err.message);
    return res.status(500).json({ error: 'Could not fetch weather data.' });
  }
});

/**
 * Currency API - converts INR amount to USD and EUR
 * Expects EXCHANGE_API_KEY in .env (if using a provider that needs a key).
 * Query param: amount (required) - amount in INR
 */
app.get('/api/currency', async (req, res) => {
  const amount = Number(req.query.amount ?? 0);
  if (!amount || isNaN(amount)) return res.status(400).json({ error: 'Please provide a valid amount query param (INR).' });

  try {
    // Replace with the currency API of your choice. Many providers require keys.
    // Example placeholder using ExchangeRate-API-like endpoint:
    const apiKey = process.env.EXCHANGE_API_KEY; // optional depending on provider
    // Example public endpoint (if you use exchangerate.host you don't need key) - adjust per provider
    const url = `https://api.exchangerate.host/latest`;
    const resp = await axios.get(url, { params: { base: 'INR', symbols: 'USD,EUR' } });

    const rates = resp.data?.rates;
    if (!rates) return res.status(500).json({ error: 'Could not get exchange rates.' });

    const usd = +(amount * rates.USD).toFixed(4);
    const eur = +(amount * rates.EUR).toFixed(4);

    return res.json({ amountINR: amount, usd, eur, rates });
  } catch (err) {
    console.error('Currency error:', err?.response?.data || err.message);
    return res.status(500).json({ error: 'Could not fetch currency data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
