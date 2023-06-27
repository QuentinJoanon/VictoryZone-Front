import Link from 'next/link';
import { ArticleData } from '../context/Article';
import Image from 'next/image';
import TimeFormatter from './timeFormatter';
import './CardArticle.scss';

export default function CardArticle({
  slug,
  title,
  content,
  author,
  image,
  created_at,
  publication_date,
  categories,
  figcaption,
}: ArticleData | any) {
  return (
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
  );
}
