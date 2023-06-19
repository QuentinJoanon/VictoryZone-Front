'use client';

import { createContext, useContext, useState } from 'react';

export interface ArticleData {
  id?: number;
  slug?: string;
  title: string;
  content: string;
  author: string | null;
  large_image?: string;
  figcaption?: string;
  publication_date?: string;
  created_at?: string;
  updated_at?: string;
  categories?: any | string;
}

interface ArticleContextType {
  articlesList: ArticleData[];
  setArticlesList: React.Dispatch<React.SetStateAction<ArticleData[]>>;
}

const ArticlesContext = createContext<ArticleContextType>({
  articlesList: [],
  setArticlesList: () => {},
});

export const ArticlesContextProvider = ({ children }: any) => {
  const [articlesList, setArticlesList] = useState<ArticleData[]>([]);

  return (
    <ArticlesContext.Provider value={{ articlesList, setArticlesList }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticleContext = () => useContext(ArticlesContext);
