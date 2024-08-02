import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import { fetchPrayerTimess } from './apitest';
import { fetchPrayerTimes } from './api';

function App() {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [changedTime, setChangedTime] = useState([]);

  useEffect(() => {
    const fetchPrayerData = async () => {
      const data = await fetchPrayerTimes();
      setPrayerTimes(data);
    };
    fetchPrayerData();
    const intervalId = setInterval(fetchPrayerData, 10 * 10 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchChangedTime = async () => {
      const data = await fetchPrayerTimess();
      setChangedTime(data);
    };
    fetchChangedTime();
    const intervalId = setInterval(fetchChangedTime, 10 * 10 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  console.log(prayerTimes);
  console.log(changedTime);

  return (
    <div className="App">
      <HomePage prayerTimes={prayerTimes} changedprayer = {changedTime} />
      <br></br>
      <div id="scroll-container">
        <div id="scroll-text">Assalamualaikum Warahmatullahi Wabarakatuh. Welcome to Dawah Centre.</div>
      </div>
    </div>
  );
}

export default App;