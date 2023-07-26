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

import Image from 'next/image';
import logo from '../../public/images/logo1.jpeg';
import { khand, staatliches, ysabeau } from '@/styles/fonts/fonts';

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
  // const calendars = [...AllFutureCalendars(), ...AllPastCalendars()];
  const futurCalendars = [...AllFutureCalendars()];
  const pastCalendars = [...AllPastCalendars()];
  const team = AllMembersTeam();
  return (
    <main>
      <div className="main">
        <section className="presentation">
          <p className={`presentation__welcome ${khand.className}`}>
            L'équipe e-sport qui allie passion, compétitivité et reconversion
            professionnelle dans le domaine du numérique.
          </p>
          <h1 className={`presentation__main-title ${staatliches.className}`}>
            Bienvenue dans la Victory Zone
          </h1>
          <h2 className={`presentation__quote ${ysabeau.className}`}>
            Conquerir le virtuel - Dominer le réel
          </h2>
          <p className={`presentation__description ${khand.className}`}>
            La VictoryZone est bien plus qu'une simple équipe e-sport.
            <br />
            Nous sommes une passerelle vers la reconversion dans le monde
            numérique.{' '}
          </p>
          <p className={`presentation__description  ${khand.className}`}>
            En nous rejoignant, vous bénéficierez d'un accompagnement
            personnalisé pour développer vos compétences en e-sport, tout en
            explorant les possibilités de carrière dans cette industrie en plein
            essor. <br />
            Que vous soyez un joueur passionné qui souhaite se professionnaliser
            ou une personne en reconversion professionnelle cherchant une
            nouvelle voie, la VictoryZone est là pour vous offrir un
            environnement stimulant et propice à la croissance.{' '}
          </p>
          <p
            className={`presentation__description presentation__description--space ${khand.className}`}
          >
            Postulez dès maintenant et faites partie de notre équipe, où la
            reconversion devient une réalité dans le monde passionnant de
            l'e-sport.
          </p>

          <div className="presentation__btn">
            <a className="presentation__btn__neon-btn" href="recrutement">
              Rejoins-nous !
            </a>
          </div>
        </section>
        <section className="team">
          <h1 className={`team__title ${staatliches.className}`}>La Team</h1>
          <h2 className={`team__sub-title ${ysabeau.className}`}>WarZone</h2>
          <div style={{ maxWidth: '90%', margin: '0 auto' }}>
            <Slider {...settings} className="carousel">
              {team.map((teamMember, index) => (
                <div key={index} className="team__home">
                  {teamMember}
                </div>
              ))}
            </Slider>
          </div>
        </section>
        <section className="calendar">
          <h1 className={`calendar__title ${staatliches.className}`}>
            Evènements
          </h1>
          <h2 className={`calendar__sub-title ${ysabeau.className}`}>
            Prochaine rencontre
          </h2>
          <div className="calendar-container">{futurCalendars}</div>
          <h2 className={`calendar__sub-title__result ${ysabeau.className}`}>
            Dernier résultat
          </h2>
          <div className="calendar-container">{pastCalendars}</div>
          <div className="calendar__btn">
            <a className="calendar__btn__neon-btn" href="calendrier">
              Tous les matchs
            </a>
          </div>
        </section>
        <section className="articles">
          <h1 className={`articles__title ${staatliches.className}`}>
            Articles
          </h1>
          <h2 className={`articles__sub-title ${ysabeau.className}`}>
            Dernieres News
          </h2>
          <div className="articles__home">{articles}</div>
          <div className="articles__btn">
            <a className="articles__btn__neon-btn" href="articles">
              Tous les articles
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
