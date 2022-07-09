import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard.jsx";
import { getServices } from "../../APICalls"

function ServiceList(props) {
  const [arrServices, setArrServices] = useState([]);
  const [activeSvcId, setActiveSvcId] = useState("");

  useEffect(() => {
    getServices()
    // axios({
    //   method: "GET",
    //   url: `http://localhost:5000/getServices`,
    // })
      .then((res) => {
        setArrServices(res.data.services);
      })
      .then(arrServices.forEach((svc) => console.log(svc)));
  }, []);

  const serviceCards = () => {
    return arrServices.map((item) => {
      return (
        <div
          key={item.id}
          className="card-container"
          onClick={() => {
            props.serviceFilter(item.service);
            return setActiveSvcId(item.id);
          }}
        >
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
