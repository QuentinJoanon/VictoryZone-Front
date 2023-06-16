import axios from 'axios';
import { CalendarData, useCalendarContext } from '../context/Calendar';
import CardNextEvents from '../components/CardNextEvents';
import React from 'react';

const API_URL =
  'https://projet-14-victory-zone-back-production.up.railway.app/';

export function fetchCalendars(
  setCalendarList: React.Dispatch<React.SetStateAction<CalendarData[]>>
) {
  axios
    .get(`${API_URL}api/calendar`)
    .then((response) => {
      setCalendarList(response.data.data);
      console.log(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function AllCalendars() {
  const { calendarList, setCalendarList } = useCalendarContext();
  const calendars = calendarList.map((calendar: CalendarData) => (
    <CardNextEvents
      key={calendar.id}
      id={calendar.id}
      event_name={calendar.event_name}
      event_date={calendar.event_date}
      adversary_name={calendar.adversary_name}
      adversary_name_short={calendar.adversary_name_short}
      // replay_link={calendar.replay_link}
      live_link={calendar.live_link}
      // score={calendar.score}
      large_image={calendar.large_image}
      // publication_date={calendar.publication_date}
      // created_at={calendar.created_at}
      // updated_at={calendar.updated_at}
    />
  ));
  return calendars;
}
