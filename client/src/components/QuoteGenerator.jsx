import React, { useEffect, useState } from "react";
import axios from "axios";

function QuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://infohub-server.onrender.com/api/quote");
        setQuote(response.data.quote);
      } catch (err) {
        setError("Could not fetch quote.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) return <p className="text-blue-500 text-center">Loading quote...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-4 bg-green-100 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-2">💬 Motivational Quote</h2>
      <p className="text-lg italic">"{quote}"</p>
    </div>
  );
}

export default QuoteGenerator;
