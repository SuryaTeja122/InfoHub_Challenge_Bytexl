import React, { useState } from "react";
import axios from "axios";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    if (!amount) {
      setError("Please enter an amount in INR");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch(`https://infohub-server.onrender.com/api/currency?amount=${amount}`);
      setResult(response.data);
    } catch (err) {
      setError("Could not fetch currency data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-yellow-100 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-3">💱 Currency Converter</h2>

      <div className="mb-3">
        <input
          type="number"
          placeholder="Enter amount in INR"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded-md w-64 text-center"
        />
      </div>

      <button
        onClick={handleConvert}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
      >
        Convert
      </button>

      {loading && <p className="mt-3 text-blue-500">Converting...</p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}

      {result && !loading && (
        <div className="mt-4 bg-white p-3 rounded-md shadow">
          <p>🇮🇳 {amount} INR = 💵 {result.usd} USD</p>
          <p>🇮🇳 {amount} INR = 💶 {result.eur} EUR</p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
