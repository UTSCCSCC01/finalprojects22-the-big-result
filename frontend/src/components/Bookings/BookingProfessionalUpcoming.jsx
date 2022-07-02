import "../Card.css";
import "./Bookings.css";

function BookingProfessionalUpcoming(props) {
  return(
    <div class="booking-card card">
      <div className="metadata">
        <img src={props.picURL} alt={props.service} />
        <div className="metadata-text">
          <h2 className="highlight">{props.service}</h2>
          <h3>Customer: {props.customer}</h3>
          <p>Date: {props.date}</p>
          <p>Time: {props.startTime} to {props.endTime}</p>
          <p>Location: {props.location}</p>
          <p>Price: ${props.price}</p>
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