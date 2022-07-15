import { useEffect, useState, useContext } from "react";
import { useLocation, Link } from 'react-router-dom';
import { Rating } from "@mui/material";

import { getUsersMe, addReview } from "../../APICalls";
import { AuthContext } from "../../context/AuthProvider";

import "../Form.css";
import "./LeaveReview.css";

function LeaveReview(props) {
  const { user } = useContext(AuthContext);
  const [id, setId] = useState(null);
  const [reviewForm, setReviewForm] = useState({rating: 5, description: ""});
  const [reviewDone, setReviewDone] = useState(false);

  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    // get current user's id
    getUsersMe({
      Authorization: `Bearer ${ user.access_token }` 
    }).then((res) => {
      console.log(res.data.id, "id of the customer making review");
      setId(res.data.id);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(reviewForm);
    // console.log("data booking id " + data.bookingId);
    // console.log("data prof id " + data.providerId);
    // console.log("cur user (cust) id " + id);

    addReview({
      bookingId: data.bookingId,
      professionalId: data.providerId,
      customerId: id,
      description: reviewForm.description,
      rating: reviewForm.rating
    })
      .then(() => {
        setReviewDone(true);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setReviewForm((prevReview) => ({
      ...prevReview,
      [name]: value,
    }))
  }

  const makeReviewComponent = () => {
    return (
      <div className="add-review">
        <h1>Leave a review</h1>
        <form id="review-form" className="form" onSubmit={handleSubmit}>
          <div className="rating">
            <label for="rating">Rating:</label>
            <Rating 
              name="rating"
              value={reviewForm.rating}
              onChange={handleChange}
            />
          </div>
          {/* <label for="description">What did you think?</label> */}
          <textarea
            name="description"
            placeholder="What did you think?"
            value={reviewForm.description}
            onChange={handleChange}
            required />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    )
  }

  return (
    <div id="add-review-page" className="page">
      {reviewDone ? <p className="">Thanks for the review! <Link to="/c/pastAndCancelledBookings">Return to past bookings.</Link></p>: makeReviewComponent()}
    </div>
  );
}

export default LeaveReview;