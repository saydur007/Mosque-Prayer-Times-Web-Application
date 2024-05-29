
import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import { fetchPrayerTimes } from './api';

function App() {
  const [prayerTimes, setPrayerTimes] = useState([]);

  useEffect(() => {
    const fetchPrayerData = async () => {
      const data = await fetchPrayerTimes();
      setPrayerTimes(data.data.timings);
    };
    fetchPrayerData();
    const intervalId = setInterval(fetchPrayerData, 12 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  console.log(prayerTimes);
  return (
    <div className="App">
      <HomePage prayerTimes={prayerTimes}/>
     
      <div id="scroll-container">
  <div id="scroll-text">This is just a test. Any donation for Muslim Media Hub. Can we start with 500?</div>
</div>
    </div>
    
  );
}

export default App;
