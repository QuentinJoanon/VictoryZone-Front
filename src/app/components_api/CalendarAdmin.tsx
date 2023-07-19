import axiosInstance from './axiosInstance';
import {
  CalendarData,
  CalendarFutureData,
  CalendarPastData,
  useCalendarContext,
} from '../context/Calendar';
import CardEditableFutureEvents from '../components/CardEditableFutureEvents';
import CardEditablePastEvents from '../components/CardEditablePastEvents';

// Fetches the admin calendar data from the API
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

// Creates a new event in the calendar
export function createNewEvent(form: FormData): Promise<number> {
  return axiosInstance({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/calendar`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'multipart/form-data',
    },
    data: form,
  })
    .then((response) => {
      if (response.status === 201) {
        return response.status;
      } else {
        throw new Error(
          "Une erreur s'est produite lors de l'envoi du formulaire."
        );
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

// Edits an existing future event in the calendar
export function editEvent(event: FormData, id: number): Promise<number> {
  return axiosInstance({
    method: 'patch',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/calendar/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'multipart/form-data',
    },
    data: event,
  })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        return response.status;
      } else {
        throw new Error(
          "Une erreur s'est produite lors de l'envoi du formulaire."
        );
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

// Deletes a calendar event by ID
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

// Renders all editable future calendars based on the calendar context
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

// Renders all editable past calendars based on the calendar context
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
