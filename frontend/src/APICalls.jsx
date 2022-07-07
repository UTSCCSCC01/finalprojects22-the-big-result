import axios from "axios";

const base =  "http://localhost:5000";

// body?
export const sendRequest = (method, endpoint, header_or_data) => {
  switch (method) {
    case "GET": return axios({ method: method, url: base + endpoint, headers: header_or_data });
    case "POST": return axios({ method: method, url: base + endpoint, data: header_or_data });
    // other cases: PUT, DELETE etc. 
  }
}

export const getRequest = (endpoint, headers) => sendRequest("GET", endpoint, headers);
export const postRequest = (endpoint, data) => sendRequest("POST", endpoint, data);

export const getAvailability = (headers) => getRequest('/getAvailability', headers);
export const getBookings = (headers) => getRequest('/getBookings', headers);
export const getRecurrAvailability = (headers) => getRequest('/getRecurrAvailability', headers);

export const setRecurrAvailability = (headers) => postRequest('/setRecurrAvailability', headers);
export const setNonRecurrAvailability = (headers) => postRequest('/setNonRecurrAvailability', headers);

