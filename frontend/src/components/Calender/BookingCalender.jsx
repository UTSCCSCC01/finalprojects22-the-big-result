import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./BookingCalender.css";
import TimeSlots from './TimeSlots';


// TODO: db
// booked

function BookingCalender() {
  const [date, setDate] = useState(new Date());

  console.log(date);
  console.log(date.getUTCMonth() + 1); // so months are between 1-12
  console.log(date.getUTCFullYear());


  // TODO: give user type as well as 
  return (
    <div className='center'>
      <h2>Bookings</h2>
      <div className='calendar-container center'>
        <Calendar onChange={setDate} value={date} />
        <TimeSlots date={date} userType="customer"/>
      </div>
      <p>{date.toDateString()}</p>
    </div>
  );
}

export default BookingCalender;