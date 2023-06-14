import { ArticleData } from '../articles/page';

export default function Article({
  id,
  title,
  content,
  author,
  large_image,
  created_at,
  categories,
}: ArticleData) {
  return (
    <div className="article">
      <div className="article__img">{large_image}</div>
      <p className="article__date">{created_at}</p>
      <p className="article__author">{author}</p>
      <p className="article__category">{categories}</p>
      <h2 className="article__title">{title}</h2>
      <p className="article__content">{content}</p>
    </div>
  );
}
