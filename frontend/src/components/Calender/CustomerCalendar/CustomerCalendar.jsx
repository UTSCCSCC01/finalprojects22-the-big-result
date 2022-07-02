import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import * as EvFn from "../EventActions";
import * as Constants from '../Constants'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../Calender.css';

import axios from "axios";
import moment from "moment";

moment.locale('en-GB');
const localizer = momentLocalizer(moment);


function CustomerCalendar() {
  const [viewAvailabilities, setViewAvailabilities] = useState([]);
  const [viewDate, setViewDate] = useState(EvFn.getSunday(new Date()));

  useEffect(() => { 
   axios({
     method: "GET", url: `http://localhost:5000/getAvailability`,
     headers: { 
      professionalId: "36", 
      start: EvFn.getDateFromDateTime(viewDate),
      type: 'customer'
    } // make sure valid prof id
   }).then((res) => {
       let sundayOfCurrWeek = EvFn.getSunday(viewDate);
       let resFormatted = EvFn.formatWeekEventsForGET(res, sundayOfCurrWeek, Constants.AVAILABILITY); // TODO: change constant to AVAILABILITY
       setViewAvailabilities(resFormatted); // TODO read TODO below: instead of repeating get availability for this week
     }).catch((err) => console.log(err));
 }, []);


 const handleSelectEvent = (event) => {
  console.log("selecting event...");

  // go to confirmation page
  //custID:int, profID: int,beginServDateTime: datetime, endServDateTime: datetime, location: str, status: Status, price: float, serviceName: str , specialInstructions = ""):

  axios({ 
    method: "POST", url: "http://localhost:5000/addBookings",
    data: { 
      professionalId: "36", // TODO: customerId, 
      start: EvFn.getTimeFromDate(event.start),
      end: EvFn.getTimeFromDate(event.end),
      date: EvFn.getDateFromDateTime(event.start),
      location: "somethnd",
      price: "price",
      customerId: "30", // make sure valid
      serviceName: 'hairstyling',
      instructions: 'instructions'
    }
   }).then(() => {
      window.location = "/confirmation";
    }).catch((err) => {
      console.log(err);
    });

  }



  const onNavigate =(date, view) => {
    console.log('navigating to...', date, view, EvFn.getSunday(date));
    axios({
      method: "GET", url: `http://localhost:5000/getAvailability`,
      headers: { 
        professionalId: "36", 
        start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)),
        type: 'customer'
      } // make sure valid prof id
    }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        let resFormatted = EvFn.formatWeekEventsForGET(res, sundayOfCurrWeek, Constants.AVAILABILITY); // TODO: change constant to AVAILABILITY
        setViewAvailabilities(resFormatted); // TODO read TODO below: instead of repeating get availability for this week
      }).catch((err) => console.log(err));
    setViewDate(new Date(EvFn.getSunday(date) - 7)); // ugly for some weird reason I have to subtract 7... sunday of prev week?
  }


  return (
    <div>
      <div>
        <h2>Choosing a booking time.</h2>
        <div className="prof-calender">
          <Calendar
            views={["week", "day"]}
            localizer={localizer}
            defaultDate={new Date()} 
            defaultView="week"
            events={viewAvailabilities} 
            style={{ height: "100vh" }}
            eventPropGetter={(EvFn.eventStyleGetter)}
            onNavigate={onNavigate}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </div>
    </div>
  );
}
// NOTE: only see their recurring events when changing them ,no bookigns, bookings only appear in the view tab

export default CustomerCalendar;