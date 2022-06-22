import {useState} from 'react';
import './TimeSlots.css'
import axios from "axios";

// available slots - later on calculated dynamically
const times = ['08:00','09:00','10:00','14:00','15:00']


function TimeSlots(props) {

  const [selectedSlot, setSelectedSlot] = useState(null)
  const [date, setDate] = useState(props.date)

  // submitting a timeslot
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:5000/booking`,
      data: {
        date: props.date.toDateString(),
        time: selectedSlot
      },
    })
      .then((res) => {
        // go to booking tab when selecting a timeslot and clicking Book! button
        window.location = "/booking";
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  };

  // TODO: instead of msg transfer them to another page for booking
  return (
  <div className="times">
    {times.map((time) => (
        <button onClick={(e)=> setSelectedSlot(e.target.innerText)}> {time} </button>
      ))}
        <div>
          Booking appointment for {selectedSlot} {props.date.toDateString()} </div>
      <form id="login-form" className="form" onSubmit={handleSubmit}>
        <button className='book-button' type="submit">Book!</button>
      </form>
  </div>
    )
}

export default TimeSlots;
