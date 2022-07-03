import { useState, useEffect } from "react";
import "../../Form.css";

import axios from "axios";

function BookingConfirmation(props) {

  useEffect(() => { 
    console.log('got props...', props.bookingInfo);
  }, []);

  const onConfirmation = () => {
    axios({ 
      method: "POST", url: "http://localhost:5000/addBookings",
      data: { 
        professionalId: props.bookingInfo.professionalId, 
        start: props.bookingInfo.start,
        end: props.bookingInfo.end,
        date: props.bookingInfo.date,
        location: props.bookingInfo.location,
        price: props.bookingInfo.price,
        customerId: props.bookingInfo.customerId,
        serviceName: props.bookingInfo.serviceName,
        instructions: props.bookingInfo.instructions
      }
     }).then((res) => {
      window.location = "/c/booking";
     }
     ).catch((err) => {
        console.log(err);
      });
  }

  const onMakeChanges = () => {
    window.location = "/c/booking";
  }

  // TODO: get the professional name instead of id
  return (
    <div className="page">
      <h2>Service: {props.bookingInfo.serviceName}</h2>
      <h2>Provider Name: {props.bookingInfo.professionalId}</h2>
      <p>Date: {props.bookingInfo.date}</p>
      <p>From: {props.bookingInfo.start} to {props.bookingInfo.end}</p>
      <p>Hourly Rate: {props.bookingInfo.price}</p>
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
      </form>
      <button onClick={onConfirmation} style={{'padding':'10px 100px', 'margin': '10px 25px'}}>Confirm Details</button>
      <button onClick={onMakeChanges} style={{'padding':'10px 100px', 'margin': '10px 25px'}}>Make Changes</button>
    </div>
  );
}

export default BookingConfirmation;
