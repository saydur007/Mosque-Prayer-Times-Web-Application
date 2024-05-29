import React from 'react';
import '../styles/HomePage.css'

function HomePage({ prayerTimes }) {
    console.log(prayerTimes.Fajr);
  return (
    <div className="home-page">
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
        <td>{prayerTimes.Dhuhr}</td>
        <td>{prayerTimes.Dhuhr}</td>
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
        <td>{prayerTimes.Isha}</td>
        <td>{prayerTimes.Isha}</td>
      </tr>

    </tbody>
  </table>
    </div>

  );
}

export default HomePage;