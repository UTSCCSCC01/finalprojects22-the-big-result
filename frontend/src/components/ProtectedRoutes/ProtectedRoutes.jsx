import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";

//This method with Navigate and Outlet is the new standard for React Router V6:
//https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
const ProtectedRoutes = ({ role }) => {
  //TODO: Figure out how to check if access token actually valid
  const { user } = useContext(AuthContext);

  //if not authenticated
  if (!user || !user.access_token) return <Navigate to="/login" />;
  //if role for specified route doesn't match authenticated user type
  else if (role && role !== user.type)
    return (
      <div className="page">
        <h1>403 Forbidden</h1>
        <h2>You do not have permission to access this resource.</h2>
      </div>
    );
  return <Outlet />;
};

export default ProtectedRoutes;
