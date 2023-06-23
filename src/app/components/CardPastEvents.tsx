import { CalendarPastData } from '../context/Calendar';

export default function CardPastEvents({
  id,
  event_name,
  event_date,
  adversary_name_short,
  replay_link,
  score,
  image,
}: CalendarPastData) {
  return (
    <div className="past event">
      <h2 className="event__name">{event_name}</h2>
      <h3 className="event__date">{event_date}</h3>
      <div className="event__teams">
        <div className="event__teams__home">
          <p className="event__teams__home__short-name">VZ</p>
          <div className="event__teams__home__logo"></div>
        </div>
        <p>{score}</p>
        <div className="event__teams__away">
          <p className="event__teams__away__short-name">
            {adversary_name_short}
          </p>
          <div className="event__teams__logo__away"></div>
        </div>
      </div>
      <button className="event__button" type="button">
        {replay_link}
      </button>
    </div>
  );
}
