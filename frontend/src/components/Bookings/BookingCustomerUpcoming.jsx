import "./Booking.css";
import "../Card.css";
import { useContext } from "react";
import { cancelBooking, getUsersMe } from "../../APICalls"
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

function BookingCustomerUpcoming(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const onCancelBooking = () => {
    getUsersMe({ 
      Authorization: `Bearer ${ user.access_token }` 
    }).then(() => {
      let text = "Are you sure you want to cancel this booking with provider " + 
        props.provider + " on " + 
        props.startTime + ", " + 
        props.date + "?\n";
      if (window.confirm(text)) {
        cancelBooking({ 
          id: props.id // booking id selected
        }).then(() => { 
          navigate("/c/pastAndCancelledBookings");
        }).catch((err) => console.log(err));
      }    
    });
  }

  return (
    <div className="booking-card card">
      <div className="metadata">
        <img src={props.picURL} alt={props.provider} />
        <div className="metadata-text">
          <h2 className="highlight">{props.service}</h2>
          <h3>Provider: {props.provider}</h3>
          <p>Date: {props.date}</p>
          <p>
            Time: {props.startTime} to {props.endTime}
          </p>
          <p>Price: ${props.cost}</p>
        </div>
      </div>
      <div className="desc">
        <div className="btn-group">
          <Link to={`/c/booking/${props.providerId}/${props.id}?service=${props.service}`}>
            <button>Reschedule</button>
          </Link>
          <button onClick={onCancelBooking}>Cancel</button>
          <button className="transparent-btn">About Professional</button>
        </div>
      </div>
    </div>
  );
}

export default BookingCustomerUpcoming;
