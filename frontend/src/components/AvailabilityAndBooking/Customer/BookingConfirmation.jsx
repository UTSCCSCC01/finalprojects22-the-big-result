import { useState, useContext } from "react";
import "../../Form.css";
import { Link } from "react-router-dom";
import { addBookings, getUsersMe } from "../../../APICalls"
import { AuthContext } from "../../../context/AuthProvider";

function BookingConfirmation(props) {
  const [instructions, setInstructions] = useState('');
  const { user } = useContext(AuthContext);

  const onConfirmation = () => {
    getUsersMe({ 
      Authorization: `Bearer ${ user.access_token }` 
    }).then((res) => {
      console.log('id of customer:', res.data.id);
      addBookings({...props.bookingInfo, 
        instructions: instructions 
     }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <h2>Service: {props.bookingInfo.service}</h2>
      <h2>Provider Name: {props.bookingInfo.providerName}</h2>
      <p>Date: {props.bookingInfo.date}</p>
      <p>From: {props.bookingInfo.start} to {props.bookingInfo.end}</p>
      <p>Hourly Rate: {props.bookingInfo.cost}</p>
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
        <textarea placeholder="Enter your instruction here." value={instructions} onChange={(e) => setInstructions(e.target.value)}></textarea>
      </form>
      {/* TODO: styling put in CSS  */}
      <button onClick={onConfirmation} style={{'padding':'10px 100px', 'margin': '10px 25px', 'color': 'white'}}><Link to={`/c/upcomingBookings`}>Confirm Details</Link></button>
      <button style={{'padding':'10px 100px', 'margin': '10px 25px'}}><Link to={`/`}>Cancel</Link></button>
    </div>
  );
}

export default BookingConfirmation;
