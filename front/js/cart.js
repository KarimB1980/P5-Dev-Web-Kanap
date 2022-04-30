if (localStorage.getItem("canapes") != null) {
  // Récupération du tableau créé dans product.html
  let ajoutCanape = JSON.parse(localStorage.getItem("canapes"));

  // Création du code html sous l'ID items pour afficher les canapés
  let listeCanape = '';
  for (let canape of ajoutCanape) {

    // Création d'une fiche canapé
    listeCanape += '<article class="cart__item" data-id="';
    listeCanape += canape._id;
    listeCanape += '" data-color="';
    listeCanape += canape.couleur;
    listeCanape += '">';

    // Création de la class "cart__item__img"
    listeCanape += '<div class="cart__item__img">';

    // Création du lien vers l'image du canapé
    listeCanape += '<img src="',
    listeCanape += canape.image,
    listeCanape += '" ',
    listeCanape += 'alt="',
    listeCanape += canape.altImage,
    listeCanape += '">'

    // Création de la class "cart__item__content"
    listeCanape += '<div class="cart__item__content"></div>';

    // Création de la class "cart__item__content__description"
    listeCanape += '<div class="cart__item__content__description">'

    // Création du titre du canapé
    listeCanape += '<h2>';
    listeCanape += canape.titre;
    listeCanape += '</h2>';

    // Création de la couleur du canapé
    listeCanape += '<p>';
    listeCanape += canape.couleur;
    listeCanape += '</p>';

    // Création du prix du canapé
    listeCanape += '<p>';
    listeCanape += canape.prix;
    listeCanape += ' €</p>';

    // Création de la  class="cart__item__content__settings"
    listeCanape += '<div class="cart__item__content__settings"></div>'

    // Création de la  class="cart__item__content__settings__quantity"
    listeCanape += '<div class="cart__item__content__settings__quantity">'

    listeCanape += '<p>Qté : </p>';
    listeCanape += '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="';
    listeCanape += canape.quantite;
    listeCanape += '">'
    listeCanape += '</div>';
    listeCanape += '<div class="cart__item__content__settings__delete">';
    listeCanape += '<p class="deleteItem">Supprimer</p>';
    listeCanape += '</div>';
    listeCanape += '</div>';
    listeCanape += '</div>';
    listeCanape += '</article>';
    
  }

  // Injection du nouveau code html dans le DOM
  document.querySelector('#cart__items').innerHTML = listeCanape;
  //}

  // Supprimer un article du panier avec le bouton "Supprimer"
  let plusieursCanapes = [];

  let supprimer = document.querySelectorAll(".deleteItem");
  supprimer.forEach((supprim) => 
  {
    supprim.addEventListener("click", () => 
    {
      var idSupprim = supprim.closest("article");
      let nombreTypeCanapes = ajoutCanape.length;

      if (nombreTypeCanapes == 1) {
        return (localStorage.removeItem("canapes")),
        location.reload()
      } 
      else {plusieursCanapes = ajoutCanape.filter((cana) => 
        {
          if (idSupprim.dataset.id != cana._id || idSupprim.dataset.color != cana.couleur) {
            return true
          }
        });
      localStorage.setItem("canapes", JSON.stringify(plusieursCanapes));
      location.reload();
      }
    });
  });

  // Supprimer un article du panier en mettant la quantité à zéro ou modifier la quantité tapant une quantité différente
  let supprimerZero = document.querySelectorAll(".itemQuantity");
  supprimerZero.forEach((supprimZero) => 
  {
    supprimZero.addEventListener("change", () => 
    {
      var idSupprim = supprimZero.closest("article");
      let nombreTypeCanapes = ajoutCanape.length;

      if (supprimZero.value ==0 && nombreTypeCanapes == 1) {
        return (localStorage.removeItem("canapes")),
        location.reload()
      }
      else if (supprimZero.value == 0 && nombreTypeCanapes > 1) {
        plusieursCanapes = ajoutCanape.filter((cana) => 
        {
          if (idSupprim.dataset.id != cana._id || idSupprim.dataset.color != cana.couleur) {
            return true
          }
        });   
      localStorage.setItem("canapes", JSON.stringify(plusieursCanapes));
      location.reload();
      }
      else if (supprimZero.value > 0) {
        for (i = 0; i < ajoutCanape.length; i++) {
          if (idSupprim.dataset.id == ajoutCanape[i]._id && idSupprim.dataset.color == ajoutCanape[i].couleur) {
          ajoutCanape[i].quantite = parseInt(supprimZero.value);

            if(ajoutCanape[i].quantite <= 0 || ajoutCanape[i].quantite >= 101) {
              alert("Veuillez entrer une valeur minimum 1 et maximum 100");
              return false;
            }
          localStorage.setItem("canapes", JSON.stringify(ajoutCanape));
          location.reload();
          }
        }
      }
    });
  });

  // Calcul de quantité totale d'articles présents dans le panier
  let totalArticles = [];

  for (i = 0; i < ajoutCanape.length; i++) {
    let totalCanapes = ajoutCanape[i].quantite;
    totalArticles.push(totalCanapes);
  } 
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalCanap = totalArticles.reduce(reducer);

    // Injection du nouveau code html "quantité totale d'articles" dans le DOM
    document.querySelector('#totalQuantity').innerHTML = totalCanap;
  

  // Calcul du prix total das articles présents dans le panier
  let totalPrixArticles = [];

  for (i = 0; i < ajoutCanape.length; i++) {
    let totalPrixCanapes = ajoutCanape[i].quantite * ajoutCanape[i].prix;
    totalPrixArticles.push(totalPrixCanapes);
  } 
    const reducers = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrixCanap = totalPrixArticles.reduce(reducers);

    // Injection du nouveau code html "prix total" dans le DOM
    document.querySelector('#totalPrice').innerHTML = totalPrixCanap;
}