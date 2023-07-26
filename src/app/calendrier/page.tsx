'use client';

import { useEffect } from 'react';
import { useCalendarContext } from '../context/Calendar';
import {
  AllFutureCalendars,
  AllPastCalendars,
  fetchCalendars,
} from '../components_api/CalendarList';
import './index.scss';
import { staatliches, ysabeau } from '@/styles/fonts/fonts';

export default function Calendar() {
  const { setCalendarFutureList, setCalendarPastList } = useCalendarContext();

  useEffect(() => {
    fetchCalendars(setCalendarFutureList, setCalendarPastList); // Fetch calendars and update the future and past calendars lists in the context
  }, [setCalendarFutureList, setCalendarPastList]);

  const futureCalendars = AllFutureCalendars(); // Get all future calendars from the context
  const pastCalendars = AllPastCalendars(); // Get all past calendars from the context

  return (
    <section className="calendar">
      <h1 className={`calendar__title ${staatliches.className}`}>Calendrier</h1>
      <h2 className={`calendar__sub-title ${ysabeau.className}`}>
        Prochains matchs
      </h2>
      <div>{futureCalendars}</div>
      <h2
        className={`calendar__sub-title calendar__sub-title__bis ${ysabeau.className}`}
      >
        Derniers résultats
      </h2>
      <div>{pastCalendars}</div>
    </section>
  );
}
