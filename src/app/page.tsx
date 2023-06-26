'use client';

import Slider from 'react-slick';
import { settings } from './components/Carousel';
import { useEffect } from 'react';
import { AllArticles, fetchHomeArticles } from './components_api/ArticlesList';
import {
  AllFutureCalendars,
  AllPastCalendars,
  fetchHomeCalendars,
} from './components_api/CalendarList';
import { AllMembersTeam, fetchTeamHome } from './components_api/TeamList';

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
    fetchTeamHome(setTeamList);
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
      <div style={{ maxWidth: '90%', margin: '0 auto' }}>
        <Slider {...settings} className="carousel">
          {team.map((teamMember, index) => (
            <div key={index} className="team__home">
              {teamMember}
            </div>
          ))}
        </Slider>
      </div>
      <div>{calendars}</div>
      <h1>Articles</h1>
      <div className= "articles__home" >{articles}</div>
    </main>
  );
}
