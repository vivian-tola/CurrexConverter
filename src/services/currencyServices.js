const API_KEY = 'demo'; // For real app, use your API key from environment variables
const BASE_URL = 'https://open.er-api.com/v6/latest/USD';

export const getCurrencyRates = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch currency rates');
    }
    
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    
    // Return mock data as fallback
    return {
      EUR: 0.92,
      GBP: 0.78,
      JPY: 151.23,
      AUD: 1.52,
      CAD: 1.36,
      CHF: 0.89,
      CNY: 7.24,
      INR: 83.45,
      MXN: 17.28,
      SGD: 1.35,
      NZD: 1.66
    };
  }
};
