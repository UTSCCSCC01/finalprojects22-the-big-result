import { useEffect, useState } from "react";
import axios from "axios";
import {
  Slider,
  Rating,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";

import Provider from "../components/Provider/Provider";
import ServiceList from "../components/Services/ServicesList";

import "../components/Filters.css";
import Footer from "../components/Footer/Footer";

function ProviderPage(props) {
  const [providerList, setProviderList] = useState([]);
  const [filters, setFilters] = useState({
    service: "",
    price: [0, 100],
    rating: 0,
    location: "",
  });

  const updateServiceFilter = (svc) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      service: svc,
    }));
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:5000/listServiceProviders?service=${filters.service}&rating=${filters.rating}&pricelow=${filters.price[0]}&pricehigh=${filters.price[1]}&location=${filters.location}`,
    })
      .then((response) => {
        const res = response.data;
        setProviderList(res.providers);
      })
      .catch((err) => {
        console.log("ERR");
        console.log(err.response);
      });
  }, [filters]);

  const filtersComponent = () => {
    return (
      <div className="filters-container">
        <div className="filters card">
          <div className="price filter-component">
            Price
            <Slider
              name="price"
              value={filters.price}
              onChange={handleChange}
            />
          </div>
          <div className="rating filter-component">
            Rating
            <Rating
              name="rating"
              value={filters.rating}
              onChange={handleChange}
            />
          </div>
          <div className="location filter-component">
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                labelId="location-label"
                value={filters.location}
                label="location"
                name="location"
                onChange={handleChange}
              >
                <MenuItem value="">I'm flexible</MenuItem>
                <MenuItem value={"Toronto, Ontario"}>Toronto, Ontario</MenuItem>
                <MenuItem value={"Vaughn, Ontario"}>Vaughn, Ontario</MenuItem>
                <MenuItem value={"Waterloo, Ontario"}>
                  Waterloo, Ontario
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="filter-component">
            <button>Apply Filters</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="providers-page page">
      {filtersComponent()}
      <h1>Service Providers</h1>
      <ServiceList serviceFilter={updateServiceFilter} />
      <div className="providers">
        {providerList.map((provider) => (
          <Provider
            name={provider.name}
            service={provider.service}
            description={provider.description}
            price={provider.price}
            rating={provider.rating}
            location={provider.location}
            profilePicURL={provider.profilePicURL}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ProviderPage;