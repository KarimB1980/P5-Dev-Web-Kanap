// Requète de l'API
fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    return reponse.json();
  })
  // Création de la fonction qui génère le résultat de la requète API au format json, de la récupération de l'ID dans l'url ainsi que du code html pour afficher les détails du canapé, sélectionner une couleur et une quantité
  .then(function(donnees) {
    console.log(donnees);

    // Récupération de l'ID dans l'url
    let urlcourante = document.location.href;
    console.log(urlcourante);
    let url = new URL(urlcourante);
    let id = url.searchParams.get("id");
    console.log(id)

    let imageCanape = '';

    for (let canape of donnees) {
      if (canape._id == id) {

        prix = canape.price;
        titre = canape.name;
        description = canape.description;
        image = canape.imageUrl;
        altImage = canape.altTxt;

        // Création du lien vers l'image du canapé
        imageCanape += '<img src="';
        imageCanape += image;
        imageCanape += '" ';
        imageCanape += 'alt="';
        imageCanape += altImage;
        imageCanape += '">';

        // Ajout des couleurs dans le menu déroulant des couleurs du canapé
        var menuDeroulant=document.getElementById("colors");
        for (let couleur of canape.colors) {
          var listeCouleurs=document.createElement('option');
          listeCouleurs.setAttribute("value", couleur)
          listeCouleurs.innerHTML=couleur;
          menuDeroulant.appendChild(listeCouleurs);
        }

        console.log(titre, prix, description, image, altImage);
      }
    }

    // Injection du nouveau code html dans le DOM
    document.querySelector(".item__img").innerHTML = imageCanape;
    document.querySelector('#title').innerHTML = titre;
    document.querySelector('#price').innerHTML = prix;
    document.querySelector('#description').innerHTML = description;

    // Création des variables pour la quantité de canapés et la couleur choisie
    document.getElementById("addToCart").onclick = function () {

      //function validateForm()  {
      var selectCouleur = document.getElementById("colors");
      var couleurSelectionnee = selectCouleur.options[selectCouleur.selectedIndex].text;
      const quantiteSelectionnee = document.getElementById("quantity").value;

      let optionsCanape = {
        _id: id,
        couleur: couleurSelectionnee,
        quantite: quantiteSelectionnee,
      };
      console.log(optionsCanape);

      // Local storage
      // stockage de l'id, de la couleur et de la quantité de canapés
      // JSON.parse pour convertir les données au format JSON
      let canapeDansLocalstorage = JSON.parse(localStorage.getItem("canapes"));
      console.log(canapeDansLocalstorage);

      if(quantiteSelectionnee <= 0 || quantiteSelectionnee >= 101) {
        alert("Veuillez entrer une valeur minimum 1 et maximum 100");
        return false;
      }
      if(couleurSelectionnee == "--SVP, choisissez une couleur --") {
          alert("Veuillez sélectionner une couleur dans ce menu déroulant");
          return false;
      }

      // si des produits sont déjà présents dans localstorage
      if (canapeDansLocalstorage) {

        for (let canap of canapeDansLocalstorage) {
          if (canap._id == id && canap.couleur == couleurSelectionnee) {
            canap.quantite = parseInt(canap.quantite) + parseInt(quantiteSelectionnee),
            //quanti = canap.quantite
            quantite = ""
            quantite += canap.quantite
            quantite += ""
            localStorage.setItem("canapes",JSON.stringify(canapeDansLocalstorage));
            console.log[canapeDansLocalstorage];
          }
          /*if (canap._id != id || canap.couleur != couleurSelectionnee) {
            canap.quantite = quantiteSelectionnee,
            quantite = canap.quantite
            localStorage.setItem("canapes",JSON.stringify(canapeDansLocalstorage));
            console.log[canapeDansLocalstorage];*/

        }
        for (let canap of canapeDansLocalstorage) {
          if (canap._id != id || canap.couleur != couleurSelectionnee) {
            canapeDansLocalstorage.push(optionsCanape);
            localStorage.setItem("canapes",JSON.stringify(canapeDansLocalstorage));
            console.log[canapeDansLocalstorage];
          }
        }
      }

      // si il n'y a pas de produits présents dans localstorage
      else {
        canapeDansLocalstorage = [];
        canapeDansLocalstorage.push(optionsCanape);
        localStorage.setItem("canapes",JSON.stringify(canapeDansLocalstorage));
        console.log[canapeDansLocalstorage];
      }
    }
  })
  .catch(err => console.log("Erreur : " + err));