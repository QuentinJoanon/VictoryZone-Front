'use client';

import { useEffect } from 'react';
import { useCalendarContext } from '../context/Calendar';
import {
  AllFutureCalendars,
  AllPastCalendars,
  fetchCalendars,
} from '../components_api/CalendarList';
import './index.scss';

export default function Calendar() {
  const { setCalendarFutureList, setCalendarPastList } = useCalendarContext();

  useEffect(() => {
    fetchCalendars(setCalendarFutureList, setCalendarPastList); // Fetch calendars and update the future and past calendars lists in the context
  }, [setCalendarFutureList, setCalendarPastList]);

  const futureCalendars = AllFutureCalendars(); // Get all future calendars from the context
  const pastCalendars = AllPastCalendars(); // Get all past calendars from the context

  return (
    <main>
      <h1>CALENDRIER</h1>
      <h2>PROCHAINS MATCHS</h2>
      <div>{futureCalendars}</div>
      <h2>DERNIERS RESULTATS</h2>
      <div>{pastCalendars}</div>
    </main>
  );
}
