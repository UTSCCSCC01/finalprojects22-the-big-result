import "./Provider.css";

function Provider(props) {
  return (
    <div onClick={() => (window.location = "/profile")} class="provider-card">
      <div class="photo-holder">
        <img src={props.profilePicURL} />
      </div>
      <div class="text-holder">
        <p id="name">{props.name}</p>
        <p>{props.service}</p>
        <p>{props.description}</p>
        <div class="price-holder">
          <p>Price: {props.price}</p>
        </div>
        <div class="review-holder">
          <p>Sample Review</p>
        </div>
      </div>
    </div>
  );
}

export default Provider;
