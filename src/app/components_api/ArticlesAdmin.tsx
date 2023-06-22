import { ArticleData, useArticleContext } from '../context/Article';
import CardEditableArticle from '../components/CardEditableArticle';
import axiosInstance from './axiosInstance';

export function fetchAdminArticles(
  setArticlesList: React.Dispatch<React.SetStateAction<ArticleData[]>>
) {
  axiosInstance
    .get(`${process.env.NEXT_PUBLIC_API_URL}api/articles/admin`)
    .then((response) => {
      setArticlesList(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createNewArticle(newArticle: ArticleData) {
  axiosInstance({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/articles`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    data: newArticle,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function editArticle(article: ArticleData, articleId: number) {
  axiosInstance({
    method: 'patch',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/articles/${articleId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    data: article,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function deleteArticle(slug: string) {
  axiosInstance({
    method: 'delete',
    url: `${process.env.NEXT_PUBLIC_API_URL}api/articles/${slug}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function AllEditableArticles() {
  const { articlesList } = useArticleContext();
  const articles = articlesList.map((article: ArticleData) => (
    <CardEditableArticle
      key={article.id}
      slug={article.slug}
      title={article.title}
      content={article.content}
      author={article.author}
      image={article.image}
      created_at={article.created_at}
      categories={
        Array.isArray(article.categories)
          ? article.categories.map((category) => category.label)
          : []
      }
    />
  ));
  return articles;
}
