import "./Profile.css";
import Review from "../Review/Review";

function Profile(props) {

  return (
    <div id="profile" className="page">
      <div className="profile-container">
        <div className="profile-inner-container">
          <div className="img-container">
            <img
              className="profile-img"
              src={props.profilePictureLink}
              alt=""
            ></img>
          </div>

          <div className="description-container">
            <div className="name-review-container">
              <h1 className="highlight">{props.name}</h1>
              <h3>Rating: {props.rating}</h3>
            </div>
            <p>{props.description}</p>
            <p>{props.location}</p>
            <p className="svc-tag">{props.services}</p>
            <button>Book Now!</button>
          </div>
        </div>
      </div>
      <br />
      <div className="reviews-container">
        <h1>Reviews</h1>
        { props.length > 0 &&
          props.reviews.length > 0 &&
          props.reviews.map((review) => (
            <Review
              imageLink={review.imageLink}
              rating={review.rating}
              reviewDescription={review.reviewDescription}
              reviewedBy={review.reviewedBy}
              service={review.service}
            />
          ))}
        <br />
        <button>See All Reviews </button>
      </div>
    </div>
  );
}

export default Profile;
