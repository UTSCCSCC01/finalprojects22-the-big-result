import * as Constants from './Constants'

export const getNextWeek = (date) => {
  // courtsey: https://stackoverflow.com/questions/1025693/how-to-get-next-week-date-in-javascript
  var nextWeek = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  return nextWeek;
}


export const recurrEvents = (eventsToRecur, numWeeks) => {
  let recurredEvents = [];
  eventsToRecur.forEach(function(e) {
    let currStart = e.start;
    let currEnd = e.end;
    for (let weekdayI=0; weekdayI < numWeeks; weekdayI++) {
      recurredEvents.push({...e, start: currStart, end: currEnd, id: recurrEvents.length})
      currStart = getNextWeek(currStart);
      currEnd = getNextWeek(currEnd);
    }
  });
  return recurredEvents;
}

export const getTimeFromDate = (date) => {
  return date.getHours().toString().padStart(2, '0') + ":" +
        date.getMinutes().toString().padStart(2, '0') + ":" +
        date.getSeconds().toString().padStart(2, '0');
}

export const getDateFromDateTime = (date) => {
  return date.getFullYear().toString().padStart(4, '0') + "-" +
        (date.getMonth()+1).toString().padStart(2, '0') + "-" +
        date.getDate().toString().padStart(2, '0');
}

export const eventStyleGetter = (event, start, end, isSelected) => {
  var backgroundColor = '#' + event.color;
  var style = {
      backgroundColor: backgroundColor,
      borderRadius: '10px',
      opacity: 0.8,
      color: 'white',
      border: '20px',
      display: 'block',
      boxShadow: 'black'
  };
  return { style: style };
}

export const concatEvents = (eventsArr1, eventArr2) => {
  let res = []; // re-make ids
  eventsArr1.concat(eventArr2).forEach(e => {res.push({...e, id: res.length})});
  return res;
}

// get sunday of the week of the date given
export const getSunday = (date) => {
  let d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d; 
}

export const shiftDayFromSunday = (date, numDaysToShiftBy) => {
  let d = new Date(date);
  d.setDate(d.getDate() + numDaysToShiftBy);
  return d;
}

export const formatWeekEventsForGET = (res, curSunday, dataType) => {
  let dataFormatted = [];
  for (let dayi = 0; dayi < 7; dayi++) {
      let daySlots = res.data[dayi]; 
      let resDate = shiftDayFromSunday(curSunday, dayi); 

      daySlots.forEach((slot) => {   
        let splitTime = slot.start.split(':');
        resDate.setHours(parseInt(splitTime[0]));
        resDate.setMinutes(parseInt(splitTime[1]));
        resDate.setSeconds(parseInt(splitTime[2]));
        let start = new Date(resDate);
        
        splitTime = slot.end.split(':');
        resDate.setHours(parseInt(splitTime[0]));
        resDate.setMinutes(parseInt(splitTime[1]));
        resDate.setSeconds(parseInt(splitTime[2]));
        let end = new Date(resDate); 
        
        if (dataType==Constants.BOOKING) {
          dataFormatted.push({
            start: start, end: end, 
            id: dataFormatted.length, 
            title: Constants.BOOKING, 
            color: Constants.BOOKING_COLOR
          })
        } else if (dataType==Constants.AVAILABILITY) {
          dataFormatted.push({
            start: start, end: end, 
            id: dataFormatted.length, 
            title: Constants.AVAILABILITY, 
            color: Constants.AVAIL_COLOR
          })
        }
      });
  }
  return dataFormatted;
}

export const formatWeekEventsForPOST = (recurrAvailabilities) => {
  let dataFormatted = {};
  for (let weekdayI=0; weekdayI < 7; weekdayI++) dataFormatted[weekdayI.toString()] = [];
  recurrAvailabilities.forEach(function(e) {
    let dayOfWeekI = e.start.getDay().toString();
    dataFormatted[dayOfWeekI].push({ 
          start: getTimeFromDate(e.start), 
          end: getTimeFromDate(e.end) 
      })
    })
    return dataFormatted;
}


export const formatSETNonRecurrAvailabilitiesData = (nonRecurrEvents) => {
  let dataFormatted = {};
  
  nonRecurrEvents.forEach((e) => {
    console.log(e);
    dataFormatted[getDateFromDateTime(e.start)] = []; 
  })

  nonRecurrEvents.forEach(function(e) {
    let day = getDateFromDateTime(e.start);
    dataFormatted[day].push({ 
          start: getTimeFromDate(e.start), 
          end: getTimeFromDate(e.end) 
      })
    })
    
    console.log(dataFormatted);
    return dataFormatted;
}
