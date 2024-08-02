import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../styles/HomePage.css';
import dclogo from './dc.png';

function HomePage({ prayerTimes, changedprayer }) {
    const prayerTimess = {
      Fajr: "05:15",
      Zuhr: "13:45",
      Asr: "18:09",
      Maghrib: "16:40", // Replace with actual time if available
      Isha: "16:07",
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
          const timeString = prayerTimess["Asr"];
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
        <th>Current Times</th>
        <th>From {new Date(changedprayer.date).toLocaleString('default', { month: 'long' })} {new Date(changedprayer.date).getDay()}</th> 
      </tr>
    </thead>
    <tbody>

      <tr>
        <td id = "prayerName">Fajr</td>
        <td className={`${blink["Fajr"] ? 'blink' : ''} ${darken["Fajr"] ? 'darken' : ''}`}>{prayerTimes.Fajr} am</td>
        <td>{changedprayer.Fajr} am</td>
      </tr>

      <tr>
      <td id = "prayerName">Zuhr</td>
        <td className={`${blink["Zuhr"] ? 'blink' : ''} ${darken["Zuhr"] ? 'darken' : ''}`}>{prayerTimes.Zuhr} pm</td>
        <td>{changedprayer.Zuhr} pm </td>
      </tr>
      <tr>
      <td id = "prayerName">Asr</td>
        <td className={`${blink["Asr"] ? 'blink' : ''} ${darken["Asr"] ? 'darken' : ''}`}>{prayerTimes.Asr} pm</td>
        <td>{changedprayer.Asr} pm</td>
      </tr>
      <tr>
      <td id = "prayerName">Maghrib</td>
        <td className={`${blink["Maghrib"] ? 'blink' : ''} ${darken["Maghrib"] ? 'darken' : ''}`}>{prayerTimes.Maghrib} pm </td>
        <td>{changedprayer.Maghrib} pm </td>
      </tr>
      <tr>
      <td id = "prayerName">Isha</td>
        <td className={`${blink["Isha"] ? 'blink' : ''} ${darken["Isha"] ? 'darken' : ''}`}>{prayerTimes.Isha} pm </td>
        <td>{changedprayer.Isha} pm </td>
      </tr>

    </tbody>

  </table>
  <br></br>
  <table id="prayerTimesTable"  >
    <thead>
      <tr>
        <th>Jummah Prayers</th>
        <th>1st Prayer</th>
        <th>2nd Prayer</th> 
      </tr>
    </thead>
    <tbody>

      <tr>
        <td id = "prayerName">Khutbah</td>
        <td> 1:00 pm</td>
        <td>2:00 pm</td>
      </tr>


    </tbody>
  </table>

    </div>

  );
}

export default HomePage;