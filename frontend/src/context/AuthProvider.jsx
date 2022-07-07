import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext({});

//Code adapted somewhat from: https://www.makeuseof.com/react-context-api-tutorial/
function AuthProvider({ children }) {
  //Lets consumers set the current user (relevant for login and logout)
  //user consists of: their role and their access_token, to be passed for successive requests
  //with the access_token, actual user info can be retrieved as required
  const [user, setUser] = useState(null);
  //TODO: Check for valid auth token everytime

  //   //Get current user from backend, if it doesn't exist then user stays as null
  //   useEffect(() => {
  //     axios({
  //       method: "GET",
  //       url: `http://localhost:5000/users/me`,
  //     }).then((res) => {
  //       if (res.status === 200)
  //         setUser({ type: res.data.type, access_token: res.data.access_token });
  //       console.log(res.data);
  //     });
  //   }, []);
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
