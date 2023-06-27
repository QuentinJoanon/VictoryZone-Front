import { CalendarPastData } from '../context/Calendar';
import Image from 'next/image';
import logo from '../../assets/logo.webp';
import TimeFormatter from './timeFormatter';
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
      <h3 className="event__date">{<TimeFormatter time={event_date} />}</h3>
      <div className="event__teams">
        <div className="event__teams__home">
          <p className="event__teams__home__short-name">VZ</p>
          <div className="event__teams__home__logo">
            <Image
              className="logo"
              src={logo}
              fill={true}
              alt="Logo VictoryZone"
              priority={true}
            />
          </div>
        </div>
        <p>{score}</p>
        <div className="event__teams__away">
          <p className="event__teams__away__short-name">
            {adversary_name_short}
          </p>
          <div className="event__teams__logo__away">
            <Image
              className="logo"
              src={image}
              fill={true}
              alt="Logo VictoryZone"
              priority={true}
            />
          </div>
        </div>
      </div>
      <a href={replay_link} target="_blank">
        <button className="event__button" type="button">
          Replay
        </button>
      </a>
    </div>
  );
}
