import Link from 'next/link';
import { CalendarFutureData } from '../context/Calendar';
import { useState } from 'react';
import './CardCalendar.scss';
import DeleteCalendarModal from './DeleteCalendarModal';
import Image from 'next/image';
import logo from '../../assets/logo.webp';

export default function CardEditableFutureEvents({
  id,
  event_name,
  event_date,
  adversary_name_short,
  live_link,
  image,
}: CalendarFutureData) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={`future event event-${id}`}>
      <h2 className="event__name">{event_name}</h2>
      <h3 className="event__date">{event_date}</h3>
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
      <Link href={`dashboard/calendar/${id}`}>
        <button>Modifier</button>
      </Link>
      <button onClick={handleDeleteClick}>Supprimer</button>
      {isModalVisible && (
        <div id="deleteArticleModal">
          <DeleteCalendarModal id={id} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
