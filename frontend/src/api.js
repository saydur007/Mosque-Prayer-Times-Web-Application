const today = new Date();
const year = today.getFullYear();
const month = today.getMonth()+1;
const date = today.getDate();
const full_date= date + "-" + month + "-" + year;
const API_URL= `https://api.aladhan.com/v1/timingsByCity/${full_date}?city=Toronto&country=Canada&method=15`;

export const fetchPrayerTimes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(full_date);
      console.log(data.data.timings);
      return data;
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      return [];
    }
  };