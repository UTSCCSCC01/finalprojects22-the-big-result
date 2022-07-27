import "../Provider/Provider.css";
import "../Card.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Request(props) {
  const navigate = useNavigate();

  function update(status) {
    axios({
      method: "PATCH",
      url: `http://127.0.0.1:5000/approveRequest?id=${props.id}&status=${status}`,
    })
    .then((response) => {
      props.update(props.id);
    })
    .catch((err) => {
      console.log(err.response);
    });
  }

  return (
    <div className="provider-card card">
      <div className="metadata">
        <img src={props.profilePicURL} alt={props.name} />
        <div className="metadata-text">
          <h2 className="highlight">{props.name}</h2>
          <p className="svc-tag">{props.service}</p>
          <p>
            <b>Location:</b> {props.location}
          </p>
          <p>{props.description}</p>
        </div>
      </div>
      <div className="desc">
        <div className="btn-group">
            <button onClick={() => update("APPROVED")}>Approve</button>
            <button onClick={() => update("DENIED")}>Deny</button>
            <button className="transparent-btn"
              onClick={() => navigate(`/profile/${props.id}`)}> 
                View Profile
            </button>
        </div>
      </div>
    </div>
  );
}

export default Request;
