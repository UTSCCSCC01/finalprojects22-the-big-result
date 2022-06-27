import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard.jsx";

function ServiceList() {
  const [arrServices, setArrServices] = useState([]);
  const [activeSvcId, setActiveSvcId] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/services-list`,
    })
      .then((res) => {
        setArrServices(res.data.services);
      })
      .then(arrServices.forEach((svc) => console.log(svc)));
  }, []);

  const serviceCards = () => {
    return arrServices.map((item) => {
      return (
        <div className="card-container" onClick={() => setActiveSvcId(item.id)}>
          <ServiceCard
            key={item.id}
            service={item.service}
            active={item.id === activeSvcId}
          />
        </div>
      );
    });
  };

  return (
    <div className="services">
      <div className="row">{serviceCards()}</div>
    </div>
  );
}

export default ServiceList;
