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

  // Calcul de la quantité totale d'articles présents dans le panier
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





  // Création d'un formulaire type
  class FormulaireType {
    constructor(input) {
      this.firstName = document.querySelector('#firstName').value;
      this.lastName = document.querySelector('#lastName').value;
      this.address = document.querySelector('#address').value;
      this.city = document.querySelector('#city').value;
      this.email = document.querySelector('#email').value;
    }
  }

  const formulaire = new FormulaireType("coordonnees");

  // contrôle des valeurs saisies dans les champs prénom, nom, adresse, ville et email via regex
  function controleFormulaire() {
    document.getElementById('firstName').onchange = function () {
      const firstName = document.getElementById('firstName').value;
      if (/^[a-zA-Z\-]+$/.test(firstName)) {
        formulaire.firstName = firstName;
        localStorage.setItem("contact", JSON.stringify(formulaire));
        document.querySelector("#firstNameErrorMsg").innerHTML = "";
        return true;
      } else {
        document.getElementById('firstName').value = "";
        document.querySelector("#firstNameErrorMsg").innerHTML = "Veuillez renseigner un prénom valide.";
      }
    }

    document.getElementById('lastName').onchange = function () {
      const lastName = document.getElementById('lastName').value;
        if (/^[a-zA-Z\-]+$/.test(lastName)) {
          formulaire.lastName = lastName;
          localStorage.setItem("contact", JSON.stringify(formulaire));
          document.querySelector("#lastNameErrorMsg").innerHTML = "";
          return true;
      } else {
        document.getElementById('lastName').value = "";
        document.querySelector("#lastNameErrorMsg").innerHTML = "Veuillez renseigner un nom valide.";
      }
    }    

    document.getElementById('city').onchange = function () {
      const city = document.getElementById('city').value;
        if (/^[a-zA-Z'\-]+$/.test(city)) {
          formulaire.city = city;
          localStorage.setItem("contact", JSON.stringify(formulaire));
          document.querySelector("#cityErrorMsg").innerHTML = "";
          return true;
      } else {
        document.getElementById('city').value = "";
        document.querySelector("#cityErrorMsg").innerHTML = "Veuillez renseigner une ville valide.";
      }
    }

    document.getElementById('email').onchange = function () {
      const email = document.getElementById('email').value;
        if (/^[\w\.]+@([\w]+\.)+[\w]{2,4}$/.test(email)) {
          formulaire.email = email;
          localStorage.setItem("contact", JSON.stringify(formulaire));
          document.querySelector("#emailErrorMsg").innerHTML = "";
          return true;
      } else {
        document.getElementById('email').value = "";
        document.querySelector("#emailErrorMsg").innerHTML = "Veuillez renseigner un E-Mail valide.";
      }
    }

    document.getElementById('address').onchange = function () {
      const address = document.getElementById('address').value;    
      formulaire.address = address;
      localStorage.setItem("contact", JSON.stringify(formulaire));
    }
  }

  controleFormulaire()

}