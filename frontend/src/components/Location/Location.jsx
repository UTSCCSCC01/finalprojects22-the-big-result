import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useState } from "react";
import "../Form.css";
import "./Location.css";
import {
  TextField,
  OutlinedInput,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
  Select as MUISelect,
} from "@mui/material";

const addresses = [ "ava", "sina"];

function Location() {
  const [address, setAddress] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddress(value);
  };

  const handleSelect = async value => {
    setAddress(value);
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
        value={address}
        onChange={setAddress}
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
                value={address}
                required
              />
            
            <div style={{"position": "absolute", "z-index": "1000"}} className='autocomplete-dropdown-container'>
              {loading ? <div>loading...</div> : null}
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
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


{/* <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
<InputLabel id="location-label">Location</InputLabel>
<MUISelect
  labelId="location-label"
  value={address}
  label="location"
  name="location"
  onChange={handleChange}
>
  
  <MenuItem value={"Toronto, Ontario"}>Toronto, Ontario</MenuItem>
  <MenuItem value={"Vaughn, Ontario"}>Vaughn, Ontario</MenuItem>
  <MenuItem value={"Waterloo, Ontario"}>Waterloo, Ontario</MenuItem>
</MUISelect>
</FormControl> */}