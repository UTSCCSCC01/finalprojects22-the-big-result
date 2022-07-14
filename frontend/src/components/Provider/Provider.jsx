import "./Provider.css";
import "../Card.css";
import { Link, useNavigate } from "react-router-dom";

function Provider(props) {
  const navigate = useNavigate();
  return (
    <div className="provider-card card">
      <div
        onClick={() => navigate(`/profile/${props.id}`)}
        className="metadata"
      >
        <img src={props.profilePicURL} alt={props.name} />
        <div className="metadata-text">
          <h2 className="highlight">{props.name}</h2>
          <p className="svc-tag">{props.service}</p>
          <p>
            <b>Price:</b> {props.price}
          </p>
          <p>
            <b>Avg Rating:</b> {props.rating}
          </p>
          <p>
            <b>Location:</b> {props.location}
          </p>
          <p>{props.description}</p>
        </div>
      </div>
      <div className="desc">
        <div className="review-holder">
          <p>{props.review}</p>
        </div>
        <div className="btn-group">
          <Link to={`/c/booking/${props.id}`}>
            <button>Book Now!</button>
          </Link>
          <button className="transparent-btn">View Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Provider;
