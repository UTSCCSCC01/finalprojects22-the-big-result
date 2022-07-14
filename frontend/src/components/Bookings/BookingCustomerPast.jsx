import { Link } from "react-router-dom";

import "./Booking.css";
import "../Card.css";

function BookingCustomerPast(props) {
    return (
      <div className="booking-card card">
        <div className="metadata">
          <img src={props.picURL} alt={props.provider} />
          <div className="metadata-text">
            <h2 className="highlight">{props.service}</h2>
            <h3>Provider: {props.provider}</h3>
            <p>Date: {props.date}</p>
            <p>Time: {props.startTime} to {props.endTime}</p>
            <p>Price: ${props.cost}</p>
            <p>Location: {props.location}</p>
            
            {/* <p>{props.description}</p>   */}
          </div>
        </div>
        <div className="desc">
          <div className="review-holder">
            {/* <p>{props.review}</p> */}
          </div>
          <div className="btn-group">
            {/* {props.type =="Past" ? <button>Book Again</button> : <button>Reschedule</button>}
            {props.type == "Past" ? <button>Leave a Review</button> : <button>Cancel</button>} */}
            <button>Book Again</button>
            {/* <button>Leave a Review</button> */}
            {props.review == "" ? <Link to="/c/leaveReview"><button>Leave A Review</button></Link> : <button>See My Review</button>}
            <button className="transparent-btn">About Professional</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default BookingCustomerPast;