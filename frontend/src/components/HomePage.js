import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../styles/HomePage.css'

function HomePage({ prayerTimes }) {
  const [isNearPrayerTime, setIsNearPrayerTime] = useState([]);
  const [isPrayerTime, setIsPrayerTime] = useState([]);

  useEffect(() => {
    const checkPrayerTimes = () => {
      const now = moment().seconds(0).milliseconds(0); 
      const fajr = moment(prayerTimes.Fajr, 'HH:mm');
      const zuhr = moment(prayerTimes.Zuhr, 'HH:mm');
      const asr = moment(prayerTimes.Asr, 'HH:mm');
      const isha = moment('11:40', 'HH:mm');
      const ishablink = moment('11:20', 'HH:mm');
      console.log(now, ishablink);
      // Add other prayer times here...
console.log(now.isSameOrAfter(ishablink));
      const isNear = (now.isSameOrAfter(ishablink) && !now.isSameOrAfter(isha));
                     // Add other prayer times here...
console.log(isNear);
      const isTime = now.isSameOrAfter(fajr) || now.isSameOrAfter(zuhr) || now.isSameOrAfter(asr) || now.isSameOrAfter(isha);
                     // Add other prayer times here...
console.log(isTime);
      setIsNearPrayerTime(isNear);
      setIsPrayerTime(isTime);
    };

    const intervalId = setInterval(checkPrayerTimes, 1000); // Check every second

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [prayerTimes]);

  const timeClass = isPrayerTime ? 'red' : isNearPrayerTime ? 'blink' : '';
  return (
    <div className={`home-page ${timeClass}`}>
      <h1>Prayer Times</h1>
      <table class="table table-fixed table-bordered">
    <thead>
      <tr>
        <th>Prayers</th>
        <th>Until May 10th</th>
        <th>From May 11th</th>
      </tr>
    </thead>
    <tbody>

      <tr>
        <td>Fajr</td>
        <td>{prayerTimes.Fajr}</td>
        <td>{prayerTimes.Fajr}</td>
      </tr>

      <tr>
      <td>Zuhr</td>
        <td>{prayerTimes.Zuhr}</td>
        <td>{prayerTimes.Zuhr}</td>
      </tr>
      <tr>
      <td>Asr</td>
        <td>{prayerTimes.Asr}</td>
        <td>{prayerTimes.Asr}</td>
      </tr>
      <tr>
      <td>Maghrib</td>
        <td>{prayerTimes.Maghrib}</td>
        <td>{prayerTimes.Maghrib}</td>
      </tr>
      <tr>
      <td>Isha</td>
        <td className={`${timeClass}`}>{prayerTimes.Isha}</td>
        <td>{prayerTimes.Isha}</td>
      </tr>

    </tbody>
  </table>
    </div>

  );
}

export default HomePage;