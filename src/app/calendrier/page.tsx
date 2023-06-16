'use client';

import { useEffect } from 'react';
import { useCalendarContext } from '../context/Calendar';
import {
  AllFutureCalendars,
  fetchCalendars,
} from '../components_api/CalendarList';

const API_URL =
  'https://projet-14-victory-zone-back-production.up.railway.app/';

export default function Calendar() {
  const { setCalendarFutureList, setCalendarPastList } = useCalendarContext();

  useEffect(() => {
    fetchCalendars(setCalendarFutureList, setCalendarPastList);
  }, [setCalendarFutureList, setCalendarPastList]);

  const futureCalendars = AllFutureCalendars();

  return (
    <main>
      <h1>Calendrier</h1>
      <div>{futureCalendars}</div>
    </main>
  );
}
