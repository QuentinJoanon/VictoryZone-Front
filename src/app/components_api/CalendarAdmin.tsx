import { ArticleData, useArticleContext } from '../context/Article';
import CardEditableArticle from '../components/CardEditableArticle';
import axiosInstance from './axiosInstance';
import {
  CalendarData,
  CalendarFutureData,
  CalendarPastData,
  useCalendarContext,
} from '../context/Calendar';
import CardEditableFutureEvents from '../components/CardEditableFutureEvents';
import CardEditablePastEvents from '../components/CardEditablePastEvents';

export function fetchAdminCalendar(
  setCalendarFutureList: React.Dispatch<
    React.SetStateAction<CalendarFutureData[]>
  >,
  setCalendarPastList: React.Dispatch<React.SetStateAction<CalendarPastData[]>>
) {
  axiosInstance({
    method: 'get',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/calendar`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      setCalendarFutureList(response.data.data.future_event);
      setCalendarPastList(response.data.data.past_event);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createNewEvent(newEvent: CalendarData) {
  axiosInstance({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/calendar`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    data: newEvent,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function editEvent(event: CalendarFutureData) {
  axiosInstance({
    method: 'patch',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/calendar/${event.id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    data: event,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function deleteCalendar(id: number) {
  axiosInstance({
    method: 'delete',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/calendar/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function AllEditableFutureCalendars() {
  const { calendarFutureList } = useCalendarContext();
  const calendars = calendarFutureList.map((calendar: CalendarFutureData) => (
    <CardEditableFutureEvents
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

export function AllEditablePastCalendars() {
  const { calendarPastList } = useCalendarContext();
  const calendars = calendarPastList.map((calendar: CalendarPastData) => (
    <CardEditablePastEvents
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
