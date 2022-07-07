import { Navigate, Outlet } from "react-router-dom";

//This method with Navigate and Outlet is the new standard for React Router V6:
//https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
const ProtectedRoutes = ({ role }) => {

  //TODO: Change this to pass in the role needed for that route and actually fetch from backend
  const auth = { token: true, type: "customer" };
  //if not authenticated
  if (!auth.token) return <Navigate to="/login" />;
  //if role for specified route doesn't match authenticated user type
  else if (role && role !== auth.type)
    return (
      <div className="page">
        <h1>403 Forbidden</h1>
        <h2>You do not have permission to access this resource.</h2>
      </div>
    );
  return <Outlet />;
};

export default ProtectedRoutes;
