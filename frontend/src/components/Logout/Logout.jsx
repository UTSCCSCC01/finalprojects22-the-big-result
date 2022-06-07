import axios from "axios";

function Logout(props) {
  const logout = () => {
    axios({ method: "POST", url: "http://localhost:5000/logout" })
      .then((res) => {
        localStorage.removeItem("token");
        window.location = "/login"
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
