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
import { getServiceProvidersOnQuery } from "../APICalls";

import "../components/Filters.css";

function ProviderPage() {
  const [priceRange, setPriceRange] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [filters, setFilters] = useState({
    service: "",
    price: priceRange ? [priceRange[0], priceRange[1]] : [],
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
      url: `http://127.0.0.1:5000/priceRange`,
    })
      .then((response) => {
        console.log(response);
        const minPrice = response.data.priceLow;
        const maxPrice = response.data.priceHigh;
        setFilters((prevFilters) => ({
          ...prevFilters,
          price: [minPrice, maxPrice],
        }));
        setPriceRange([minPrice, maxPrice]);
      })
      .catch((err) => {
        console.log("ERR");
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    let query = `/listServiceProviders?service=${filters.service}&rating=${filters.rating}&location=${filters.location}`;
    if (filters.price && filters.price[0])
      query += `&pricelow=${filters.price[0]}`;
    if (filters.price && filters.price[1])
      query += `&pricehigh=${filters.price[1]}`;
    getServiceProvidersOnQuery(query)
      .then((response) => {
        const res = response.data;
        setProviderList(res.providers);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [filters]);

  const filtersComponent = () => {
    return (
      <div className="filters-container">
        <div className="filters card">
          <div className="price filter-component">
            Price
            <div className="price-slider">
              <p>
                {filters.price && filters.price[0] && "$" + filters.price[0]}
              </p>
              <Slider
                name="price"
                value={filters.price}
                onChange={handleChange}
                min={priceRange ? priceRange[0] : 0}
                max={priceRange ? priceRange[1] : 100}
              />
              <p>
                {filters.price && filters.price[1] && "$" + filters.price[1]}
              </p>
            </div>
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
        </div>
      </div>
    );
  };

  return (
    <div className="providers-page page" id="providers">
      <ServiceList serviceFilter={updateServiceFilter} />
      {filtersComponent()}

      {providerList.length > 0 ? (
        <div className="providers">
          {console.log(providerList)}
          {providerList.map((provider) => (
            <Provider
              key={provider.id}
              id={provider.id}
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
      ) : (
        <h2>Sorry! No providers match those filters</h2>
      )}
    </div>
  );
}

export default ProviderPage;
