import { ArticleData } from '../context/Article';
import Image from 'next/image';

export default function CardArticle({
  slug,
  title,
  content,
  author,
  large_image,
  created_at,
  categories,
  figcaption,
}: ArticleData | any) {
  return (
    <a href={`/articles/${slug}`}>
      <div className="article">
        <h2 className="article__title">{title}</h2>
        <div className="article__img">
          <Image
            className="img"
            src="https://cdn.discordapp.com/attachments/943622331916488704/1119222223698403328/carousel-3.webp" // {large_image}
            fill={true}
            alt={figcaption}
          />
        </div>
        <p className="article__category">{categories}</p>
        <p className="article__content">{content}</p>
        <p className="article__date">{created_at}</p>
        <p className="article__author">{author}</p>
      </div>
    </a>
  );
}
