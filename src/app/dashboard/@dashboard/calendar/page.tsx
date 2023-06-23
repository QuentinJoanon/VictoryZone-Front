'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCalendarContext } from '@/app/context/Calendar';
import {
  AllEditableFutureCalendars,
  AllEditablePastCalendars,
  fetchAdminCalendar,
} from '@/app/components_api/CalendarAdmin';

export default function DashboardCalandar() {
  const { setCalendarFutureList, setCalendarPastList } = useCalendarContext();

  useEffect(() => {
    fetchAdminCalendar(setCalendarFutureList, setCalendarPastList);
  }, [setCalendarFutureList, setCalendarPastList]);

  const futureCalendar = AllEditableFutureCalendars();
  const pastCalendar = AllEditablePastCalendars();

  return (
    <main>
      <h1>Calendrier</h1>
      <Link href="/dashboard/calendar/create">
        <button>Ajouter un évenement</button>
      </Link>

      <div>{futureCalendar}</div>
      <div>{pastCalendar}</div>
    </main>
  );
}
