import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import EditPrayerTimes from './components/EditPrayerTimes';
import { fetchPrayerTimess } from './apitest';
import { fetchPrayerTimes } from './api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [changedTime, setChangedTime] = useState([]);
  const [wakeLock, setWakeLock] = useState(null);

  useEffect(() => {
    const fetchPrayerData = async () => {
      const data = await fetchPrayerTimes();
      setPrayerTimes(data);
    };
    const fetchChangedTime = async () => {
      const data = await fetchPrayerTimess();
      setChangedTime(data);
    };
    fetchPrayerData();
    fetchChangedTime();
    const intervalId = setInterval(() => {
      fetchPrayerData();
      fetchChangedTime();
    }, 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        const wakeLock = await navigator.wakeLock.request('screen');
        setWakeLock(wakeLock);
        wakeLock.addEventListener('release', () => {
          console.log('Screen Wake Lock released:', wakeLock.released);
        });
        console.log('Screen Wake Lock acquired:', wakeLock.released);
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };

    if ('wakeLock' in navigator) {
      requestWakeLock();
    }

    return () => {
      if (wakeLock !== null) {
        wakeLock.release().then(() => {
          setWakeLock(null);
        });
      }
    };
  }, [wakeLock]);

  console.log(prayerTimes);
  console.log(changedTime);

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage prayerTimes={prayerTimes} changedprayer={changedTime} />} />
        <Route path="/edit" element={<EditPrayerTimes prayerTimes={prayerTimes} changedprayer={changedTime} />} />
        </Routes>
      
      <br></br>
      <div id="scroll-container">
        <div id="scroll-text">Questions and Queries? Reach out to us at (647)512-0920.&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  "Successful indeed are the believers: those who humble themselves in prayer"(Quran, 23:1-2)        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;           Donate online at islaminfo.com/donate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "The best of the men’s rows are the first and the worst are the last, while the best of the women’s rows are the last and the worst are the first.’" (Muslim)&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  </div>
      </div>
    </Router>
    </div>
  );
}

export default App;