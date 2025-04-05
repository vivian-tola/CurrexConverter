import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Currency Converter</h1>
        <p className="text-xl text-gray-600 mb-8">
          The simplest way to convert currencies with real-time exchange rates
        </p>
        <Link 
          to="/converter" 
          className="bg-yellow-400 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600"
        >
          Start Converting
        </Link>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Real-Time Rates</h2>
          <p className="text-gray-600">
            Get the latest exchange rates updated in real-time from reliable sources.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Multiple Currencies</h2>
          <p className="text-gray-600">
            Convert between a wide range of international currencies with ease.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Daily Updates</h2>
          <p className="text-gray-600">
            Stay informed with our blog featuring daily rate updates and analysis.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Latest Exchange Rates</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { code: 'USD', name: 'US Dollar', rate: '1.00' },
            { code: 'EUR', name: 'Euro', rate: '0.92' },
            { code: 'GBP', name: 'British Pound', rate: '0.78' },
            { code: 'JPY', name: 'Japanese Yen', rate: '151.23' }
          ].map(currency => (
            <div key={currency.code} className="bg-white p-4 rounded shadow">
              <div className="font-semibold">{currency.code}</div>
              <div className="text-sm text-gray-600">{currency.name}</div>
              <div className="text-lg font-bold mt-2">{currency.rate}</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link 
            to="/blog" 
            className="text-yellow-500 font-semibold hover:underline"
          >
            View all rates and daily updates →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;