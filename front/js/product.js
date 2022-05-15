// Requète de l'API
fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    return reponse.json();
  })
  .then(function(donnees) {

    // Récupération de l'ID dans l'url
    let urlcourante = document.location.href;
    let url = new URL(urlcourante);
    let id = url.searchParams.get("id");

    let imageCanape = ''
    // Création des variables prix, titre, description, image, altImage
    function creationVariables () {
      for (let canape of donnees) {
        if (canape._id == id) {
          prix = canape.price;
          titre = canape.name;
          description = canape.description;
          image = canape.imageUrl;
          altImage = canape.altTxt;

          // Création du lien vers l'image du canapé
          imageCanape += `<img src="${image}" alt="${altImage}">`;

          // Fonction ajout des couleurs dans le menu déroulant des couleurs du canapé
          function couleursCanape() {
            var menuDeroulant=document.getElementById("colors");
            for (let couleur of canape.colors) {
              var listeCouleurs=document.createElement('option');
              listeCouleurs.setAttribute("value", couleur);
              listeCouleurs.innerHTML=couleur;
              menuDeroulant.appendChild(listeCouleurs);
            }
          }
          couleursCanape();
        }
      }
    }
    creationVariables()

    // Fonction injection du nouveau code html dans le DOM
    function htmlInfosCanape() {
      document.querySelector(".item__img").innerHTML = imageCanape;
      document.querySelector('#title').innerHTML = titre;
      document.querySelector('#price').innerHTML = prix;
      document.querySelector('#description').innerHTML = description;
    }

    htmlInfosCanape();

    // Création des variables pour la quantité de canapés et la couleur choisie
    document.getElementById("addToCart").onclick = function () {

      var selectCouleur = document.getElementById("colors");
      var couleurSelectionnee = selectCouleur.options[selectCouleur.selectedIndex].text;
      const quantiteSelectionnee = document.getElementById("quantity").value;

      // Création d'un objet pour injection dans le localStorage clé "canapes"
      let optionsCanape = {
        _id: id,
        couleur: couleurSelectionnee,
        quantite: parseInt(quantiteSelectionnee),
        titre,
        description,
        image,
        altImage
      };

      // Local storage
      // stockage de l'id, de la couleur, de la quantité de canapés, du titre, de la description, de l'url de l'image et de l'altImage
      // JSON.parse pour convertir les données au format JSON en objet javascript
      let canapeDansLocalstorage = JSON.parse(localStorage.getItem("canapes"));

      // Message d'erreur si la quantité est inférieure à 1 ou supéreure à 100
      if(quantiteSelectionnee <= 0 || quantiteSelectionnee >= 101) {
        alert("Veuillez entrer une valeur minimum 1 et maximum 100");
        return false;
      }

      // Message d'erreur si la couleur n'est pas sélectionnée
      if(couleurSelectionnee == "--SVP, choisissez une couleur --") {
        alert("Veuillez sélectionner une couleur dans ce menu déroulant");
        return false;
      }

      //Fenêtre qui confirme l'ajout des canapés dans le panier et qui permet de se rendre sur la page d'accueil en cliquant sur "Annuler" ou d'aller au panier en cliquant sur "OK"
      const validation = () => {
        if(window.confirm( `canapé: ${id} couleur: ${couleurSelectionnee} quantité: ${quantiteSelectionnee} a bien été ajouté au panier. 
        Pour consulter le panier, appuyez sur OK sinon appuyez sur ANNULER pour revenir à l'accueil et continuer vos achats.`)){
          window.location.href = "cart.html";
        }else{
          window.location.href = "index.html";
        }
      }
      // Si aucun produit n'est présent dans localstorage
      if (canapeDansLocalstorage == null) {
        canapeDansLocalstorage = [];
        canapeDansLocalstorage.push(optionsCanape);
        localStorage.setItem("canapes", JSON.stringify(canapeDansLocalstorage));
        validation()
      }
      // Si des produits sont déjà présents dans localstorage
      else if (canapeDansLocalstorage != null) {
        for (i = 0; i < canapeDansLocalstorage.length; i++) {
        // Si des canapés ayant le même id et la même couleur sont déjà présent dans le localStorage
          if (canapeDansLocalstorage[i]._id == id && canapeDansLocalstorage[i].couleur == couleurSelectionnee) {
            return(
              canapeDansLocalstorage[i].quantite = parseInt(quantiteSelectionnee) + parseInt(canapeDansLocalstorage[i].quantite),
              localStorage.setItem("canapes", JSON.stringify(canapeDansLocalstorage)),
              validation()
            )
          }
        }
        // Si des canapés ayant le même id ou la même couleur ne sont pas présents dans le localStorage
        for (i = 0; i < canapeDansLocalstorage.length; i++) {
          if (canapeDansLocalstorage[i]._id != id || canapeDansLocalstorage[i].couleur != couleurSelectionnee) {
            return(
              canapeDansLocalstorage.push(optionsCanape),
              localStorage.setItem("canapes", JSON.stringify(canapeDansLocalstorage)),
              validation()
            )
          }
        }  
      }
    }
  })
  .catch(err => console.log("Erreur : " + err));

