import Link from 'next/link';
import { CalendarPastData } from '../context/Calendar';
import { useState } from 'react';
import DeleteCalendarModal from './DeleteCalendarModal';

export default function CardEditablePastEvents({
  id,
  event_name,
  event_date,
  adversary_name_short,
  replay_link,
  score,
  image,
}: CalendarPastData) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={`past event event-${id}`}>
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
