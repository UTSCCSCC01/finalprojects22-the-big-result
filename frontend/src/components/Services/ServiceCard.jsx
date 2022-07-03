import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTreeCity } from "@fortawesome/free-solid-svg-icons";
import "./ServiceCard.css";
import "../Card.css";

const ServiceCard = ({ service, active }) => {
  return (
    <div className={"service-card card " + (active ? "active-svc" : "")}>
      <FontAwesomeIcon icon={faTreeCity} size="lg" color="#5646ab" />
      <h3>{service}</h3>
    </div>
  );
};

export default ServiceCard;
