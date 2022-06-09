import ServiceCard from '../components/Services/ServiceCard.js';

function ServiceList () {

    // ! TODO After button is clicked, lead to service providers stuff
    // ! TODO Instead of hardcoding here, fetch from backend. 
    const serviceArr = [ // an array of objects
    {
      id: 1, 
      service: 'Hairstyle'
    },
    {
      id: 2, 
      service: 'Makeup'
    },
    {
      id: 3, 
      service: 'Nail Care'
    },
    {
      id: 4, 
      service: 'Landscaping'
    }
  ]

  
  //! (F) TODO Based on which one is clicked, go to a spcific list of service providers
  const serviceClick = (props) => alert("hi, now goes to providers of: " + props);

  //! (F) TODO or maybe do for loop?
    const serviceCards = serviceArr.map((item) => {
    return (
      <div onClick={() => serviceClick(item.service)}>
        <ServiceCard service={item.service} key={item.id} id={item.id}/>
      </div>
    )
  })

  return (
      <div>{serviceCards}</div>
  )
}

export default ServiceList;