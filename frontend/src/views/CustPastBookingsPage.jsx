import { useEffect, useState, useContext } from "react";

import BookingCustomerPast from "../components/Bookings/BookingCustomerPast";
import { getCustomerPastBookings, useAxiosAuth } from "../APICalls";
import { AuthContext } from "../context/AuthProvider";

function CustPastBookingsPage(props) {
  const [bookingsList, setBookingsList] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    // get current user id
    // getUsersMe({
    //   Authorization: `Bearer ${user.access_token}`,
    // });

    axiosAuth
      .get("/users/me")
      .then((res) => {
        console.log(res.data.id, "id of the customer finding past bookings");
        getCustomerPastBookings({ customerId: parseInt(res.data.id) })
          // axios({
          //   method: "GET",
          //   url: "http://127.0.0.1:5000/customerPastBookings",
          //   headers: {
          //     customerId: 34
          //   }
          // })
          .then((response) => {
            console.log(response.data);
            const res = response.data;
            setBookingsList(res.bookings);
          })
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div className="bookings-page page">
      <h1>Past Bookings</h1>
      <div className="bookings">
        {bookingsList.map((booking) => (
          <BookingCustomerPast
            provider={booking.provider}
            service={booking.service}
            review={booking.review}
            cost={booking.cost}
            picURL={booking.picURL}
            date={booking.date}
            startTime={booking.startTime}
            endTime={booking.endTime}
          />
        ))}
      </div>
    </div>
  );
}

export default CustPastBookingsPage;
