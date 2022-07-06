import { Navigate, Outlet } from "react-router-dom";

//This method with Navigate and Outlet is the new standard for React Router V6:
//https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
const ProtectedRoutes = ({ role }) => {
  //TODO: Change this to pass in the role needed for that route and actually fetch from backend
  const auth = { token: true, type: "customer" };
  //if not authenticated or role is specified but doesn't match authenticated type
  if (!auth.token || (role && role !== auth.type))
    return <Navigate to="/login" />;
  return <Outlet />;
};

export default ProtectedRoutes;
