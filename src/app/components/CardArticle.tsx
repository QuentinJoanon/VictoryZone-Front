import { ArticleData } from '../context/Article';

export default function CardArticle({
  slug,
  title,
  content,
  author,
  large_image,
  created_at,
  categories,
}: ArticleData) {
  return (
    <a href={`/articles/${slug}`}>
      <div className="article">
        <h2 className="article__title">{title}</h2>
        <div className="article__img">{large_image}</div>
        <p className="article__category">{categories}</p>
        <p className="article__content">{content}</p>
        <p className="article__date">{created_at}</p>
        <p className="article__author">{author}</p>
      </div>
    </a>
  );
}
