import "../Card.css";
import "./Bookings.css";

function BookingCustomerCancelled(props) {
  return(
    <div className="cancelled-card card">
      <div className="metadata">
        <img src={props.picURL} alt={props.service} />
        <div className="metadata-text">
          <h2 className="highlight">{props.service}</h2>
          <h3>Provider: {props.provider}</h3>
          <p>Date: {props.date}</p>
          <p>Time: {props.startTime} to {props.endTime}</p>
          <p>Location: {props.location}</p>
          <p>Price: ${props.price}</p>
        </div>
      </div>
    </div>
  )
}

export default BookingCustomerCancelled;