import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Booking.css";
import "../Card.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "400px",
  padding: "20px",
  border: "2px solid black",
  p: 4,
};

function BookingCustomerPast(props) {
  const navigate = useNavigate();

  const [openReview, setOpenReview] = useState(false);
  const handleClose = () => {
    setOpenReview(false);
  };

  return (
    <div className="booking-card card">
      <div className="metadata">
        <img src={props.picURL} alt={props.provider} />
        <div className="metadata-text">
          <h2 className="highlight">{props.service}</h2>
          <h3>Provider: {props.provider}</h3>
          <p>Date: {props.date}</p>
          <p>Time: {props.startTime} to {props.endTime}</p>
          <p>Price: ${props.price}</p>
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
          <button onClick={() => navigate(`/c/booking/${props.providerId}?reschedule=1&id=${props.id}&cost=${props.cost}&service=${props.service}&providerName=${props.provider}`)}>Book Again</button>
          {/* <button>Leave a Review</button> */}
          {props.review == "" ? 
            <Link to="/c/leaveReview" state={{bookingId: props.bookingId, providerId: props.providerId}}><button>Leave A Review</button></Link> : 
            <button  onClick={() => setOpenReview(true)}>See My Review</button>}
            <button onClick={() => navigate(`/profile/${props.providerId}`)} className="transparent-btn">About Professional</button>
        </div>
      </div>

      <Modal open={openReview} onClose={handleClose} aria-labelledby="title">
        <Box sx={style}>
          <Typography id="title" variant="h6" component="h2">
            You said:
          </Typography>
          <Typography id="description" sx={{ mt: 2 }}>
            {props.review}
          </Typography>
        </Box>
      </Modal>

      
    </div>
  );
}

export default BookingCustomerPast;