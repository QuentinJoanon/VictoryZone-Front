/* eslint-disable react/no-unescaped-entities */
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

      <h1>VictoryZone</h1>
      <div className="about-us">
        <p className="about-us__description">
          Bienvenue sur VictoryZone ! La plateforme complète de l'équipe
          d'esport la plus prometteuse, créée par une entreprise
          d'accompagnement à la reconversion professionnelle dans le domaine du
          numérique. Notre objectif est de fournir un foyer virtuel où les
          joueurs talentueux peuvent s'épanouir et dépasser leurs limites. Nous
          offrons un environnement complet pour développer vos compétences en
          esports, que vous soyez un joueur chevronné ou un débutant passionné.
          Des séances d'entraînement intensives et spécialisées, une analyse
          approfondie des stratégies de jeu et des sessions de coaching
          personnalisées dispensées par des experts renommés font partie des
          ressources que nous mettons à votre disposition pour exceller dans le
          monde compétitif de l'esport.
        </p>
        <p className="about-us__description">
          Chez VictoryZone, nous croyons en votre succès, non seulement dans
          l'esport, mais aussi dans votre reconversion professionnelle. Nous
          offrons un soutien personnalisé pour vous aider à développer vos
          compétences dans le domaine du numérique et à explorer d'autres
          opportunités de carrière passionnantes. Rejoignez-nous dès aujourd'hui
          et participez à cette aventure extraordinaire. Ensemble, nous
          repousserons les frontières de l'excellence dans l'esport et vous
          aiderons à atteindre votre plein potentiel. Rejoignez la Victoire avec
          VictoryZone !
        </p>
      </div>

      <h1>Team</h1>

      <div style={{ maxWidth: '90%', margin: '0 auto' }}>
        <Slider {...settings} className="carousel">
          {team.map((teamMember, index) => (
            <div key={index} className="team__home">
              {teamMember}
            </div>
          ))}
        </Slider>
      </div>

      <h1>Calendrier</h1>
      

      <div className="calendar-container">{calendars}</div>

      <h1>Articles</h1>
      <div className="articles__home">{articles}</div>
    </main>
  );
}
