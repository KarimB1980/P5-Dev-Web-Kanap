// Requète de l'API
fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    return reponse.json();
  })
  // Création de la fonction qui génère le résultat de la requète API au format json, de la récupération de l'ID dans l'url ainsi que du code html pour afficher les détails du canapé, sélectionner une couleur et une quantité
  .then(function(donnees) {
    //console.log(donnees);

    // Récupération de l'ID dans l'url
    let urlcourante = document.location.href;
    let url = new URL(urlcourante);
    let id = url.searchParams.get("id");

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
      }
    }

    // Injection du nouveau code html dans le DOM
    document.querySelector(".item__img").innerHTML = imageCanape;
    document.querySelector('#title').innerHTML = titre;
    document.querySelector('#price').innerHTML = prix;
    document.querySelector('#description').innerHTML = description;

    // Création des variables pour la quantité de canapés et la couleur choisie
    document.getElementById("addToCart").onclick = function () {

      var selectCouleur = document.getElementById("colors");
      var couleurSelectionnee = selectCouleur.options[selectCouleur.selectedIndex].text;
      const quantiteSelectionnee = document.getElementById("quantity").value;

      let optionsCanape = {
        _id: id,
        couleur: couleurSelectionnee,
        quantite: parseInt(quantiteSelectionnee),
        prix,
        titre,
        description,
        image,
        altImage
      };

      // Local storage
      // stockage de l'id, de la couleur et de la quantité de canapés
      // JSON.parse pour convertir les données au format JSON
      let canapeDansLocalstorage = JSON.parse(localStorage.getItem("canapes"));

      if(quantiteSelectionnee <= 0 || quantiteSelectionnee >= 101) {
        alert("Veuillez entrer une valeur minimum 1 et maximum 100");
        return false;
      }
      if(couleurSelectionnee == "--SVP, choisissez une couleur --") {
          alert("Veuillez sélectionner une couleur dans ce menu déroulant");
          return false;
      }

      //Fonction validation ded l'ajout des canapés dans le panier
      const validation= () => {
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

