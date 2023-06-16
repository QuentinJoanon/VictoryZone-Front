import { CalendarData } from '../context/Calendar';

export default function CardNextEvents({
  id,
  event_name,
  event_date,
  adversary_name,
  adversary_name_short,
  replay_link,
  live_link,
  score,
  large_image,
  publication_date,
  created_at,
  updated_at,
}: CalendarData) {
  return (
    <div className="event">
      <h2 className="event__name">{event_name}</h2>
      <h3 className="event__date">event_date</h3>
      <div className="event__teams">
        <div className="event__teams__home-logo"></div>
        <p>Vs</p>
        <div className="event__teams__away-logo"></div>
      </div>
      <button type="button">live_link</button>
    </div>
  );
}
