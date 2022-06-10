import { useEffect, useState } from 'react'
import "./Review.css";

function Review(props) {
  return(
    <div className="review">
      {/* <img src="https://picsum.photos/100"></img>
      <div className="review-text">
        <h2>ex service</h2>
        <h2>Rating: 1.2</h2>
        <h4>Review by: a person</h4>
        <p>Description of the review.</p>
      </div> */}

      <div className="review-img-container">
        <img src={props.imageLink}></img>
        <h4>Review by: {props.reviewedBy}</h4>
      </div>
      <div className="review-text">
        <div className="review-subhead">
          <h2>{props.service}</h2>
          <h2 id="rating">Rating: {props.rating}</h2>
        </div>
        <p>{props.reviewDescription}</p>
      </div>
    </div>
  );
}

export default Review;
