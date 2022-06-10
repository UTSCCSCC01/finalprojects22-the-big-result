import "./Provider.css";

function Provider(props) {
  const sample = () => alert("hi, now go to " + props.name + "'s profile");

  return (
      <div onClick={sample} class="provider-card">
          <div class="photo-holder">
            <img src={props.profilePicURL} height="150px"/>
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