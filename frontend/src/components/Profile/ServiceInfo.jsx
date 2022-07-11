import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function ServiceInfo(props) {

  return ( 
    <DialogContent>
      <DialogContentText>
        {props.service}
      </DialogContentText>
      <textarea
        placeholder="Description"
        // onChange={handleChange}
        name={props.service+"Desc"}
        // value={props.obj+"."+props.service+"Desc"}
        rows="5"
        cols="50"
      />
      <br />
      <input
        // onChange={handleChange}
        placeholder="Price"
        type="text"
        name={props.service+"Price"}
        // value={props.service+"Price"}
      />
    </DialogContent>
  );
}

export default ServiceInfo;