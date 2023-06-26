import Link from 'next/link';
import { ArticleData } from '../context/Article';
import Image from 'next/image';

export default function CardArticle({
  slug,
  title,
  content,
  author,
  image,
  created_at,
  categories,
  figcaption,
}: ArticleData | any) {
  return (
    <Link href={`/articles/${slug}`}>
      <div className="article">
        <h2 className="article__title">{title}</h2>
        <div className="article__img">
          <Image
            className="img"
            src={image}
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
  );
}
