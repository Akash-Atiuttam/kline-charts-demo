import React, { useEffect, useRef, useState } from 'react';
import { init, dispose } from 'klinecharts';
import { fetchKlineData } from '../services/chartData';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
  Paper
} from '@mui/material';

const KlineCharts = ({ symbols }) => {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interval, setInterval] = useState('day');
  const [chartType, setChartType] = useState('candlestick');
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);

  useEffect(() => {
    const chart = init(chartRef.current);
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchKlineData(interval, selectedSymbol);
        chart.applyNewData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      dispose(chartRef.current);
    };
  }, [interval, chartType, selectedSymbol]);

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="center" mb={4}>
        <FormControl variant="outlined" sx={{ minWidth: 120, marginRight: 2 }}>
          <InputLabel>Select Symbol</InputLabel>
          <Select
            value={selectedSymbol}
            onChange={handleSymbolChange}
            label="Select Symbol"
          >
            {symbols.map(symbol => (
              <MenuItem key={symbol} value={symbol}>{symbol}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 120, marginRight: 2 }}>
          <InputLabel>Select Interval</InputLabel>
          <Select
            value={interval}
            onChange={handleIntervalChange}
            label="Select Interval"
          >
            <MenuItem value="day">Day</MenuItem>
            <MenuItem value="hour">Hour</MenuItem>
            <MenuItem value="minute">Minute</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Select Chart Type</InputLabel>
          <Select
            value={chartType}
            onChange={handleChartTypeChange}
            label="Select Chart Type"
          >
            <MenuItem value="candlestick">Candlestick</MenuItem>
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="area">Area</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Paper elevation={3} sx={{ padding: 2, height: '500px' }}>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        <Box ref={chartRef} sx={{ height: '100%', width: '100%' }} />
      </Paper>
    </Box>
  );
};

export default KlineCharts;
