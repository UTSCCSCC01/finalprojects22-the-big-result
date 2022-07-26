import { useEffect, useState } from "react";
import axios from "axios";
import Request from "../components/Request/Request";

function RequestsPage(props) {
  const [providerList, setProviderList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/pendingRequests`,
    })
    .then((response) => {
      console.log(response);
      setProviderList(response.data.providers)
    })
    .catch((err) => {
      console.log(err.response);
    });
  }, []);
 
  function update(id) {
   let newProvidersList = [];
    providerList.forEach((element) => {
      if (element.id !== id) {
        newProvidersList.push(element);
      }
    });
    setProviderList(newProvidersList);
  }

  return (
    <div className="providers-page page" id="providers">
      <h1>Pending Provider Requests</h1>
      {providerList.length > 0 ? (
        <div className="providers">
          {providerList.map((provider) => (
            <Request
              key={provider.id}
              id={provider.id}
              name={provider.name}
              service={provider.service}
              description={provider.description}
              // price={provider.price}
              // rating={provider.rating}
              location={provider.location}
              profilePicURL={provider.profilePicURL}
              update={update}
              // review = {provider.review}
            />
          ))}
        </div>
      ) : (
        <h2>No sign up requests to approve.</h2>
      )}
    </div>
  );
}

export default RequestsPage;