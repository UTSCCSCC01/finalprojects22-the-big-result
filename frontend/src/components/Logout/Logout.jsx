import axios from "axios";

function Logout(props) {
  const logout = () => {
    axios({ method: "POST", url: "http://localhost:5000/logout" })
      .then((res) => {
        localStorage.removeItem("token");
        window.location = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <button onClick={logout}>Logout</button>;
}

export default Logout;
