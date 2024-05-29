const express = require('express');
const cors = require('cors');

const axios = require('axios');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = require("./models");

const today = new Date();
const year = today.getFullYear();
const API_URL= `https://api.aladhan.com/v1/calendarByCity/${year}?city=Toronto&country=Canada&method=15`;

const fetchDataAndInsert = async () => {
  try {
    const response = await axios.get(API_URL); // Replace with your actual API endpoint
    const entireData = response.data.data;
for(const months in entireData)
  {
    const datasets = entireData[months];
    for(const dataset of datasets)
      {
        const day = dataset.date.gregorian.day;
          const month = dataset.date.gregorian.month.number;
          const year = dataset.date.gregorian.year;
          const date = year + "-" + month + "-" + day;
          const timingsData = dataset.timings;
          const timingswithDate= {date, ...timingsData};
          const existingTiming = await db.Timings.findOne({
           where: { date }
         });
         if(!existingTiming){
           // Insert a new record
           await db.Timings.create(timingswithDate);
           console.log('Data successfully inserted into the database');
         }
      }
   
  }
    // const day = response.data.data.date.gregorian.day;
    // const month = response.data.data.date.gregorian.month.number;
    // const year = response.data.data.date.gregorian.year;
    // const date = year + "-" + month + "-" + day;
    // const timingsData = response.data.data.timings;
    // console.log(timingsData);
    // console.log(date);
    // const timingswithDate= {date, ...timingsData};

    //await db.Timings.create(timingswithDate);

    console.log('Data successfully fetched and inserted into the database');
  } catch (error) {
    console.error('Error fetching data or inserting into the database', error);
  }
};

db.sequelize.sync().then(()=> {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    fetchDataAndInsert();
  });
});
