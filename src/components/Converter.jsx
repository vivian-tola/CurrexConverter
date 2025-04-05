import React, { useState, useEffect } from "react";
import { getCurrencyRates } from "../services/currencyServices";

function Converter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Currency details with flag codes and names
  const currencies = [
    { code: "USD", name: "US Dollar", flag: "us" },
    { code: "EUR", name: "Euro", flag: "eu" },
    { code: "GBP", name: "British Pound", flag: "gb" },
    { code: "JPY", name: "Japanese Yen", flag: "jp" },
    { code: "AUD", name: "Australian Dollar", flag: "au" },
    { code: "CAD", name: "Canadian Dollar", flag: "ca" },
    { code: "CHF", name: "Swiss Franc", flag: "ch" },
    { code: "CNY", name: "Chinese Yuan", flag: "cn" },
    { code: "INR", name: "Indian Rupee", flag: "in" },
    { code: "MXN", name: "Mexican Peso", flag: "mx" },
    { code: "SGD", name: "Singapore Dollar", flag: "sg" },
    { code: "NZD", name: "New Zealand Dollar", flag: "nz" },
  ];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const fetchedRates = await getCurrencyRates();
        setRates(fetchedRates);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch currency rates. Please try again later.");
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const convertCurrency = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) {
      setResult(null);
      return;
    }

    let calculatedResult;

    // If base currency is USD (which has rate 1)
    if (fromCurrency === "USD") {
      calculatedResult = amount * rates[toCurrency];
    } else if (toCurrency === "USD") {
      calculatedResult = amount / rates[fromCurrency];
    } else {
      // Convert from the source currency to USD, then from USD to the target currency
      const amountInUSD = amount / rates[fromCurrency];
      calculatedResult = amountInUSD * rates[toCurrency];
    }

    setResult(calculatedResult);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getFlag = (code) => {
    const currency = currencies.find((c) => c.code === code);
    return currency ? currency.flag.toLowerCase() : "unknown";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Currency Converter
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-4">Loading currency rates...</div>
        ) : (
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="amount">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                min="0"
                step="any"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="fromCurrency"
                >
                  From
                </label>
                <div className="relative">
                  <select
                    id="fromCurrency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    {currencies.map((currency) => (
                      <option
                        key={`from-${currency.code}`}
                        value={currency.code}
                      >
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <img
                      src={`https://flagcdn.com/32x24/${getFlag(
                        fromCurrency
                      )}.png`}
                      alt={fromCurrency}
                      className="h-4 w-6"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="toCurrency"
                >
                  To
                </label>
                <div className="flex-1 flex items-center">
                  <div className="relative flex-1">
                    <select
                      id="toCurrency"
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      {currencies.map((currency) => (
                        <option
                          key={`to-${currency.code}`}
                          value={currency.code}
                        >
                          {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <img
                        src={`https://flagcdn.com/32x24/${getFlag(
                          toCurrency
                        )}.png`}
                        alt={toCurrency}
                        className="h-4 w-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                onClick={handleSwapCurrencies}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  ></path>
                </svg>
                Swap Currencies
              </button>
            </div>

            {result !== null && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="mb-2 flex items-center justify-center">
                    <img
                      src={`https://flagcdn.com/32x24/${getFlag(
                        fromCurrency
                      )}.png`}
                      alt={fromCurrency}
                      className="h-4 w-6 mr-2"
                    />
                    <span className="font-semibold">
                      {amount.toFixed(2)} {fromCurrency}
                    </span>
                    <span className="mx-2">=</span>
                    <img
                      src={`https://flagcdn.com/32x24/${getFlag(
                        toCurrency
                      )}.png`}
                      alt={toCurrency}
                      className="h-4 w-6 mr-2"
                    />
                    <span className="font-semibold">
                      {result.toFixed(2)} {toCurrency}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    1 {fromCurrency} ={" "}
                    {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)}{" "}
                    {toCurrency}
                  </div>
                  <div className="text-sm text-gray-600">
                    1 {toCurrency} ={" "}
                    {(rates[fromCurrency] / rates[toCurrency]).toFixed(4)}{" "}
                    {fromCurrency}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Converter;
