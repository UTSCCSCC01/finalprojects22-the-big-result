import { useState, useEffect } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import "../components/Form.css";

function BookingConfirmation() {
  //separated these out into different states for ease, can combine into 1 if we want
  const [service, setService] = useState("hairstyling"); // TODO: change workflow so this can filled 
  const [provider, setProvider] = useState("Adam Young"); // TODO: fill in valid provider
  const [time, setTime] = useState(null);
  const [rate, setRate] = useState("");// TODO: change workflow so this can filled

  useEffect(() => {
    // TODO: make another endpoint to set a particular timeslot as booked - 
    // TODO: get professional name from that endpoint too 
    // TODO: get service name 
    // TODO: get $ rate from same endpoint
    // axios({
    //   method: "GET", url: `http://localhost:5000/getAvailabilitySlotInfo?`,
    //   headers: { 
    //     professionalId: "36",
    //     start: null,
    //    }
    // }).then((res) => {
    //   // TODO set the time, with setTime
    //   }).catch((err) => console.log(err));
  
  }, []);


  const onConfirmation = () => {
    // axios({
    //   method: "POST", url: `http://localhost:5000/addBooking?`,
    //   data: { 
    //     professionalId: "36",
    //     start: null,
    //     end: null,
    //     date: null
    //   }
    // }).then((res) => {
    //   // TODO 
    //   }).catch((err) => console.log(err));
  }

  const onMakeChanges = () => {
    window.location = "/c/calendar/view"; // go back to booking
  }

  return (
    <div className="page">
      <h2>Service</h2>
      <h2>Provider Name</h2>
      <p>Date: July 7, 2022</p>
      <p>Time: 4:00 PM</p>
      <p>Hourly Rate: $52.00</p>
      <form>
        <label for="payment-select">Select a payment method</label>
        <br />
        <br />
        <select id="payment-select">
          <option value="">Please choose an option</option>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
          <option value="paypal">Paypal</option>
        </select>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="btn-group">
          <button type="submit" onClick={onConfirmation}>Confirm Details</button>
          <button onClick={onMakeChanges}>Make Changes</button>
        </div>
      </form>
    </div>
  );
}

export default BookingConfirmation;
