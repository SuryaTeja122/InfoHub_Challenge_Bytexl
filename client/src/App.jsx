import React, { useState } from "react";
import WeatherModule from "./components/WeatherModule";
import CurrencyConverter from "./components/CurrencyConverter";
import QuoteGenerator from "./components/QuoteGenerator"; // optional

function App() {
  const [activeTab, setActiveTab] = useState("weather");

  const renderContent = () => {
    switch (activeTab) {
      case "weather":
        return <WeatherModule />;
      case "currency":
        return <CurrencyConverter />;
      case "quotes":
        return <QuoteGenerator />;
      default:
        return <WeatherModule />;
    }
  };

  return (
    <div className="w-64 mx-auto bg-blue-200 p-4 rounded-lg">


      {/* Header */}
      <header className="w-full py-5 text-center bg-white/50 backdrop-blur-md shadow-md sticky top-0 z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 drop-shadow-sm">
          🌐 InfoHub Dashboard
        </h1>
      </header>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={() => setActiveTab("weather")}
          className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold transition-all ${
            activeTab === "weather"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-blue-600 border border-blue-400 hover:bg-blue-100"
          }`}
        >
          🌦️ Weather
        </button>

        <button
          onClick={() => setActiveTab("currency")}
          className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold transition-all ${
            activeTab === "currency"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-white text-green-600 border border-green-400 hover:bg-green-100"
          }`}
        >
          💸 Currency
        </button>

        <button
          onClick={() => setActiveTab("quotes")}
          className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold transition-all ${
            activeTab === "quotes"
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-white text-purple-600 border border-purple-400 hover:bg-purple-100"
          }`}
        >
          📝 Quotes
        </button>
      </div>

      {/* Active Section */}
      <main className="w-full max-w-5xl p-6 md:p-10 flex justify-center">
        <div className="w-full">{renderContent()}</div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-600 py-4 mt-auto">
        <p>Made with 💙 by InfoHub | © 2025</p>
      </footer>
    </div>
  );
}

export default App;
