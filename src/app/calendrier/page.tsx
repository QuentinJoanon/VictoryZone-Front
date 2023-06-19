'use client';

import { useEffect } from 'react';
import { useCalendarContext } from '../context/Calendar';
import {
  AllFutureCalendars,
  AllPastCalendars,
  fetchCalendars,
} from '../components_api/CalendarList';
// import './index.scss';

const API_URL =
  'https://projet-14-victory-zone-back-production.up.railway.app/';

export default function Calendar() {
  const { setCalendarFutureList, setCalendarPastList } = useCalendarContext();

  useEffect(() => {
    fetchCalendars(setCalendarFutureList, setCalendarPastList);
  }, [setCalendarFutureList, setCalendarPastList]);

  const futureCalendars = AllFutureCalendars();
  const pastCalendars = AllPastCalendars();

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
