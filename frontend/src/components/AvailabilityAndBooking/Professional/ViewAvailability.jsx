import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../Calender.css';

import * as EvFn from "../EventActions";
import * as Constants from '../Constants'
import {getAvailability, getBookings } from "../../../APICalls"

import moment from "moment";

moment.locale('en-GB');
const localizer = momentLocalizer(moment);


function ViewAvailability({ id, sendMode }) {
  const [viewAvailabilities, setViewAvailabilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [viewDate, setViewDate] = useState(EvFn.getSunday(new Date()));

  // NOTE: id is null when its being passed to the header of get request (since useEffect is async)
  // so using useEffect, rerender whenever id gets a different value
  useEffect(() => {
    getAvailability({ 
      professionalId: id, 
      start: EvFn.getDateFromDateTime(viewDate),
      type: 'professional'
    }).then((res) => {
       let sundayOfCurrWeek = EvFn.getSunday(viewDate);
       let resFormatted = EvFn.formatWeekEventsForGET(res, sundayOfCurrWeek, Constants.AVAILABILITY); 
       setViewAvailabilities(resFormatted); 
     }).catch((err) => console.log(err));
   
    getBookings({ 
      professionalId: id, 
      start: EvFn.getDateFromDateTime(viewDate) 
    }).then((res) => {
       let sundayOfCurrWeek = EvFn.getSunday(viewDate);
       const resFormatted = EvFn.formatWeekEventsForGET(res, sundayOfCurrWeek, Constants.BOOKING);
       setBookings(resFormatted);
       console.log(resFormatted);
     }).catch((err) => console.log(err));
 }, [id]);


  const onNavigate =(date, view) => {
    console.log('navigating to...', date, 'with sunday of the week being: ', EvFn.getSunday(date));
     // TODO: use viewDate to send request for getAvailability - needs promises, async, and await 
     // TODO: this is because state is not updated immediately so the start date in the request header
     // TODO: is not correct. As a workaround: new Date(EvFn.getSunday(date) - 7)
    getAvailability({ 
      professionalId: id, 
      start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)),
      type: 'professional'
    }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        let resFormatted = EvFn.formatWeekEventsForGET(res, sundayOfCurrWeek, Constants.AVAILABILITY); 
        setViewAvailabilities(resFormatted);
      }).catch((err) => console.log(err));
    
    getBookings({ 
      professionalId: id, 
      start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)) 
    }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        const resFormatted = EvFn.formatWeekEventsForGET(res, sundayOfCurrWeek, Constants.BOOKING);
        setBookings(resFormatted);
      }).catch((err) => console.log(err));
    setViewDate(new Date(EvFn.getSunday(date) - 7)); 
  }


  return (
    <div key={id}>
      <div className="calendar">
        <h2>View mode.</h2>
        <p>Edit your availability:</p>
        <button className="tab" onClick={() => { sendMode(Constants.RECURRING) }} style={{'padding':'10px 100px', 'margin': '10px 25px'}} >Recurring</button>
        <button className="tab" onClick={() => { sendMode(Constants.NONRECURR) }} style={{'padding':'10px 100px', 'margin': '10px 25px'}}>Non-recurring</button>
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

export default ViewAvailability;