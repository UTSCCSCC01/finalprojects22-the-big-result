import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

//Code adapted somewhat from: https://www.makeuseof.com/react-context-api-tutorial/
function AuthProvider({ children }) {
  //Lets consumers set the current user (relevant for login and logout)
  //user consists of: their role and their access_token, to be passed for successive requests
  //with the access_token, actual user info can be retrieved as required
  const [user, setUser] = useState(null);
  //To avoid refreshing the page on reload each time, we
  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
