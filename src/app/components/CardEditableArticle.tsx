import Link from 'next/link';
import { ArticleData } from '../context/Article';
import Image from 'next/image';
import DeleteArticleModal from './DeleteArticleModal';
import './CardEditableArticle.scss';
import { useState } from 'react';

export default function CardEditableArticle({
  slug,
  title,
  content,
  author,
  image,
  created_at,
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
    <div className={slug}>
      <Link href={`/articles/${slug}`}>
        <div className="article">
          <h2 className="article__title">{title}</h2>
          <div className="article__img">
            <Image
              className="img"
              src="https://cdn.discordapp.com/attachments/943622331916488704/1119222223698403328/carousel-3.webp" // {image}
              fill={true}
              alt="" // {figcaption}
            />
          </div>
          <p className="article__category">{categories}</p>
          <p className="article__content">{content}</p>
          <p className="article__date">{created_at}</p>
          <p className="article__author">{author}</p>
        </div>
      </Link>
      <Link href={`dashboard/articles/${slug}`}>
        <button>Modifier</button>
      </Link>
      <button onClick={handleDeleteClick}>Supprimer</button>
      {isModalVisible && (
        <div id="deleteArticleModal">
          <DeleteArticleModal slug={slug} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}
