import { useEffect, useState } from "react";
import axios from "axios";

import Provider from "../components/Provider/Provider";
import Footer from "../components/Footer/Footer";

function ProviderPage(props) {
  const [providerList, setProviderList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/listServiceProviders",
    })
      .then((response) => {
        const res = response.data;
        setProviderList(res.providers);
      })
      .catch((err) => {
        console.log("ERR");
        console.log(err.response);
      });
  }, []);

  return (
    <div className="providers-page">
      <h1>Service Providers</h1>
      <div className="providers">
        {providerList.map((provider) => (
          <Provider
            name={provider.name}
            service={provider.service}
            description={provider.description}
            price={provider.price}
            profilePicURL={provider.profilePicURL}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProviderPage;
