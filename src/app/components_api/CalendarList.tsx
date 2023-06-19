import axios from 'axios';
import {
  CalendarFutureData,
  CalendarPastData,
  useCalendarContext,
} from '../context/Calendar';
import CardFutureEvents from '../components/CardFutureEvents';
import React from 'react';
import CardPastEvents from '../components/CardPastEvents';

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
      console.log(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function AllFutureCalendars() {
  const { calendarFutureList, setCalendarFutureList } = useCalendarContext();
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
