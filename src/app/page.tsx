'use client';

import { useEffect } from 'react';
import { AllArticles, fetchHomeArticles } from './components_api/ArticlesList';
import {
  AllFutureCalendars,
  AllPastCalendars,
  fetchHomeCalendars,
} from './components_api/CalendarList';
import { useArticleContext } from './context/Article';
import { useCalendarContext } from './context/Calendar';
import './index.scss';

export default function Home() {
  const { setArticlesList } = useArticleContext();
  const { setCalendarFutureList, setCalendarPastList } = useCalendarContext();

  useEffect(() => {
    fetchHomeArticles(setArticlesList);
    fetchHomeCalendars(setCalendarFutureList, setCalendarPastList);
  });

  const articles = AllArticles();
  const calendars = [...AllFutureCalendars(), ...AllPastCalendars()];
  return (
    <main>
      <h1>Accueil</h1>
      <div>{calendars}</div>
      <div className= "articles__home" >{articles}</div>
    </main>
  );
}
