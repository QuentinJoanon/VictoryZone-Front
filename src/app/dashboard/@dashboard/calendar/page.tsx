'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCalendarContext } from '@/app/context/Calendar';
import {
  AllEditableFutureCalendars,
  AllEditablePastCalendars,
  fetchAdminCalendar,
} from '@/app/components_api/CalendarAdmin';
import { staatliches } from '@/styles/fonts/fonts';

export default function DashboardCalandar() {
  const { setCalendarFutureList, setCalendarPastList } = useCalendarContext();

  useEffect(() => {
    fetchAdminCalendar(setCalendarFutureList, setCalendarPastList);
  }, [setCalendarFutureList, setCalendarPastList]);

  const futureCalendar = AllEditableFutureCalendars();
  const pastCalendar = AllEditablePastCalendars();

  return (
    <section className="calendar">
      <h1 className={`calendar__title ${staatliches.className}`}>Calendrier</h1>
            <div className="new">
      <div className="new__btn">
      <Link href="/dashboard/calendar/create">
        <button className="new__btn__neon-btn">Ajouter un évenement</button>
      </Link>
        </div>
      </div>
      <div>{futureCalendar}</div>
      <div>{pastCalendar}</div>
    </section>
  );
}
