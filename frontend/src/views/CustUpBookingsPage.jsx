import { useEffect, useState, useContext } from "react";
import BookingCustomerUpcoming from "../components/Bookings/BookingCustomerUpcoming";

import { getCustomerUpcomingBookings, getUsersMe } from "../APICalls"
import { AuthContext } from "../context/AuthProvider";

function CustUpBookingsPage() {
  const [bookingsList, setBookingsList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // get current user id 
    getUsersMe({ 
      Authorization: `Bearer ${ user.access_token }` 
    }).then((res) => {
      console.log(res.data.id, "id of the customer finding upcoming bookings")
      getCustomerUpcomingBookings({customerId: parseInt(res.data.id)})
      // axios({
      //   method: "GET",
      //   url: "http://127.0.0.1:5000/customerUpcomingBookings",
      //   headers: {
      //     customerId: 34
      //   }
      // })
      .then((response) => {
        console.log(response.data);
        setBookingsList(response.data.bookings);
      })
      .catch((err) => console.log(err.response));
    }).catch((err) => console.log(err.response));
  }, []);

  return (
    <div className="bookings-page page">
      <h1>Upcoming Bookings</h1>
      <div className="bookings">
        {bookingsList.map((booking) => (
          <BookingCustomerUpcoming
            provider={booking.provider}
            service={booking.service}
            description={booking.description}
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

export default CustUpBookingsPage;
