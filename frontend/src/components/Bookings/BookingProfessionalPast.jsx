import "../Card.css";
import "./Bookings.css";

function BookingProfessionalPast(props) {
  return(
    <div class="booking-card card">
      <div className="metadata">
        <img src={props.picURL} alt={props.service} />
        <div className="metadata-text">
          <h2 className="highlight">{props.service}</h2>
          <h3>with {props.customer}</h3>
          <p>was on {props.date}</p>
          <p>at {props.time}</p>
          <p>at {props.location}</p>
          <p>for cost of ${props.price}</p>
        </div>
      </div>
    </div>
  )
}

export default BookingProfessionalPast;
