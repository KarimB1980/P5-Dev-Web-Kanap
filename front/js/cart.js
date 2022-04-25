// Requète de l'API
fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    return reponse.json();
  })

  // Création de la fonction générale
  .then(function(donnees) {
    console.log(donnees)
    // Récupératon du localStorage
    let ajoutcanape = JSON.parse(localStorage.getItem("canapes"));
    console.log(ajoutcanape)

  })

  // Visualisation d'une erreur éventuelle
  .catch(err => console.log("Erreur : " + err));
