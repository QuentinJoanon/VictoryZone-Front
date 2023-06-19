import { CalendarFutureData } from '../context/Calendar';
import './CardCalendar.scss';

export default function CardFutureEvents({
  id,
  event_name,
  event_date,
  adversary_name_short,
  live_link,
  score,
  image,
  publication_date,
  created_at,
  updated_at,
}: CalendarFutureData) {
  return (
    <div className="future event">
      <h2 className="event__name">{event_name}</h2>
      <h3 className="event__date">{event_date}</h3>
      <div className="event__teams">
        <div className="event__teams__home">
          <p className="event__teams__home__short-name">VZ</p>
          <div className="event__teams__home__logo"></div>
        </div>
        <p>Vs</p>
        <div className="event__teams__away">
          <p className="event__teams__away__short-name">
            {adversary_name_short}
          </p>
          <div className="event__teams__logo__away"></div>
        </div>
      </div>
      <button className="event__button" type="button">
        {live_link}
      </button>
    </div>
  );
}
