import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import dclogo from './dc.png';
function HomePage({ prayerTimes, changedprayer }) {
 
 const [showJummah, setShowJummah] = useState(true);
 let time  = new Date().toLocaleTimeString()

//  const [ctime,setTime] = useState(time)
//  const UpdateTime=()=>{
//    time =  new Date().toLocaleTimeString()
//    setTime(time)
//  }
 //setInterval(UpdateTime)
  useEffect(() => {
    const interval = setInterval(() => {
      setShowJummah(prevShowJummah => !prevShowJummah);
    }, 10000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`home-page`}>
   
      <div className="container">
      <div class="image">
        <img src={dclogo}></img>
        {/* <div className="clock">
        {ctime} </div> */}
      </div>
      </div>
      <table id="prayerTimesTable"  >
    <thead>
      <tr>
        <th>Prayers</th>
        <th>Jama'ah Times</th>
        <th>From {new Date(changedprayer.date+"T00:00:00-05:00").toLocaleString('default', { month: 'long' })} {new Date(changedprayer.date+"T00:00:00-05:00").getDate() }</th>
      </tr>
    </thead>
    <tbody>

      <tr>
        <td id = "prayerName">Fajr</td>
        <td>{prayerTimes.Fajr} am</td>
        <td>{changedprayer.Fajr} am</td>
      </tr>

      <tr>
      <td id = "prayerName">Dhuhr</td>
        <td>{prayerTimes.Zuhr} pm</td>
        <td>{changedprayer.Zuhr} pm </td>
      </tr>
      <tr>
      <td id = "prayerName">Asr</td>
        <td>{prayerTimes.Asr} pm</td>
        <td>{changedprayer.Asr} pm</td>
      </tr>
      <tr>
      <td id = "prayerName">Maghrib</td>
        <td>{prayerTimes.Maghrib} pm </td>
        <td>{changedprayer.Maghrib} pm </td>
      </tr>
      <tr>
      <td id = "prayerName">Isha</td>
        <td>{prayerTimes.Isha} pm </td>
        <td>{changedprayer.Isha} pm </td>
      </tr>

    </tbody>

  </table>
  <br></br>
  {  <table id="prayerTimesTable">
          <thead>
            <tr>
              <th>Jumu'ah Prayers</th>
              <th>1st Prayer</th>
              <th>2nd Prayer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="prayerName">Khutbah</td>
              <td>1:00 pm</td>
              <td>2:00 pm</td>
            </tr>
          </tbody>
        </table>  }
    {/* {showJummah ? (
        <table id="prayerTimesTable">
          <thead>
            <tr>
              <th>Jummah Prayers</th>
              <th>1st Prayer</th>
              <th>2nd Prayer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="prayerName">Khutbah</td>
              <td>1:00 pm</td>
              <td>2:00 pm</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table id="prayerTimesTable">
          <thead>
            <tr>
              <th>EID Prayers</th>
              <th>1st Prayer</th>
              <th>2nd Prayer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="prayerName">Salah</td>
              <td>8:00 am</td>
              <td>10:00 am</td>
            </tr>
          </tbody>
        </table>
      )}   */}
 
    </div>
  );
}

export default HomePage;