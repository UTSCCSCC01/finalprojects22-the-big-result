import { useEffect, useState } from "react";
import "./Review.css";
import "../Card.css";

function Review(props) {
  return (
    <div className="review card">
      <div className="review-img-container">
        <img src={props.imageLink} alt={props.reviewedBy}></img>
        <h4>{props.reviewedBy}</h4>
      </div>
      <div className="review-text">
        <h2 id="rating">Rating: {props.rating}</h2>
        <p className="svc-tag">{props.service}</p>
        <p>{props.reviewDescription}</p>
      </div>
    </div>
  );
}

export default Review;
