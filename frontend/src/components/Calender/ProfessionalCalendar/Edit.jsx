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
  
  const [weeksFromCurrWeek, setWeekFromCurrWeek] = useState(0); // todo: if next week its + 1, do this instead of passing sundayOfWeek so let EventActions do the job
  const [eventsToRecurr, setEventsToRecurr] = useState([]); // events for one week that will recurr
  const [nonRecurrEvents, setNonRecurrEvents] = useState([]);
  const [viewAvailabilities, setViewAvailabilities] = useState([]); // todo repeat eventsToRecurr 4 times for a month from todays day
  const [bookings, setBookings] = useState([]);
  const [mode, setMode] = useState(Constants.VIEW);
  const [viewDate, setViewDate] = useState(EvFn.getSunday(new Date()));


  useEffect(() => {
    console.log('propsssssssssssssssssssssssssssssssss'. props)
    if (props.mode==Constants.RECURRING) {
      setMode(Constants.RECURRING);
      axios({
        method: "GET", url: `http://localhost:5000/getRecurrAvailability`,
        data: { professionalId: "01" }
      }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(new Date());
        let resFormatted = EvFn.formatGETAvailabilitiesData(res, sundayOfCurrWeek);
        setEventsToRecurr(resFormatted);
        setViewAvailabilities(EvFn.recurrEvents(resFormatted, 4));
        }).catch((err) => console.log(err));
    }
    else if (props.mode==Constants.NONRECURR) {
      setMode(Constants.NONRECURR);
      axios({
        method: "GET", url: `http://localhost:5000/getAvailability`,
        data: { professionalId: "01" }
      }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(new Date());
        let resFormatted = EvFn.formatGETAvailabilitiesData(res, sundayOfCurrWeek);
        setEventsToRecurr(resFormatted);
        setViewAvailabilities(EvFn.recurrEvents(resFormatted, 4));
        }).catch((err) => console.log(err));
    } 
  }, []);

    
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
      setNonRecurrEvents([ ...nonRecurrEvents,
        { start: start, 
          end: end, 
          title:Constants.NONRECURR, 
          color: Constants.NON_RECURR_AVAIL_COLOR,
          id:nonRecurrEvents.length},
      ]);
    }
  };


  const handleSelectEvent = (event) => {
    console.log("selecting event...", mode);

    if (mode==Constants.RECURRING && event.title == Constants.RECURRING) {
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
    } else if (mode==Constants.NONRECURR && event.title == Constants.NONRECURR) { // non recurring
      const w = window.confirm("Would you like to remove this event?")
      if (w) {
        let eventsAfterDeletion = [];
        nonRecurrEvents.forEach(function(e) {
          // need to re-add to the events to fix the ids
          console.log(e.id, event)
          if (e.id != event.id) 
          eventsAfterDeletion.push({...e, id: eventsAfterDeletion.length });
        });
        console.log("after deletion", eventsAfterDeletion);
        setNonRecurrEvents(eventsAfterDeletion);
      }
    }
  }

  const onEventResize = (data) => {
    console.log("data resizing...");
    if (mode==Constants.RECURRING && data.event.title == Constants.RECURRING) {
      setEventsToRecurr(eventsToRecurr.map((e) => {
        if (e.id == data.event.id) {
          return { ...e, start: data.start, end: data.end }
        }
        return e
      }))
    } else if (mode==Constants.NONRECURR && data.event.title == Constants.NONRECURR) {
      setNonRecurrEvents(nonRecurrEvents.map((e) => {
        if (e.id == data.event.id) {
          return { ...e, start: data.start, end: data.end }
        }
        return e
      }))
    }
  };

  const onEventDrop = (data) => {
    console.log("event dropped...");
    if (mode == Constants.RECURRING && data.event.title == Constants.RECURRING) {
      setEventsToRecurr(eventsToRecurr.map((e) => {
        if (e["id"] == data.event.id) {
          return { ...e, start: data.start, end: data.end }
        }
        return e
      }))
    } else if (mode==Constants.NONRECURR && data.event.title == Constants.NONRECURR) {
      setNonRecurrEvents(nonRecurrEvents.map((e) => {
        if (e["id"] == data.event.id) {
          console.log( { ...e, start: data.start, end: data.end })
          return { ...e, start: data.start, end: data.end }
        }
        return e
      }))
    }    
  };
  
  const onSubmitEditRecurr = () => {
    console.log("submitting recurr edit...");

    // backend stores recurring availabilities in times HH:MM:SS
    const eventsToRecurrFormatted = EvFn.formatSETRecurrAvailabilitiesData(eventsToRecurr); //[];

    axios({ 
      method: "POST", 
      url: "http://localhost:5000/setRecurrAvailability",
      data: { events: eventsToRecurrFormatted, professionalId: "01" }
     })
      .then(() => {
        window.location = "/p/calendar/view";
      })
      .catch((err) => {
        console.log(err);
      });

      
    
    // TODO: instead make a call to /getAllAvailabilities to get merged availabiliteis
    setViewAvailabilities(EvFn.recurrEvents(eventsToRecurr, 4));
    window.location = "/p/calendar/view";
  }

  // TODO: all requests in another file? called requests.jsx? 
  const onSubmitEditNonRecurr = () => {
    console.log("submitting non-recurr edit...");

    const nonRecurrEventsFormatted = EvFn.formatSETNonRecurrAvailabilitiesData(nonRecurrEvents);
    
    axios({ 
      method: "POST", url: "http://localhost:5000/setNonRecurrAvailability",
      data: { events: nonRecurrEventsFormatted, professionalId: "01"
      }
     }).then(() => {
        window.location = "/p/calendar/view";
      }).catch((err) => {
        console.log(err);
      });
    
      
      
  }

  const onNavigate =(date, view) => {
    console.log('navigating to...', date, view);
    setViewDate(EvFn.getSunday(date));
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
            events={props.mode==Constants.RECURRING ? eventsToRecurr : EvFn.concatEvents(nonRecurrEvents, eventsToRecurr)} // change to viewAvailabilities if theyre merged correctly in backend
            style={{ height: "100vh" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelect}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            no-overlap
            eventPropGetter={(EvFn.eventStyleGetter)}
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