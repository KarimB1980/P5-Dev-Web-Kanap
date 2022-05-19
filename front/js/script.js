// Requète de l'API
fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    if (reponse.ok) {
      return reponse.json();
    }
  })
  .then(function(donnees) {
    // Création du code html sous l'ID items pour afficher les canapés
    function htmlCanap() {
      let listeCanape = '';
      for (let canape of donnees) {
        listeCanape += `<a href="./product.html?id=${canape._id}">`;
        listeCanape += '<article>';
        listeCanape += `<img src="${canape.imageUrl}" alt="${canape.altTxt}">`;
        listeCanape += `<h3 class="productName">${canape.name}</h3>`;
        listeCanape += `<p class="productDescription">${canape.description}</p>`;
        listeCanape += '</article>';
        listeCanape += '</a>';
      }
      // Injection du nouveau code html dans le DOM
      document.querySelector('#items').innerHTML = listeCanape;
    }
    htmlCanap();
  })
  // Visualisation d'une erreur éventuelle
  .catch(err => console.log("Erreur : " + err));