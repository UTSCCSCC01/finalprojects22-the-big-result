import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useState, useEffect } from "react";
import { useAxiosAuth } from "../../APICalls";
import axios from "axios";
import "../Form.css";
import "./Location.css";
import {
  OutlinedInput,
  Select as MUISelect,
} from "@mui/material";


function Location({ sendLocation }) {
  const [location, setLocation] = useState("");

  const handleSelect = async value => {
    setLocation(value);
    sendLocation(value);
    console.log(value)
  };
 
  return (
    <div>
      {/* <Autocomplete
        disablePortal
        onChange={handleChange}
        options={addresses}
        renderInput={(params) => <TextField {...params} label="Location" />}
      /> */}
     
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* <input 
              {...getInputProps({ placeholder: "Type service location",
              className: 'location-search-input'})} 
              value={address}
              /> */}
            <OutlinedInput
                {...getInputProps({ placeholder: "Type service location",
                className: 'location-search-input'})}
                value={location}
                required
              />
            
            <div style={{"position": "absolute", "z-index": "1000"}} className='autocomplete-dropdown-container'>
              {loading ? <div>loading...</div> : null}
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#CBC3E3" : "#fff",
                  width: "100%"
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default Location;