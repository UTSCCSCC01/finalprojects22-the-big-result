import axios from 'axios';
import { useState } from 'react';


function Book() {
   // maybe make this a Date object?
   const [bookYear, setBookYear] = useState(null);
   const [bookMonth, setBookMonth] = useState(null);
   const [bookDate, setBookDate] = useState(null);
   const [bookTime, setBookTime] = useState(null);


  axios({
    method: "GET",
    url: `http://localhost:5000/booking`,
  }).then((res) => {
      // todo: combine month and year as BookingData
      console.log(res.data);
      // const month = res.data.month;
      // const year = res.data.year;
      const date = res.data.date;
      const time = res.data.time;
      console.log(res.data, "HEREEE")
      // setBookMonth(month);
      setBookYear(date);
      setBookTime(time);
  }).catch((err) => {
    console.log(err);
  });

  return (
    <div>
      <h2>Booking page!</h2>
      <p>{bookTime} {bookDate} {bookMonth} {bookYear}</p>
    </div>
  );
}

export default Book;