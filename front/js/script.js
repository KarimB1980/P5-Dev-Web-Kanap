// Requète de l'API
fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    return reponse.json();
  })

  // Création de la fonction qui génère le résultat de la requète API au format json ainsi que du code html pour afficher les canapés
  .then(function(donnees) {

    // Création du code html sous l'ID items pour afficher les canapés
    let listeCanape = '';
    for (let canape of donnees) {
        // Création de l'url d'un produit
        listeCanape += '<a href="./product.html?id=';
        listeCanape += canape._id;
        listeCanape += '">';

        // Création d'une fiche canapé
        listeCanape += '<article>';

        // Création du lien vers l'image du canapé
        listeCanape += '<img src="';
        listeCanape += canape.imageUrl;
        listeCanape += '" ';
        listeCanape += 'alt="';
        listeCanape += canape.altTxt;
        listeCanape += '">';

        // Création du titre du canapé
        listeCanape += '<h3 class="productName">';
        listeCanape += canape.name;
        listeCanape += '</h3>';

        // Création de la description du canapé
        listeCanape += '<p class="productDescription">';
        listeCanape += canape.description;
        listeCanape += '</p>';

        // Fermeture des balises article et a
        listeCanape += '</article>';
        listeCanape += '</a>';
    }
    // Injection du nouveau code html dans le DOM
    document.querySelector('#items').innerHTML = listeCanape;

  })

  // Visualisation d'une erreur éventuelle
  .catch(err => console.log("Erreur : " + err));