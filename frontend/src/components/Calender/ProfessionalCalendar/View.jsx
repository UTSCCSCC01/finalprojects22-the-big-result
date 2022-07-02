import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import * as EvFn from "./EventActions";
import * as Constants from './Constants'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../Calender.css';

import axios from "axios";
import moment from "moment";


// moment.locale('en-GB', {
//   week: {
//       dow: 1,
//       doy: 1,
//   },
// });
moment.locale('en-GB');
const localizer = momentLocalizer(moment);


function View() {
  const [viewAvailabilities, setViewAvailabilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [viewDate, setViewDate] = useState(EvFn.getSunday(new Date()));

  useEffect(() => {
    // TODO: endpoints have names for them?
    // TODO TODO TODO TODO: use viewDate to send request for getAvailability 
   axios({
     method: "GET", url: `http://localhost:5000/getAvailability`,
     headers: { 
      professionalId: "36", 
      start: EvFn.getDateFromDateTime(viewDate),
      type: 'professional'
    } // make sure valid prof id
   }).then((res) => {
       let sundayOfCurrWeek = EvFn.getSunday(viewDate);
       let resFormatted = EvFn.formatGETAvailabilitiesData(res, sundayOfCurrWeek, Constants.AVAILABILITY); // TODO: change constant to AVAILABILITY
       setViewAvailabilities(resFormatted); // TODO read TODO below: instead of repeating get availability for this week
     }).catch((err) => console.log(err));
     
   axios({
     method: "GET", url: `http://localhost:5000/getBookings`,
     headers: { 
      professionalId: "36", 
     start: EvFn.getDateFromDateTime(viewDate) } // make sure valid prof id
   }).then((res) => {
       let sundayOfCurrWeek = EvFn.getSunday(viewDate);
       const resFormatted = EvFn.formatGETAvailabilitiesData(res, sundayOfCurrWeek, Constants.BOOKING);
       setBookings(resFormatted);
     }).catch((err) => console.log(err));
 }, []);


  const onNavigate =(date, view) => {
    console.log('navigating to...', date, view, EvFn.getSunday(date));
    // TODO: fix view 
     // TODO TODO TODO TODO: use viewDate to send request for getAvailability 
    // TODO fix later on with new Date
    axios({
      method: "GET", url: `http://localhost:5000/getAvailability`,
      headers: { 
        professionalId: "36", 
        start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)),
        type: 'professional'
      } // make sure valid prof id
    }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        let resFormatted = EvFn.formatGETAvailabilitiesData(res, sundayOfCurrWeek, Constants.AVAILABILITY); // TODO: change constant to AVAILABILITY
        setViewAvailabilities(resFormatted); // TODO read TODO below: instead of repeating get availability for this week
      }).catch((err) => console.log(err));
      
    axios({
      method: "GET", url: `http://localhost:5000/getBookings`,
      headers: { 
        professionalId: "36", 
        start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)) } // make sure valid prof id
    }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        const resFormatted = EvFn.formatGETAvailabilitiesData(res, sundayOfCurrWeek, Constants.BOOKING);
        setBookings(resFormatted);
      }).catch((err) => console.log(err));
    setViewDate(new Date(EvFn.getSunday(date) - 7)); // ugly for some weird reason I have to subtract 7... sunday of prev week?
  }


  return (
    <div>
      <div>
        <h2>View mode.</h2>
        <p>Edit your availability:</p>
        <button className="tab" onClick={() => {window.location = "/p/calendar/edit/recurr"}}>Recurring.</button>
        <button className="tab" onClick={() => {window.location = "/p/calendar/edit/non-recurr"}}>Non-recurring</button>
        <div className="prof-calender">
          <Calendar
            views={["week", "day"]}
            localizer={localizer}
            defaultDate={new Date()} 
            defaultView="week"
            events={EvFn.concatEvents(viewAvailabilities, bookings)} 
            style={{ height: "100vh" }}
            eventPropGetter={(EvFn.eventStyleGetter)}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
}
// NOTE: only see their recurring events when changing them ,no bookigns, bookings only appear in the view tab

export default View;