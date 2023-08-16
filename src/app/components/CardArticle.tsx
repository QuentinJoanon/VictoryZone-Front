import Link from 'next/link';
import { ArticleData } from '../context/Article';
import Image from 'next/image';
import TimeFormatter from './timeFormatter';
import './CardArticle.scss';
import { khand, staatliches } from '@/styles/fonts/fonts';

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
    <article className="card-article">
      <Link className="card_article__link" href={`/articles/${slug}`}>
        <div className="card-article__img">
          <Image
            className="img"
            src={image}
            fill={true}
            alt="" // {figcaption}
            sizes="(max-width: 768px) 100vw, 700px"
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
    </article>
  );
}
