import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const logout = () => {
    axios({
      method: "POST",
      url: "http://localhost:5000/logout",
      withCredentials: true,
    })
      .then(() => {
        //Set global user to null in context
        setUser(null);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <button onClick={logout}>Logout</button>;
}

export default Logout;
