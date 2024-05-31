const API_KEY = 'VJSRZ9DD4HT9HA2E';  
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchKlineData = async (symbol) => {
  const response = await fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`);
  const data = await response.json();
  if (data['Time Series (Daily)']) {
    const timeSeries = data['Time Series (Daily)'];
    return Object.keys(timeSeries).map(date => ({
      timestamp: new Date(date).getTime(),
      open: parseFloat(timeSeries[date]['1. open']),
      high: parseFloat(timeSeries[date]['2. high']),
      low: parseFloat(timeSeries[date]['3. low']),
      close: parseFloat(timeSeries[date]['4. close']),
    }));
  }
  throw new Error('Failed to fetch data');
};
