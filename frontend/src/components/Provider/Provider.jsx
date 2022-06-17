import "./Provider.css";

function Provider(props) {
  return (
    <div
      onClick={() => (window.location = "/profile")}
      className="provider-card"
    >
      <div class="metadata">
        <img src={props.profilePicURL} alt={props.name} />
        <div className="metadata-text">
          <h3 className="highlight">{props.name}</h3>
          <p className="svc-tag">{props.service}</p>
          <p>
            <b>Price:</b> {props.price}
          </p>
          <p>{props.description}</p>
        </div>
      </div>
      <div className="desc">
        <div className="review-holder">
          <p>Sample long review to test how it looks after wrapping around</p>
        </div>
        <div className="btn-group">
          <button>Book Now!</button>
          <button className="transparent-btn">View Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Provider;
