'use client';

import { useEffect } from 'react';
import { AllArticles, fetchHomeArticles } from './components_api/ArticlesList';
import {
  AllFutureCalendars,
  AllPastCalendars,
  fetchHomeCalendars,
} from './components_api/CalendarList';
import { AllMembersTeam, fetchTeam } from './components_api/TeamList';

import { useArticleContext } from './context/Article';
import { useCalendarContext } from './context/Calendar';
import { useTeamContext } from './context/Team';
import './index.scss';

export default function Home() {
  const { setArticlesList } = useArticleContext();
  const { setCalendarFutureList, setCalendarPastList } = useCalendarContext();
  const { setTeamList } = useTeamContext();

  useEffect(() => {
    fetchHomeArticles(setArticlesList);
    fetchHomeCalendars(setCalendarFutureList, setCalendarPastList);
    fetchTeam(setTeamList);
  }, [
    setArticlesList,
    setCalendarFutureList,
    setCalendarPastList,
    setTeamList,
  ]);

  const articles = AllArticles();
  const calendars = [...AllFutureCalendars(), ...AllPastCalendars()];
  const team = AllMembersTeam();
  return (
    <main>
      <h1>Accueil</h1>
      <div>{articles}</div>
      <div>{calendars}</div>
      <div>{team}</div>
    </main>
  );
}
