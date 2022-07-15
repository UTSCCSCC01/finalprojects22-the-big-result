import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider";

const base = "http://localhost:5000";

//Credit for auth setup with refresh token from: https://github.com/gitdagray/react_jwt_auth

//custom axios call for authenticated axios requests
//main point here is to add withCredentials so that cookies are passed between calls (specifically a refresh token)
const axiosAuth = axios.create({
  baseURL: base,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//Update access_token when it has expired by using refresh token
const useRefreshToken = () => {
  const { setUser } = useContext(AuthContext);
  const refreshToken = () => {
    return axios({
      method: "POST",
      url: "http://localhost:5000/token/refresh",
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        setUser((prev) => {
          return { ...prev, access_token: res.data.access_token };
        });
      }
      return res.data.access_token;
    });
  };
  //return this hook so that we can use it in other components
  return refreshToken;
};

//Combines the axiosAuth and refreshToken so that when an initial axios call fails because of an expired token, it attempts to refetch, using a
//refresh token and retrying the call
const useAxiosAuth = () => {
  const refreshToken = useRefreshToken();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (req) => {
        //If the request does not have an authorization header, this is the first request being made, attach a header
        if (!req.headers["Authorization"]) {
          req.headers["Authorization"] = `Bearer ${user?.access_token}`;
        }
        return req;
      },
      (err) => Promise.reject(err)
    );
    let sent = false;
    const responseIntercept = axiosAuth.interceptors.response.use(
      //Do nothing in case of a regular response
      (res) => res,
      (err) => {
        //err.config holds the previous request, the sent property means we want to retry only once, not consistently for 403
        if (err.response?.status === 401 && !sent) {
          refreshToken().then((token) => {
            sent = true;
            err.config.headers["Authorization"] = `Bearer ${token}`;
          });
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
    //remove interceptors each time
    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [refreshToken, user]);

  return axiosAuth;
};

export { useAxiosAuth, useRefreshToken };

// body?
export const sendRequest = (method, endpoint, header_or_data) => {
  switch (method) {
    case "GET":
      return axios({
        method: method,
        url: base + endpoint,
        headers: header_or_data,
      });
    case "POST":
      return axios({
        method: method,
        url: base + endpoint,
        data: header_or_data,
      });
    // other cases: PUT, DELETE etc.
    case "PUT":
      return axios({
        method: method,
        url: base + endpoint,
        data: header_or_data,
      });
  }
};

export const getRequest = (endpoint, headers) =>
  sendRequest("GET", endpoint, headers);
export const postRequest = (endpoint, data) =>
  sendRequest("POST", endpoint, data);
export const putRequest = (endpoint, data) =>
  sendRequest("PUT", endpoint, data);

// get requests
export const getAvailability = (headers) => getRequest("/getAvailability", headers);
export const getBookings = (headers) => getRequest("/getBookings", headers);
export const getRecurrAvailability = (headers) => getRequest("/getRecurrAvailability", headers);
export const getUsersMe = (headers) => getRequest('/users/me', headers);
export const getServices = (headers) => getRequest('/getServices', headers);
export const getServiceProvidersOnQuery = (endpointQuery, headers) => getRequest(endpointQuery, headers);
export const getServiceProviderOnId = (endpointQuery, headers) => getRequest(endpointQuery, headers);
export const getCustomerPastBookings = (headers) => getRequest('/customerPastBookings', headers);
export const getProfessionalUpcomingBookings = (headers) => getRequest('/professionalUpcomingBookings', headers);
export const getProfessionalPastBookings = (headers) => getRequest('/professionalPastBookings', headers);
export const getCustomerUpcomingBookings = (headers) => getRequest('/customerUpcomingBookings', headers);
export const getCustomerCancelledBookings = (headers) => getRequest('/customerCancelledBookings', headers)
export const getProfessionalCancelledBookings = (headers) => getRequest('/professionalCancelledBookings', headers);

// post requests
export const setRecurrAvailability = (data) => postRequest("/setRecurrAvailability", data);
export const setNonRecurrAvailability = (data) => postRequest("/setNonRecurrAvailability", data);
export const addBookings = (data) =>  postRequest("/addBookings", data);
export const signUpProvider = (data) => postRequest("/signup/provider", data);
export const signUpCustomer = (data) => postRequest("/signup/customer", data);
export const addReview = (data) => postRequest("/addReview", data);

// put requests
export const cancelBooking = (data) => putRequest("/cancelBooking", data);
export const resolveBooking = (data) => putRequest("/resolveBooking", data); 