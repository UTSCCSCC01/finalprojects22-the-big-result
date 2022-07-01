import { useState } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import "../components/Form.css";

function BookingConfirmation() {
  //separated these out into different states for ease, can combine into 1 if we want
  const [service, setService] = useState("");
  const [provider, setProvider] = useState("");
  const [time, setTime] = useState("");
  const [rate, setRate] = useState("");
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
          <button type="submit">Confirm Details</button>
          <button>Make Changes</button>
        </div>
      </form>
    </div>
  );
}

export default BookingConfirmation;
