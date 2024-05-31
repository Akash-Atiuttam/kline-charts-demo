import React, { useEffect, useRef, useState } from 'react';
import { init, dispose } from 'klinecharts';
import { fetchKlineData } from '../services/chartData';

const KlineCharts = ( {symbol} ) => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchKlineData( {symbol} );  
        if (chartRef.current) {
          const chart = init(chartRef.current);
          chart.applyNewData(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (chartRef.current) {
        dispose(chartRef.current);
      }
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '500px' }}
    />
  );
}

export default KlineCharts;
