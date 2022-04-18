fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    return reponse.json();
  })
  .then(function(donnees) {
    console.log(donnees);
    let listeCanape = '<a href="./product.html?id=42">';
    for (let canape of donnees) {
        listeCanape += '<article>';
        listeCanape += '<img src="';
        listeCanape += canape.imageUrl
        listeCanape += '" '
        listeCanape += 'alt="'
        listeCanape += canape.altTxt
        listeCanape += '">'
        listeCanape += '<h3 class="'
        listeCanape += canape._id;
        listeCanape += '">'
        listeCanape += canape.name;
        listeCanape += '</h3>'
        listeCanape += '<p>'
        listeCanape += canape.description;
        listeCanape += '</p>'
        listeCanape += '</article>';
    }
    listeCanape += '</a>';
    document.querySelector('#items'),items.innerHTML = listeCanape;
  })
  .catch(err => console.log("Erreur : " + err));