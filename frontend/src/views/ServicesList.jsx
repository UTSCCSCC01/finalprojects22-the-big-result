import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "../components/Services/ServiceCard.jsx";
import Footer from "../components/Footer/Footer";

function ServiceList() {
  const [arrServices, setArrServices] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/services-list`,
    }).then((res) => {
      setArrServices(res.data.services);
    });
  }, []);

  const serviceCards = arrServices.map((item) => {
    return (
      <div
        className="card-container"
        onClick={() => (window.location = `/services/${item}`)}
      >
        <ServiceCard
          onClick={() => (window.location = `/services/${item}`)}
          service={item}
        />
      </div>
    );
  });

  return (
    <div className="services">
      <h1>List of Services</h1>
      <div class="row">{serviceCards}</div>
      <a href="/serviceProviders">See all providers!</a>
      <Footer />
    </div>
  );
}

export default ServiceList;
