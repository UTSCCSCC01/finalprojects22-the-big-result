import { Link } from "react-router-dom";

function Deactivated() {
  return (
    <div className="page">
      <h1>You have successfully deactivated your provider account.</h1>
      <Link to="/signup">Rejoin Amorr as a Service Provider</Link>
    </div>
  );
}

export default Deactivated;
