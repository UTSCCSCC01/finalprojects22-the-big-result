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


moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);


function Edit(props) {
  
  const [eventsToRecurr, setEventsToRecurr] = useState([]); // events for one week that will recurr
  const [viewAvailabilities, setViewAvailabilities] = useState([]); // todo repeat eventsToRecurr 4 times for a month from todays day
  const [bookings, setBookings] = useState([]);
  const [mode, setMode] = useState(Constants.VIEW);
  const [viewDate, setViewDate] = useState(EvFn.getSunday(new Date()));


  useEffect(() => {
    if (props.mode==Constants.RECURRING) {
      setMode(Constants.RECURRING);
      axios({
        method: "GET", url: `http://localhost:5000/getRecurrAvailability`,
        headers: { 
          professionalId: "36",
          start: EvFn.getDateFromDateTime(viewDate) }
      }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(new Date());
        let resFormatted = EvFn.formatGETAvailabilitiesData(res, sundayOfCurrWeek, Constants.AVAILABILITY);
        setEventsToRecurr(resFormatted);
        }).catch((err) => console.log(err));
    }
    else if (props.mode==Constants.NONRECURR) {
      setMode(Constants.NONRECURR);
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
    } 
  }, []);

  // TODO LATER: prevent from putting availability on booking
  const handleSelect = ({ start, end }) => {
    console.log("selecting event ...");
    if (mode == Constants.RECURRING) {
      setEventsToRecurr([ ...eventsToRecurr,
        { start: start, 
          end:end, 
          title:Constants.RECURRING , 
          color: Constants.RECURR_AVAIL_COLOR,
          id:eventsToRecurr.length},
      ]);
    } else if (mode == Constants.NONRECURR) {
      setViewAvailabilities([ ...viewAvailabilities,
        { start: start, 
          end: end, 
          title:Constants.NONRECURR, 
          color: Constants.NON_RECURR_AVAIL_COLOR,
          id:viewAvailabilities.length},
      ]);
    }
  };


  const handleSelectEvent = (event) => {
    console.log("selecting event...", mode);
    if (event.title==Constants.BOOKING) return;
    if (mode==Constants.RECURRING) {
      const w = window.confirm("Would you like to remove this event?")
      if (w) {
        let eventsAfterDeletion = [];
        eventsToRecurr.forEach(function(e) {
          // need to re-add to the events to fix the ids
          console.log(e.id, event)
          if (e.id != event.id) 
          eventsAfterDeletion.push({...e, id: eventsAfterDeletion.length });
        });
        console.log("after deletion", eventsAfterDeletion);
        setEventsToRecurr(eventsAfterDeletion);
      }
      // todo: remove repeated code: put into a function and pass in the methods as parameters
    } else if (mode==Constants.NONRECURR) { // non recurring
      const w = window.confirm("Would you like to remove this event?")
      if (w) {
        let eventsAfterDeletion = [];
        viewAvailabilities.forEach(function(e) {
          // need to re-add to the events to fix the ids
          console.log(e.id, event)
          if (e.id != event.id) 
          eventsAfterDeletion.push({...e, id: eventsAfterDeletion.length });
        });
        console.log("after deletion", eventsAfterDeletion);
        setViewAvailabilities(eventsAfterDeletion);
      }
    }
  }

  const onEventResize = (data) => {
    console.log("data resizing...");
    if (data.event.title==Constants.BOOKING) return;
    if (mode==Constants.RECURRING) {
      setEventsToRecurr(eventsToRecurr.map((e) => {
        if (e.id == data.event.id) {
          return { ...e, start: data.start, end: data.end }
        }
        return e
      }))
    } else if (mode==Constants.NONRECURR) {
      setViewAvailabilities(viewAvailabilities.map((e) => {
        if (e.id == data.event.id) {
          return { ...e, start: data.start, end: data.end,
            color: Constants.NON_RECURR_AVAIL_COLOR, title: Constants.NONRECURR
           }
        }
        return e
      }))
    }
  };

  const onEventDrop = (data) => {
    console.log("event dropped..."); // TODO: let them know in <-p> that the edits are weekly
    if (data.event.title==Constants.BOOKING) return;
    if (mode == Constants.RECURRING) {
      setEventsToRecurr(eventsToRecurr.map((e) => {
        if (e["id"] == data.event.id) {
          return { ...e, start: data.start, end: data.end }
        }
        return e
      }))
    } else if (mode==Constants.NONRECURR) {
      setViewAvailabilities(viewAvailabilities.map((e) => {
        if (e["id"] == data.event.id) {
          return { ...e, start: data.start, end: data.end, 
            color: Constants.NON_RECURR_AVAIL_COLOR, title: Constants.NONRECURR 
          }
        }
        return e
      }))
    }    
  };
  
  const onSubmitEditRecurr = () => {
    console.log('***********************************');
    console.log('***********************************');
    console.log('***********************************');
    console.log("submitting recurr edit...");

    const eventsToRecurrFormatted = 
      EvFn.formatSETRecurrAvailabilitiesData(eventsToRecurr);

    axios({ 
      method: "POST", 
      url: "http://localhost:5000/setRecurrAvailability",
      data: { events: eventsToRecurrFormatted, professionalId: "36" }
    }).then(() => {
      window.location = "/p/calendar/view";
    }).catch((err) => {
      console.log(err);
    });

    // TODO: instead make a call to /getAllAvailabilities to get merged availabiliteis
  }

  // TODO: all requests in another file? called requests.jsx? 
  const onSubmitEditNonRecurr = () => {
    console.log("submitting non-recurr edit...");

    const allAvailabilitiesFormatted = 
      EvFn.formatSETRecurrAvailabilitiesData(viewAvailabilities);
    
    axios({ 
      method: "POST", url: "http://localhost:5000/setNonRecurrAvailability",
      data: { 
        events: allAvailabilitiesFormatted, 
        professionalId: "36", 
        start: EvFn.getDateFromDateTime(viewDate)
      }
     }).then(() => {
        window.location = "/p/calendar/view";
      }).catch((err) => {
        console.log(err);
      });

  }

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

  // setEventsToRecurr(viewAvailabilities) resets the recurr view if not submitting  
  return (
    <div>
      <div>
      <h2>Edit mode.</h2>
        <p>editing {props.mode==Constants.RECURRING ? 'recurring' : 'nonrecurring'} dates</p>
        <div className={props.mode==Constants.RECURRING ? "prof-calender recurr" : "prof-calender non-recurr"}>
          <DragAndDropCalendar
            views={["week", "day"]} 
            selectable
            localizer={localizer}
            defaultDate={new Date()} 
            defaultView="week"
            events={props.mode==Constants.RECURRING ? eventsToRecurr : EvFn.concatEvents(viewAvailabilities, bookings)} // change to viewAvailabilities if theyre merged correctly in backend
            style={{ height: "100vh" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelect}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            no-overlap
            eventPropGetter={(EvFn.eventStyleGetter)}
            onNavigate={onNavigate}
          />
        </div>
        {/* how to switch back to view mode when button is pressed since View is in ProfessionalCalendar */}
        <button onClick={props.mode==Constants.RECURRING ? onSubmitEditRecurr : onSubmitEditNonRecurr}>Submit</button>
        <button onClick={() => window.location = "/p/calendar/view"}>Cancel</button>
      </div>
      
      
    </div>
  );
}
// NOTE: only see their recurring events when changing them ,no bookigns, bookings only appear in the view tab

export default Edit;