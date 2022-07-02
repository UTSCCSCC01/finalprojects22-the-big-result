import "../Card.css";
import "./Bookings.css";

function BookingProfessionalUpcoming(props) {
  return(
    <div class="booking-card card">
      <div className="metadata">
        <img src={props.picURL} alt={props.service} />
        <div className="metadata-text">
          <h2 className="highlight">{props.service}</h2>
          <h3>with {props.customer}</h3>
          <p>on {props.date}</p>
          <p>from {props.startTime} to {props.endTime}</p>
          <p>at {props.location}</p>
          <p>for cost of ${props.price}</p>
        </div>
      </div>
      <div className="desc">
        <div className="btn-group">
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default BookingProfessionalUpcoming;