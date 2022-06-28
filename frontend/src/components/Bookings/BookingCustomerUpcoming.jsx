import "./Booking.css";
import "../Card.css";

function BookingCustomerUpcoming(props) {
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
            <p>on {props.date}</p>
            <p>at {props.time}</p>
            <p>for cost of ${props.cost}
            </p>
            {/* <p>{props.description}</p>   */}
          </div>
        </div>
        <div className="desc">
          {/* <div className="review-holder">
            <p>Sample long review to test how it looks after wrapping around</p>
          </div> */}
          <div className="btn-group">
            <button>Reschedule</button>
            <button>Cancel</button>
            <button className="transparent-btn">About Professional</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default BookingCustomerUpcoming;