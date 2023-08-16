import Link from 'next/link';
import { ArticleData } from '../context/Article';
import Image from 'next/image';
import DeleteArticleModal from './DeleteArticleModal';
import './CardEditableArticle.scss';
import { useState } from 'react';
import TimeFormatter from './timeFormatter';
import { khand, staatliches } from '@/styles/fonts/fonts';

export default function CardEditableArticle({
  slug,
  title,
  content,
  author,
  image,
  publication_date,
  categories,
  figcaption,
}: ArticleData | any) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDeleteClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <article className={`card-article ${slug}`}>
      <Link className="card_article__link" href={`/articles/${slug}`}>
          <div className="card-article__img">
            <Image
              className="img"
              src={image}
              fill={true}
              alt="" // {figcaption}
            />
          </div>
          <div className="card-article__info">
            <div className="card-article__info__top-items">
              <div
                className={`card-article__info__top-items__category ${khand.className}`}
              >
                {categories}
              </div>
              <div
                className={`card-article__info__top-items__date ${khand.className}`}
              >
                {<TimeFormatter time={publication_date} />}
              </div>
              <div className="card-article__info__top-items__author">
                {author}
              </div>
            </div>

          <h1 className={`card-article__info__title ${staatliches.className}`}>
            {title}
          </h1>

          <p className={`card-article__info__content ${khand.className}`}>
            {content}
          </p>
        </div>
      </Link>
      <div className='dashboard-btn'>
      <Link href={`dashboard/articles/${slug}`}>
        <button className="dashboard-btn__button edit">Modifier</button>
      </Link>
      <button className="dashboard-btn__button delete" onClick={handleDeleteClick}>
        Supprimer
      </button>
      </div>
      {isModalVisible && (
        <div id="deleteArticleModal">
          <DeleteArticleModal slug={slug} closeModal={closeModal} />
        </div>
      )}
    </article>
  );
}
