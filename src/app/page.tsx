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
          d'esport la plus prometteuse. Initée par une entreprise
          d'accompagnement à la reconversion professionnelle dans le domaine du
          numérique, notre objectif est de créer un foyer virtuel où les joueurs
          talentueux peuvent s'épanouir et repousser les limites de leur
          potentiel.
        </p>
        <p className="about-us__description">
          Chez VictoryZone, nous mettons à votre disposition un environnement
          complet pour développer vos compétences en esports. Que vous soyez un
          joueur chevronné ou un débutant passionné, notre plateforme offre des
          ressources variées pour vous aider à atteindre vos objectifs. De
          l'entraînement intensif et spécialisé à l'analyse approfondie des
          stratégies de jeu, en passant par des séances de coaching
          personnalisées dispensées par des experts de renommée mondiale, nous
          vous donnons les outils nécessaires pour exceller dans le monde
          compétitif de l'esport.
        </p>
        <p className="about-us__description">
          Chez VictoryZone, nous croyons également en votre réussite en dehors
          de l'esport. Notre entreprise d'accompagnement à la reconversion
          professionnelle vous offre un soutien personnalisé pour vous aider à
          développer vos compétences dans le domaine du numérique ou à explorer
          d'autres opportunités de carrière passionnantes.
        </p>
        <p className="about-us__description">
          Rejoignez-nous dès aujourd'hui et faites partie de cette aventure
          extraordinaire. Ensemble, nous allons repousser les frontières de
          l'excellence dans l'esport et vous aider à réaliser votre plein
          potentiel. Rejoignez la Victoire avec VictoryZone !
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
      <div>{calendars}</div>
      <h1>Articles</h1>
      <div className="articles__home">{articles}</div>
    </main>
  );
}
