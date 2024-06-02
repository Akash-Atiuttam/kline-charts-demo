import React from 'react';
import KlineCharts from './components/KlineCharts';

const App = () => {
  const symbols = ['BTC', 'ETH', 'LTC', 'XRP', 'ADA']; // Add more symbols as needed

  return (
    <div className="App">
      <KlineCharts symbols={symbols} />
    </div>
  );
};

export default App;
