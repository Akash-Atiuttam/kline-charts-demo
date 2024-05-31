import React from 'react';
import KlineCharts from './components/KlineCharts';
import './App.css';

const App = () => {
  return (
    <div>
     <KlineCharts symbol='IBM'/>
    </div>
  );
}

export default App;