import axios from 'axios';
import {
  CalendarFutureData,
  CalendarPastData,
  useCalendarContext,
} from '../context/Calendar';
import CardFutureEvents from '../components/CardFutureEvents';
import React from 'react';
import CardPastEvents from '../components/CardPastEvents';

// Fetches all calendars data from the API
export function fetchCalendars(
  setCalendarFutureList: React.Dispatch<
    React.SetStateAction<CalendarFutureData[]>
  >,
  setCalendarPastList: React.Dispatch<React.SetStateAction<CalendarPastData[]>>
) {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/calendar`)
    .then((response) => {
      setCalendarFutureList(response.data.data.future_event);
      setCalendarPastList(response.data.data.past_event);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Fetches specific calendars data for the home page from the API
export function fetchHomeCalendars(
  setCalendarFutureList: React.Dispatch<
    React.SetStateAction<CalendarFutureData[]>
  >,
  setCalendarPastList: React.Dispatch<React.SetStateAction<CalendarPastData[]>>
) {
  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/calendar?home=true`)
    .then((response) => {
      setCalendarFutureList(response.data.data.future_event);
      setCalendarPastList(response.data.data.past_event);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Renders all future calendars based on the calendar context
export function AllFutureCalendars() {
  const { calendarFutureList } = useCalendarContext();
  const calendars = calendarFutureList.map((calendar: CalendarFutureData) => (
    <CardFutureEvents
      key={calendar.id}
      id={calendar.id}
      event_name={calendar.event_name}
      event_date={calendar.event_date}
      adversary_name_short={calendar.adversary_name_short}
      live_link={calendar.live_link}
      image={calendar.image}
    />
  ));
  return calendars;
}

// Renders all past calendars based on the calendar context
export function AllPastCalendars() {
  const { calendarPastList } = useCalendarContext();
  const calendars = calendarPastList.map((calendar: CalendarPastData) => (
    <CardPastEvents
      key={calendar.id}
      id={calendar.id}
      event_name={calendar.event_name}
      event_date={calendar.event_date}
      adversary_name_short={calendar.adversary_name_short}
      replay_link={calendar.replay_link}
      score={calendar.score}
      image={calendar.image}
    />
  ));
  return calendars;
}
