import { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function ServiceInfo(props) {
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "desc") {
      setDesc(value);
    } else setPrice(value);

    props.addToServicesDesc({
      service: props.service,
      //This accounts for the fact that the setDesc and setPrice may not have asynchronously
      //completed execution if that was the one updated; we want the most recent value for both desc and price
      desc: name === "desc" ? value : desc,
      price: name === "price" ? value : price,
    });
  };

  return (
    <DialogContent>
      <DialogContentText>{props.service}</DialogContentText>
      <textarea
        placeholder="Description"
        onChange={handleChange}
        // name={props.service+"Desc"}
        name="desc"
        value={desc}
        rows="5"
        cols="50"
      />
      <br />
      <input
        onChange={handleChange}
        placeholder="Price"
        type="number"
        name="price"
        value={price}
      />
    </DialogContent>
  );
}

export default ServiceInfo;