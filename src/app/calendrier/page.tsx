'use client';

import { useEffect } from 'react';
import { useCalendarContext, CalendarData } from '../context/Calendar';
import { AllCalendars, fetchCalendars } from '../components_api/CalendarList';

const API_URL =
  'https://projet-14-victory-zone-back-production.up.railway.app/';

export default function Calendar() {
  const { setCalendarList } = useCalendarContext();

  useEffect(() => {
    fetchCalendars(setCalendarList);
  }, [setCalendarList]);

  const calendars = AllCalendars();
  console.log(calendars);

  return (
    <main>
      <h1>Calendrier</h1>
      <div>{calendars}</div>
    </main>
  );
}
