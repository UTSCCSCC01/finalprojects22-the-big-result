import ServiceCard from '../components/Services/ServiceCard.jsx';
import './ServicesList.css'
import { useState, useEffect } from 'react';
import axios from "axios";

function ServiceList() {

  const [arrServices, setArrServices] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/services-list`
    })
      .then((res) => {
        setArrServices(res.data.services);
      })
  }, []
  );

  const half = Math.ceil(arrServices.length / 2);

  const serviceCardsLeft = arrServices.slice(0, half).map((item) => {
    return (
      <div onClick={() => window.location = `/services/${item}`} >
        <ServiceCard service={item} />
      </div>
    )
  })
  const serviceCardsRight = arrServices.slice(half, arrServices.length).map((item) => {
    return (
      <div onClick={() => window.location = `/services/${item}`} >
        <ServiceCard service={item} />
      </div>
    )
  })

  return (
    <div>
      <h3>List of Services</h3>
      <div class="row">
        <div class="column">{serviceCardsLeft} </div>
        <div class="column">{serviceCardsRight} </div>
      </div>
    </div>
  )
}

export default ServiceList;