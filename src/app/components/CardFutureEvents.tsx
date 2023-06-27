import { CalendarFutureData } from '../context/Calendar';
import TimeFormatter from './timeFormatter';
import './CardCalendar.scss';
import Image from 'next/image';
import logo from '../../assets/logo.webp';
import Link from 'next/link';

export default function CardFutureEvents({
  id,
  event_name,
  event_date,
  adversary_name_short,
  live_link,
  image,
}: CalendarFutureData) {
  return (
    <div className="future event">
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
        <p>Vs</p>
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
      <a href={live_link} target="_blank">
        <button className="event__button" type="button">
          Live
        </button>
      </a>
    </div>
  );
}
