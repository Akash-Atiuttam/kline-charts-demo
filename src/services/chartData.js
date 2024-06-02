import axios from 'axios';

const fetchKlineData = async (interval, symbol = 'BTC') => {
  let endpoint;
  let params = {
    fsym: symbol,
    tsym: 'USD',
    limit: 30,
  };

  switch (interval) {
    case 'hour':
      endpoint = 'https://min-api.cryptocompare.com/data/v2/histohour';
      break;
    case 'minute':
      endpoint = 'https://min-api.cryptocompare.com/data/v2/histominute';
      break;
    case 'day':
    default:
      endpoint = 'https://min-api.cryptocompare.com/data/v2/histoday';
      break;
  }

  try {
    const response = await axios.get(endpoint, { params });
    return response.data.Data.Data.map(item => ({
      timestamp: item.time * 1000,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volumeto
    }));
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export { fetchKlineData };
