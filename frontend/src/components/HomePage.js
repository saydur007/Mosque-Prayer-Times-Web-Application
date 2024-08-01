import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../styles/HomePage.css';
import dclogo from './dc.png';

function HomePage({ prayerTimes, changedprayer }) {
    const prayerTimess = {
      Fajr: "05:15",
      Zuhr: "13:45",
      Asr: "17:45",
      Maghrib: "Sunset", // Replace with actual time if available
      Isha: "11:58",
    };
  
    const [blink, setBlink] = useState({});
    const [darken, setDarken] = useState({});
    const [message, setMessage] = useState("");
    const [countdown, setCountdown] = useState({});
  
    useEffect(() => {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        const currentSeconds = currentMinutes * 60 + currentTime.getSeconds();
        
        Object.keys(prayerTimess).forEach(prayer => {
          const timeString = prayerTimess[prayer];
          const [hours, minutes] = timeString.split(":").map(Number);
          const prayerMinutes = hours * 60 + minutes;
          const prayerSeconds = prayerMinutes * 60;
  
          if (currentSeconds >= prayerSeconds + 180) {
            setBlink(prev => ({ ...prev, [prayer]: false }));
            setMessage("");
          } else if (currentSeconds >= prayerSeconds) {
            setBlink(prev => ({ ...prev, [prayer]: true }));
            setMessage("It is Time for Salah");
          } else if (currentSeconds >= prayerSeconds - 600) {
            setBlink(prev => ({ ...prev, [prayer]: false }));
  
            // Calculate the countdown
            const remainingSeconds = prayerSeconds - currentSeconds;
            const minutesRemaining = Math.floor(remainingSeconds / 60);
            const secondsRemaining = remainingSeconds % 60;
            const countdownString = `${minutesRemaining}m ${secondsRemaining}s`;
  
            setMessage(`Prayer soon: ${countdownString}`);
            setCountdown(prev => ({
              ...prev,
              [prayer]: countdownString,
            }));
          } else if (currentSeconds >= prayerSeconds - 900) {
            setBlink(prev => ({ ...prev, [prayer]: true }));
            setMessage("Time for Adhan");
          } else {
            setBlink(prev => ({ ...prev, [prayer]: false }));
            setCountdown(prev => ({
              ...prev,
              [prayer]: "",
            }));
          }
        });
      }, 1000);

      
  
  
      return () => clearInterval(interval);
    }, []);
  return (
    <div className={`home-page`}>
      <div>
      <div class="image">
        <img src={dclogo}></img>
      </div>
      </div>
      {message && <p className="message blinktext">{message}</p>}
      <table id="prayerTimesTable"  >
    <thead>
      <tr>
        <th>Prayers</th>
        <th>Before {}</th>
        <th>From {changedprayer.changedTime.nextChangeDate}</th> 
      </tr>
    </thead>
    <tbody>

      <tr>
        <td id = "prayerName">Fajr</td>
        <td>{prayerTimes.Fajr}</td>
        <td>{changedprayer.changedTime.Fajr}</td>
      </tr>

      <tr>
      <td id = "prayerName">Zuhr</td>
        <td>{prayerTimes.Zuhr}</td>
        <td>{changedprayer.changedTime.Zuhr}</td>
      </tr>
      <tr>
      <td id = "prayerName">Asr</td>
        <td>{prayerTimes.Asr}</td>
        <td>{changedprayer.changedTime.Asr}</td>
      </tr>
      <tr>
      <td id = "prayerName">Maghrib</td>
        <td>{prayerTimes.Maghrib}</td>
        <td>{changedprayer.changedTime.Maghrib}</td>
      </tr>
      <tr>
      <td id = "prayerName">Isha</td>
        <td className={`${blink["Isha"] ? 'blink' : ''} ${darken["Isha"] ? 'darken' : ''}`}>{prayerTimes.Isha} </td>
        <td>{changedprayer.changedTime.Isha}</td>
      </tr>

    </tbody>
  </table>

    </div>

  );
}

export default HomePage;