'use client';

import { createContext, useContext, useState } from 'react';

export interface ArticleData {
  map?: any;
  id?: number;
  slug?: string;
  title: string;
  content: string;
  author?: string | null;
  image?: File | null;
  figcaption?: string;
  publication_date?: string;
  created_at?: string;
  updated_at?: string;
  categories?: any | string;
}

// Define the type for the article context
interface ArticleContextType {
  articlesList: ArticleData[];
  setArticlesList: React.Dispatch<React.SetStateAction<ArticleData[]>>;
}

// Create the context for articles
const ArticlesContext = createContext<ArticleContextType>({
  articlesList: [],
  setArticlesList: () => {},
});

// Provider component for the articles context
export const ArticlesContextProvider = ({ children }: any) => {
  const [articlesList, setArticlesList] = useState<ArticleData[]>([]);

  return (
    <ArticlesContext.Provider value={{ articlesList, setArticlesList }}>
      {children}
    </ArticlesContext.Provider>
  );
};

// Custom hook to access the articles context
export const useArticleContext = () => useContext(ArticlesContext);
