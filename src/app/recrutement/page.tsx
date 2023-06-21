// Ce code permet de créer un formulaire de recrutement et ensuite envoyer les données saisie dans le formulaire vers le backend pour un traitement ultérieur. Lorsque l'user remplit le formulaire et le soumet, les données sont colléectées, stocker dans un objet FormData, puis envoyées au backend en utilisant la methode pOST.
'use client';
import { useState } from 'react';

/* eslint-disable react/no-unescaped-entities */

export default function Recrutement() {
  const [formData, setFormData] = useState({
    // ------------------ On crée un etat local nommé formData qui contient les données du form
    user_name: '',
    email: '',
    first_name: '',
    last_name: '',
    message: '',
    cv: null,
  });

  // Gestionnaire de changement de champ:
  const handleChange = (event) => {
    //----------------------------- La fonction est appelée lorsqu'un evenement de changement se produit sur un des champs du formulaire. Elle recoit un objet 'event' en parametre qui contient des informations sur l'evenement qui s'est produit.
    const { name, value, files } = event.target; //---------------- On extrait les propriétés name,value,files de l'objet target de l'evenement. L'obj. target represemte l'element DOM sur lequel l'evenement s'est produit, ici= le champ du formulaire ou l'user a interagi. **NAME**= attribut 'name' du champ, qui identifie la clé dans l'objet formData ou la valeur sera stockée. **VALUE** = valeur actuelle du champ qui peut etre un texte saisi par l'utilisateur. **FILES** =contient les fichiers selectionnés si le champ est de type 'file'. Dans ce cas on l'utilisera pour stocker le CV choisi par l'user.
    // On verifie si le champ actuel est le champ du fichier CV en comparant la valeur de 'name' avec la chaine de caractére 'cv'. Si c'est le cas == l'user a selectionné un fichier CV, et on met a jour l'etat local 'formData' en utilsant 'setFormDate'.
    if (name === 'cv') {
      //---------------------------------------- Si le champ est le champ du fichier CV
      setFormData({
        ...formData, // -------------------------------------------- ... = syntaxe de propagation (on copie toutes les propriétées existante de formData dams le nouvel objet, puis on remplace la valeur de la clé 'cv' par le premier fichier selectionné à partir de 'files'(files[0]')
        cv: files[0], // -------------------------------------------Je stock le fichier selectionné dans l'etat local
      });
    } else {
      // ---------------------------------------------------Si le champ actuel n'est pas le champ du fichier CV, on met a jour l'etat local 'formData' via setFormDate. Cependant au lieu de mettre a jour la clé cv , on utilise la valeur de name comme clé dynamique pour mettre a jour la propriété correspondante dans formDate. Cela permet de mettre a jour les autres champs du formulaire.
      setFormData({
        ...formData,
        [name]: value, // ------------------------------------------ Sinon je stock la valeur du champ dans l'état local
      });
    }
  }; // En résumé la fonction handleChange est appelée a chaque fois qu'un champ du form change, elle met a jour l'etat local formData em fonction des valeurs saisie par l'user. Elle verifie egalement si le champ actuel est le champ du fichier CV et gére la mise a jour correspondante.

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //------------------------------ la fonction handleSubmit est executée quand le formulaire est soumis // React.FormEvent<HTMLFormElement> = Specifie que le type envent est un venement de soumission de formulaire (FormEvent) et qu'il est associé a un element de formulaire HTML ('HTMLFormElement)
    event.preventDefault(); // ------------------------------------- Empeche le comportement par defaut de l'evenement de soumission du form, qui consiste gemeralement a recharger la page.

    const { user_name, email, first_name, last_name, message, cv } = formData; //  On extraie les valeurs spécifique de l'objet formDate et on les stock dans des variables distinctes. Les noms des variables correspondent aux clés de l'objet formDate. On rend ces valeurs accessibe pour les utiliser plus tard, comme par exemple pour les envoyer au backend ou les traiter d'une autre maniere.

    // Creation d'une instance de FormDate pour envoyer les données du form
    const form = new FormData(); //---------------------------------- On crée une nouvelle instance de l'objet FormData. Cet objet est utilisé pour créer un emsemble de paires clé-valeur correspondant aux données du formulaire que nous voulons envoyer.
    form.append('user_name', user_name); // Ajout le user name au form
    form.append('email', email); // --------------------------------- form.append(...) est une méthode de l'objet FormDate qui permet d'ajouter des paires clé-valeur au formulaire. Chaque paire est ajoutée en spécifiant une clé(nom) et une valeur.
    form.append('first_name', first_name); // ----------------------- En utilisant la méthode 'append', on ajoute les données du form au FormData crée. Ca nous permet de structurer les données dans un format approprié pour les envoyer au backend
    form.append('last_name', last_name);
    form.append('message', message);
    // form.append('cv', cv);

    if (cv !== null) {
      // Le champ du CV sera ajouté au formulaire seulement si sa valeur n'est pas nulle.
      form.append('cv', cv);
    }

    // Envoi du form au backend en utilisant fetch
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/recruitment`, {
      method: 'POST',
      body: form, // Utiliser le formulaire comme corps de la requete. C'est le corps de la requete qui contient les données du formu sous forme de l'objet FormData que nous avons crée précédemment.
    })
      .then((response) => {
        if (response.ok) {
          // Le formulaire a été envoyé avecc sucès
          // On peut ajouter des actions suplémentaire ici comme afficher un message de succès ou rediriger l'user.
        } else {
          // Une erreur s'est produite lors de l'envoie du formulaire
          // On peut ajouter des actions supléementaire ici comme afficher un message d'erreur ou réinitialiser le formulaire.
        }
      })
      .catch((error) => {
        // Une erreur s'est produite lors de l'envoie du formulaire
        // On peut ajouter des actions supléementaire ici comme afficher un message d'erreur ou réinitialiser le formulaire.
      });
  };

  return (
    <main>
      <h1>RECRUTEMENT</h1>
      <div className="recrutement">
        <div className="recrutement__form">
          <form
            action="https://projet-14-victory-zone-back-production.up.railway.app/api/recruitment"
            enctype="multipart/form-date"
            method="post"
            onSubmit={handleSubmit}
          >
            {' '}
            {/* ACTION = L'url vers laquelle le form sera envoyé lors de la soumission du forn. ENCTYPE="MULTIPART/FORM-DATE" = indique que le form contient des données binaires telles que des fichiers. METHOD = indique que le form doit etre envoyé avec la methode post. ONSUBMIT=HANDLESUBMIT = gestionnaire d'evenement qui sera appelé lorsue le formulaire sera soumis. HandleSubmit est la fonction qui gére la soumission du formulaire.*/}
            <div className="recrutement__form__form-group">
              {/* Champ pour le fichier CV */}
              <input
                type="file" // Permet  l'user de selectionner un fichier
                className="form-control-file" // classe css
                name="cv" // nom du champ du fichier.
                onChange={handleChange} // Gestionnaire d'evenement qui sera appelé lorsque la valeur du champ du fichier cv change. Dans ce cas, 'handleChange' est la fonction qui met a jour l'etat local du formulaire avec la nouvelle valeur du champ.
                accept=".pdf, .doc, .docx"
                required
              />

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

              {/* Champ pour le message */}
              <textarea
                className="form-control"
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              {/* Bouton de soumission du formulaire */}
              <input
                type="submit"
                value="Envoyer"
                className="btn btn-default"
              />
            </div>
          </form>
        </div>
        <p className="recrutement__description">
          Bienvenue sur la page de recrutement de la Team VictoryZone. Si vous
          êtes un joueur talentueux, passionné par League of Legends et prêt à
          repousser vos limites, vous êtes au bon endroit. Rejoignez-nous dans
          notre quête de l'excellence compétitive et de la domination sur la
          scène de l'esport.
        </p>
      </div>
    </main>
  );
}
