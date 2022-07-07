import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../Calender.css';

import * as EvFn from "../EventActions";
import * as Constants from '../Constants'
import * as APICalls from "../../../APICalls"

import moment from "moment";

moment.locale('en-GB');
const localizer = momentLocalizer(moment);


function AvailabilityCalendar(props) {
  const [viewAvailabilities, setViewAvailabilities] = useState([]);
  const [viewDate, setViewDate] = useState(EvFn.getSunday(new Date()));

  useEffect(() => { 
    APICalls.getAvailability({ 
      professionalId: "36", 
      start: EvFn.getDateFromDateTime(viewDate),
      type: 'customer'
    }).then((res) => {
       let sundayOfCurrWeek = EvFn.getSunday(viewDate);
       let resFormatted = EvFn.formatWeekEventsForGET(res, sundayOfCurrWeek, Constants.AVAILABILITY);
       let resFormatted2 = EvFn.removePastEvents(resFormatted);  
       setViewAvailabilities(resFormatted2); 
     }).catch((err) => console.log(err));
 }, []);


 const handleSelectEvent = (event) => {
    console.log("selecting event...");
    // send booking info back to parent
    props.sendBookingInfo({ 
      professionalId: "36",
      start: EvFn.getTimeFromDate(event.start),
      end: EvFn.getTimeFromDate(event.end),
      date: EvFn.getDateFromDateTime(event.start),
      location: "UTSC",
      price: "59.99",
      customerId: "41",
      serviceName: 'hairstyling',
      instructions: 'be areful with hair'
    });
  }

  const onNavigate =(date, view) => {
    console.log('navigating to...', date, view, new Date(EvFn.getSunday(date) - 7));
    APICalls.getAvailability({ 
      professionalId: "36", 
      start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)),
      type: 'customer'
    }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        let resFormatted = EvFn.formatWeekEventsForGET(res, sundayOfCurrWeek, Constants.AVAILABILITY);
        let resFormatted2 = EvFn.removePastEvents(resFormatted); 
        setViewAvailabilities(resFormatted2); 
      }).catch((err) => console.log(err));
    setViewDate(new Date(EvFn.getSunday(date) - 7)); 
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

export default AvailabilityCalendar;