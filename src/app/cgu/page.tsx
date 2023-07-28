/* eslint-disable react/no-unescaped-entities */
import './index.scss';
import { khand, staatliches, ysabeau } from '@/styles/fonts/fonts';

export default function Cgu() {
  return (
    <section className="cgu">
      <h1 className={`cgu__title ${staatliches.className}`}>
        Conditions d'utilisation
      </h1>
      <h2 className={`cgu__sub-title ${ysabeau.className}`}>
        Et Politique de confidentialité
      </h2>
      <div className={`cgu__content ${khand.className}`}>
        <h3 className="cgu__content__title">
          Conditions Générales d'utilisation
        </h3>
        <p className="cgu__content__description">
          En accédant à ce site web, vous acceptez les présentes Conditions
          Générales d'Utilisation (CGU) dans leur intégralité. Si vous
          n'acceptez pas ces CGU, veuillez cesser d'utiliser ce site.
        </p>
        <h3 className="cgu__content__title">Propriété intellectuelle:</h3>
        <p className="cgu__content__description">
          Tous les contenus présents sur ce site, tels que les textes, les
          images, les graphiques, les logos et les vidéos, sont la propriété
          intellectuelle du propriétaire du site et sont protégés par les lois
          relatives aux droits d'auteur et aux marques. Vous n'êtes pas autorisé
          à reproduire, modifier, distribuer ou exploiter ces contenus sans une
          autorisation écrite préalable.
        </p>
        <h3 className="cgu__content__title">Utilisation du site :</h3>
        <p className="cgu__content__description">
          Vous êtes autorisé à accéder et à utiliser ce site uniquement à des
          fins légales et conformément aux présentes CGU. Vous ne devez pas
          utiliser ce site pour diffuser du contenu illégal, nuisible,
          diffamatoire, obscène, offensant, ou violant les droits de propriété
          intellectuelle d'autrui. c. Vous ne devez pas perturber ou
          compromettre la sécurité ou le bon fonctionnement de ce site, ni
          tenter d'accéder à des zones restreintes du site sans autorisation.
        </p>
        <h3 className="cgu__content__title">Liens vers des sites tiers :</h3>
        <p className="cgu__content__description">
          Ce site peut contenir des liens vers des sites web tiers. Ces liens
          sont fournis uniquement pour votre commodité et ne constituent pas une
          approbation ou une garantie de ces sites. Nous déclinons toute
          responsabilité quant au contenu ou à la sécurité de ces sites tiers.
          L'accès à ces sites se fait à vos propres risques.
        </p>
        <h3 className="cgu__content__title">Limitation de responsabilité :</h3>
        <p className="cgu__content__description">
          Ce site est fourni "tel quel" et nous ne garantissons pas son
          exactitude, son exhaustivité ou sa disponibilité permanente. Nous
          déclinons toute responsabilité pour les dommages directs, indirects,
          consécutifs ou autres, découlant de l'utilisation de ce site ou de
          l'impossibilité d'y accéder.
        </p>
        <h3 className="cgu__content__title">Modifications des CGU :</h3>
        <p className="cgu__content__description">
          Nous nous réservons le droit de modifier ces CGU à tout moment, sans
          préavis. Les modifications entreront en vigueur dès leur publication
          sur ce site. Il est de votre responsabilité de consulter régulièrement
          les CGU pour vous tenir informé des éventuelles modifications.
        </p>
        <h3 className="cgu__content__title">Droit applicable :</h3>
        <p className="cgu__content__description">
          Ces CGU sont régies par les lois en vigueur dans votre pays de
          résidence. Tout litige relatif à l'utilisation de ce site sera soumis
          à la juridiction compétente de votre pays. En utilisant ce site, vous
          acceptez de respecter ces CGU. Si vous ne les acceptez pas, veuillez
          ne pas utiliser ce site...
        </p>
      </div>
    </section>
  );
}
