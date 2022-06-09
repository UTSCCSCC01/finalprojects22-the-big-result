import ServiceCard from '../components/Services/ServiceCard.js';
import { useState, useEffect } from 'react';
import axios from "axios";

function ServiceList () {

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
  
  //! (F) TODO or maybe do for loop?
    const serviceCards = arrServices.map((item) => {
    return (
      <div onClick={() => window.location = `/services/${item}`} > 
        <ServiceCard service={item}/>
      </div>
    )
  })

  return (
      <div>{serviceCards}</div>
  )
}

export default ServiceList;