// Ce code permet de créer un formulaire de recrutement et ensuite envoyer les données saisie dans le formulaire vers le backend pour un traitement ultérieur. Lorsque l'user remplit le formulaire et le soumet, les données sont colléectées, stocker dans un objet FormData, puis envoyées au backend en utilisant la methode pOST.
'use client';
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './index.scss';
/* eslint-disable react/no-unescaped-entities */

export default function Recrutement() {
  // * Etat local pour stocker les données du formulaire:
  const [formData, setFormData] = useState({
    user_name: '', //                                                            | Nom d'utilisateur (initialisé à une chaine de caractères vide)
    email: '',
    first_name: '',
    last_name: '',
    message: '',
    external_link: '',
    cv: null as File | null, //                                                  | Fichier CV (initialisé à null)
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false); //              | Etat local pour suivre si le formulaire a été soumis avec succès ou non. False indique que par default le formulaire n'a pas encore été soumis

  // *Gestionnaire de changement de champ:
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target; //                              | Récupération des propriétés de l'élément cible

    if (name === 'cv') {
      //                                                                         | Si le champ est le champ du fichier CV
      setFormData({
        ...formData, //                                                          | Copie de l'état existant
        cv: files && files.length > 0 ? files[0] : null, //                      | Stockage du fichier CV sélectionné (ou null s'il n'y en a pas)
      });
    } else {
      //                                                                         | Si le champ n'est pas le champ du fichier CV
      setFormData({
        ...formData, //                                                          | Copie de l'etat existant
        [name]: value, //                                                        | Mise à jour de la valeur du champ correspondant dans l'état local.
      });
    }
  };

  //* Gestionnaire de changement pour le chammp de zone de texte:
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target; //                                     | Recupération des propriétées de l'élément cible

    setFormData({
      ...formData, //                                                            | Copie de l'état existant
      [name]: value, //                                                          | Mise à jour de la valeur du champ de zone de texte correspondant dans l'état local
    });
  };

  // *Gestionnaire de soumission du formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //                                                   | Empeche le comportement par defaut de l'evénement de soumission du formulaire

    const {
      user_name,
      email,
      first_name,
      last_name,
      message,
      external_link,
      cv,
    } = formData; //                                                              | Récupération des valeurs du formulaire

    if (!cv) {
      console.error('Veuillez télécharger votre CV.');
      return;
    }

    const form = new FormData(); //                                               | Création d'une instance de FormData pour envoyer les données du formulaire
    form.append('user_name', user_name); //                                       | Ajout du nom d'utilisateur
    form.append('email', email);
    form.append('first_name', first_name);
    form.append('last_name', last_name);
    form.append('message', message);
    form.append('external_link', external_link);
    form.append('cv', cv);

    // * Envoi du form au backend en utilisant axios
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}api/recruitment`, form) //         | Envoie de la requete POST avec Axios. form = new FormData() qui contient les données du formulaire
      .then((response) => {
        if (response.status === 201) {
          //                                                                      | Le code de statut HTTP 200 signifie "OK" et indique que la requete a été traitée avec succès par le serveur.
          setIsFormSubmitted(true); //                                            | Mise à jour de l'etat local pour indiquer que le formulaire a été soumis avec succès
        } else {
          console.error(
            //                                                                    | Gére l'erreur spécifique au traitement du formulaire du coté du serveur .Si la requete POST a été effectuée avec succés mais que le code n'est pas égale a 200 = Une erreur coté serveur. On envoie l'erreur au back.
            "Une erreur s'est produite lors d'envoi du formulaire."
          );
        }
      })
      .catch((error) => {
        console.error(
          //                                                                      | Gère les erreurs liées a l'envoi de la requete (comme les problemes de co...)
          "Une erreur s'est produite lors d'envoi du formulaire.",
          error
        );
      });
  };

  return (
    <main>
      <h1>RECRUTEMENT</h1>
      <div className="recrutement">
        <p className="recrutement__description">
          Bienvenue sur la page de recrutement de la Team VictoryZone. Si vous
          êtes un joueur talentueux, passionné par WarZone et prêt à repousser
          vos limites, vous êtes au bon endroit. Rejoignez-nous dans notre quête
          de l'excellence compétitive et de la domination sur la scène de
          l'esport.
        </p>

        <div className="recrutement__form">
          <form
            action="https://projet-14-victory-zone-back-production.up.railway.app/api/recruitment" // | ACTION = L'url vers laquelle le form sera envoyé lors de la soumission du forn.
            encType="multipart/form-data" //                                                          | indique que le form contient des données binaires telles que des fichiers.
            method="post" //                                                                          | indique que le form doit etre envoyé avec la methode post.
            onSubmit={handleSubmit} //                                                                | ONSUBMIT=HANDLESUBMIT = gestionnaire d'evenement qui sera appelé lorsue le formulaire sera soumis. HandleSubmit est la fonction qui gére la soumission du formulaire.
          >
            <div className="recrutement__form__form-group">
              {/* Champ pour le nom d'utilisateur */}
              <input
                type="text"
                className="form-control"
                placeholder="Nom d'utilisateur"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                required
              />
              {/* Champ pour le nom de famille */}
              <input
                type="text"
                className="form-control"
                placeholder="Nom de famille"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              {/* Champ pour le prénom */}
              <input
                type="text"
                className="form-control"
                placeholder="Prénom"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              {/* Champ pour l'adresse e-mail */}
              <input
                type="email"
                className="form-control"
                placeholder="Adresse e-mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {/* Champ pour le message */}
              <textarea
                className="form-control"
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleTextAreaChange}
                required
              ></textarea>
              {/* Champ pour le lien externe */}
              <input
                type="text"
                className="form-control"
                placeholder="Lien vers vos Highlights (facultatif)"
                name="external_link"
                value={formData.external_link}
                onChange={handleChange}
              />
              {/* Champ pour le fichier CV */}
              <input
                type="file" //                                                                        | Permet à l'user de selectionner un fichier
                className="form-control-file" //                                                      | classe css
                name="cv" //                                                                          | nom du champ du fichier.
                onChange={handleChange} //                                                            | Gestionnaire d'evenement qui sera appelé lorsque la valeur du champ du fichier cv change. Dans ce cas, 'handleChange' est la fonction qui met a jour l'etat local du formulaire avec la nouvelle valeur du champ.
                accept=".pdf, .doc, .docx"
                required
              />

              {/* Bouton de soumission du formulaire */}
              <input
                type="submit"
                value="Envoyer"
                className="btn btn-default"
              />
            </div>
          </form>
          {isFormSubmitted && <p>Le formulaire a été envoyé avec succès !</p>}
        </div>
      </div>
    </main>
  );
}
