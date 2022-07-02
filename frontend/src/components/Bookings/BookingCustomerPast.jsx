import "./Booking.css";
import "../Card.css";

function BookingCustomerPast(props) {
    return (
      <div
        onClick={() => (window.location = "/booking")}
        className="booking-card card"
      >
        <div class="metadata">
          <img src={props.picURL} alt={props.provider} />
          <div className="metadata-text">
            <h2 className="highlight">{props.service}</h2>
            <h3>with {props.provider}</h3>
            <p>was on {props.date}</p>
            <p>from {props.startTime} to {props.endTime}</p>
            <p>for cost of ${props.cost}
            </p>
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
            {props.review == "" ? <button>Leave A Review</button> : <button>See My Review</button>}
            <button className="transparent-btn">About Professional</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default BookingCustomerPast;