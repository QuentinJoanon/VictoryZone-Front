import Link from 'next/link';
import { ArticleData } from '../context/Article';
import Image from 'next/image';
import DeleteArticleModal from './DeleteArticleModal';
import './CardArticle.scss';
import { useState } from 'react';
import TimeFormatter from './timeFormatter';

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
    <div className={`article-box ${slug}`}>
      <Link href={`/articles/${slug}`}>
        <div className="article">
          <div className="article__img">
            <Image
              className="img"
              src={image}
              fill={true}
              alt="" // {figcaption}
            />
          </div>
          <div className="info-container">
            <div>
              <p className="article__date">
                {<TimeFormatter time={publication_date} />}
              </p>
              <p className="article__author">{author}</p>
            </div>
            <div>
              <p className="article__category">{categories}</p>
            </div>
          </div>
          <h2 className="article__title">{title}</h2>
          <p className="article__content">{content}</p>
        </div>
      </Link>
      <Link href={`dashboard/articles/${slug}`}>
        <button className="button-edit">Modifier</button>
      </Link>
      <button className="button-delete" onClick={handleDeleteClick}>
        Supprimer
      </button>
      {isModalVisible && (
        <div id="deleteArticleModal">
          <DeleteArticleModal slug={slug} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
