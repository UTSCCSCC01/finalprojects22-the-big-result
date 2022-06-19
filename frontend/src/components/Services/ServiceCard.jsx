import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTreeCity } from "@fortawesome/free-solid-svg-icons";
import "./ServiceCard.css";
import "../Card.css";

const ServiceCard = (props) => {
  return (
    <div className="service-card card">
      <FontAwesomeIcon icon={faTreeCity} size="lg" color="#5646ab" />
      <h3>{props.service}</h3>
    </div>
  );
};

export default ServiceCard;
