import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useNavigate, Link } from "react-router-dom";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Calender.css";

import * as EvFn from "../EventActions";
import * as Constants from "../Constants";
import { getRecurrAvailability, getAvailability, getBookings, 
  setRecurrAvailability, setNonRecurrAvailability } from "../../../APICalls"

import moment from "moment";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);


function ProfCalendarEdit({ mode, id, sendMode}) {
  const navigate = useNavigate();

  const [eventsToRecurr, setEventsToRecurr] = useState([]); // events recurring weekly
  const [viewAvailabilities, setViewAvailabilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [viewDate, setViewDate] = useState(EvFn.getSunday(new Date()));


  useEffect(() => {
    console.log('id of professional:', id);
    if (mode === Constants.RECURRING) {
      getRecurrAvailability({
        professionalId: id,
        start: EvFn.getDateFromDateTime(viewDate),
      }).then((res) => {
          let sundayOfCurrWeek = EvFn.getSunday(new Date());
          let resFormatted = EvFn.formatWeekEventsForGET(
            res,
            sundayOfCurrWeek,
            Constants.AVAILABILITY
          );
          setEventsToRecurr(resFormatted);
        }).catch((err) => console.log(err));

    } else if (mode === Constants.NONRECURR) {

      getAvailability({ 
        professionalId: id, 
        start: EvFn.getDateFromDateTime(viewDate),
        type: "professional",
      }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(viewDate);
        let resFormatted = EvFn.formatWeekEventsForGET(
          res,
          sundayOfCurrWeek,
          Constants.AVAILABILITY
        );
        setViewAvailabilities(resFormatted);
      }).catch((err) => console.log(err));

      getBookings({
        professionalId: id,
        start: EvFn.getDateFromDateTime(viewDate),
      }).then((res) => {
          let sundayOfCurrWeek = EvFn.getSunday(viewDate);
          const resFormatted = EvFn.formatWeekEventsForGET(
            res,
            sundayOfCurrWeek,
            Constants.BOOKING
          );
          setBookings(resFormatted);
        }).catch((err) => console.log(err));
    }
  }, []);

  // TODO prevent overlapping booking/availability events
  const handleSelect = ({ start, end }) => {
    console.log("creating event ...");
    if (mode === Constants.RECURRING) {
      setEventsToRecurr([
        ...eventsToRecurr,
        {
          start: start,
          end: end,
          title: Constants.RECURRING,
          color: Constants.RECURR_AVAIL_COLOR,
          id: eventsToRecurr.length,
        },
      ]);
    } else if (mode === Constants.NONRECURR) {
      setViewAvailabilities([
        ...viewAvailabilities,
        {
          start: start,
          end: end,
          title: Constants.NONRECURR,
          color: Constants.NON_RECURR_AVAIL_COLOR,
          id: viewAvailabilities.length,
        },
      ]);
    }
  };

  // TODO: make generic function and pass in states and setStates as parameters
  const handleSelectEvent = (event) => {
    console.log("clicking on event...");
    if (event.title === Constants.BOOKING) return;
    if (mode === Constants.RECURRING) {
      const w = window.confirm("Would you like to remove this event?");
      if (w) {
        let eventsAfterDeletion = [];
        eventsToRecurr.forEach(function (e) {
          // need to re-add to the events to fix the ids
          if (e.id !== event.id)
            eventsAfterDeletion.push({ ...e, id: eventsAfterDeletion.length });
        });
        setEventsToRecurr(eventsAfterDeletion);
      }
    } else if (mode === Constants.NONRECURR) {
      const w = window.confirm("Would you like to remove this event?");
      if (w) {
        let eventsAfterDeletion = [];
        viewAvailabilities.forEach(function (e) {
          // need to re-add to the events to fix the ids
          if (e.id !== event.id)
            eventsAfterDeletion.push({ ...e, id: eventsAfterDeletion.length });
        });
        setViewAvailabilities(eventsAfterDeletion);
      }
    }
  };

  const onEventResize = (data) => {
    console.log("event resizing...");
    if (data.event.title === Constants.BOOKING) return;
    if (mode === Constants.RECURRING) {
      setEventsToRecurr(
        eventsToRecurr.map((e) => {
          if (e.id === data.event.id)
            return { ...e, start: data.start, end: data.end };
          return e;
        })
      );
    } else if (mode === Constants.NONRECURR) {
      setViewAvailabilities(
        viewAvailabilities.map((e) => {
          if (e.id === data.event.id)
            return {
              ...e,
              start: data.start,
              end: data.end,
              color: Constants.NON_RECURR_AVAIL_COLOR,
              title: Constants.NONRECURR,
            };
          return e;
        })
      );
    }
  };

  const onEventDrop = (data) => {
    console.log("event dropped...");
    if (data.event.title === Constants.BOOKING) return;
    if (mode === Constants.RECURRING) {
      setEventsToRecurr(
        eventsToRecurr.map((e) => {
          if (e["id"] === data.event.id)
            return { ...e, start: data.start, end: data.end };
          return e;
        })
      );
    } else if (mode === Constants.NONRECURR) {
      setViewAvailabilities(
        viewAvailabilities.map((e) => {
          if (e["id"] === data.event.id)
            return {
              ...e,
              start: data.start,
              end: data.end,
              color: Constants.NON_RECURR_AVAIL_COLOR,
              title: Constants.NONRECURR,
            };
          return e;
        })
      );
    }
  };

  const onSubmitEditRecurr = () => {
    console.log("submitting recurr availability edit...");
    const eventsToRecurrFormatted =
      EvFn.formatWeekEventsForPOST(eventsToRecurr);
    
    setRecurrAvailability({ 
      events: eventsToRecurrFormatted, 
      professionalId: id 
    }).then(() => {
      navigate("/p/availability");
    }).catch((err) => console.log(err));
  };

  const onSubmitEditNonRecurr = () => {
    console.log("submitting non-recurr edit...");
    const allAvailabilitiesFormatted =
      EvFn.formatWeekEventsForPOST(viewAvailabilities);
    
    setNonRecurrAvailability({
      events: allAvailabilitiesFormatted,
      professionalId: id,
      start: EvFn.getDateFromDateTime(viewDate),
    }).then(() => {
        navigate("/p/availability");
      }).catch((err) => console.log(err));
  };

  const onNavigate = (date, view) => {
    console.log("navigating to...", EvFn.getSunday(date));
    getAvailability({
      professionalId: id,
      start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)),
      type: "professional",
    }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        let resFormatted = EvFn.formatWeekEventsForGET(
          res,
          sundayOfCurrWeek,
          Constants.AVAILABILITY
        );
        setViewAvailabilities(resFormatted);
      }).catch((err) => console.log(err));
    
    getBookings({
      professionalId: id,
      start: EvFn.getDateFromDateTime(new Date(EvFn.getSunday(date) - 7)),
    }).then((res) => {
        let sundayOfCurrWeek = EvFn.getSunday(date);
        const resFormatted = EvFn.formatWeekEventsForGET(
          res,
          sundayOfCurrWeek,
          Constants.BOOKING
        );
        setBookings(resFormatted);
      }).catch((err) => console.log(err));
    setViewDate(new Date(EvFn.getSunday(date) - 7));
  };

  return (
    <div>
      <div className="calendar">
        <h2>Edit mode.</h2>
        <p>
          editing{" "}
          {mode === Constants.RECURRING ? "recurring" : "nonrecurring"}{" "}
          dates
        </p>
        {mode === Constants.NONRECURR && (
          <p>
            nonrecurring events are only edited every week after submit. your
            edits are lost if not submitting weekly.
          </p>
        )}
        <div
          className={
            mode === Constants.RECURRING
              ? "prof-calender recurr"
              : "prof-calender non-recurr"
          }
        >
          <DragAndDropCalendar
            views={["week", "day"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="week"
            events={
              mode === Constants.RECURRING
                ? eventsToRecurr
                : EvFn.concatEvents(viewAvailabilities, bookings)
            }
            style={{ height: "100vh" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelect}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            no-overlap
            eventPropGetter={EvFn.eventStyleGetter}
            onNavigate={onNavigate}
          />
        </div>
        <button
          onClick={
            mode === Constants.RECURRING
              ? onSubmitEditRecurr
              : onSubmitEditNonRecurr
          }
          style={{ padding: "10px 100px", margin: "10px 25px" }}
        >
          Submit
        </button>
        <button
          onClick={() => {navigate("/p/availability");
            sendMode(Constants.VIEW);
          }}
          style={{ padding: "10px 100px", margin: "10px 25px" }}
        >
          Cancel Edit
        </button>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default ProfCalendarEdit;
