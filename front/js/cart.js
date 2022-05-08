// Requète de l'API
fetch('http://localhost:3000/api/products')
  .then(function(reponse) {
    return reponse.json();
  })
  // Création de la fonction qui génère le résultat de la requète API au format json, de la récupération de l'ID dans l'url ainsi que du code html pour afficher les détails du canapé, sélectionner une couleur et une quantité
  .then(function(donnees) {

    if (localStorage.getItem("canapes") != null) {
      // Récupération du tableau créé dans product.html
      let ajoutCanape = JSON.parse(localStorage.getItem("canapes"));

      // Création du code html sous l'ID items pour afficher les canapés
      let listeCanape = '';
      let canape = '';
      let prixTotal = [];

      for (canape of ajoutCanape) {

        listeCanape += `<article class="cart__item" data-id="${canape._id}" data-color="${canape.couleur}">`;
        listeCanape += '<div class="cart__item__img">';
        listeCanape += `<img src="${canape.image}" alt="${canape.altImage}">`;
        listeCanape += '<div class="cart__item__content"></div>';
        listeCanape += '<div class="cart__item__content__description">'
        listeCanape += `<h2>${canape.titre}</h2>`;
        listeCanape += `<p>${canape.couleur}</p>`;

        // Création du prix du canapé
        let produitPrixQuantite = '';
        for (i = 0; i < donnees.length; i++) {
          if (donnees[i]._id == canape._id) {
            prixCana = donnees[i].price;
            listeCanape += `<p>${prixCana},00 €</p>`;
            // Calcul du prix total
            produitPrixQuantite = parseInt(donnees[i].price) * parseInt(canape.quantite);
            prixTotal.push(produitPrixQuantite);
          } 
        }
        const reducers = (accumulator, currentValue) => accumulator + currentValue;
        const totalPrix = prixTotal.reduce(reducers);
        document.querySelector('#totalPrice').innerHTML = totalPrix;

        listeCanape += '</div>';
        listeCanape += '<div class="cart__item__content__settings"></div>'
        listeCanape += '<div class="cart__item__content__settings__quantity">'
        listeCanape += '<p>Qté : </p>';
        listeCanape += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canape.quantite}">`;
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

      // Création d'un tableau products contenant les id des produits dans le panier pour effectuer la requête POST sur l’API
      let products = [];
      for (i = 0; i < ajoutCanape.length; i++) {
        _id = ajoutCanape[i]._id;
        products.push(_id);
      } 
      localStorage.setItem("products", JSON.stringify(products));

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

      // Création d'un formulaire
      const contact = {
        firstName : document.querySelector('#firstName').value,
        lastName : document.querySelector('#lastName').value,
        address : document.querySelector('#address').value,
        city : document.querySelector('#city').value,
        email : document.querySelector('#email').value
      };

      // contrôle des valeurs saisies dans les champs prénom, nom, adresse, ville et email via regex
      function controleFormulaire() {
        document.getElementById('firstName').onchange = function () {
          const firstName = document.getElementById('firstName').value;
          if (/^[a-zA-Z\-]+$/.test(firstName)) {
            contact.firstName = firstName;
            localStorage.setItem("contact", JSON.stringify(contact));
            document.querySelector("#firstNameErrorMsg").innerHTML = "";
            envoi();
            return true;
          } else {
            document.getElementById('firstName').value = "";
            document.querySelector("#firstNameErrorMsg").innerHTML = "Veuillez renseigner un prénom valide.";
          }
        }

        document.getElementById('lastName').onchange = function () {
          const lastName = document.getElementById('lastName').value;
            if (/^[a-zA-Z\-]+$/.test(lastName)) {
              contact.lastName = lastName;
              localStorage.setItem("contact", JSON.stringify(contact));
              document.querySelector("#lastNameErrorMsg").innerHTML = "";
              envoi();
              return true;
          } else {
            document.getElementById('lastName').value = "";
            document.querySelector("#lastNameErrorMsg").innerHTML = "Veuillez renseigner un nom valide.";
          }
        }    

        document.getElementById('city').onchange = function () {
          const city = document.getElementById('city').value;
            if (/^[a-zA-Z'\-]+$/.test(city)) {
              contact.city = city;
              localStorage.setItem("contact", JSON.stringify(contact));
              document.querySelector("#cityErrorMsg").innerHTML = "";
              envoi();
              return true;
          } else {
            document.getElementById('city').value = "";
            document.querySelector("#cityErrorMsg").innerHTML = "Veuillez renseigner une ville valide.";
          }
        }

        document.getElementById('email').onchange = function () {
          const email = document.getElementById('email').value;
            if (/^[\w\.]+@([\w]+\.)+[\w]{2,4}$/.test(email)) {
              contact.email = email;
              localStorage.setItem("contact", JSON.stringify(contact));
              document.querySelector("#emailErrorMsg").innerHTML = "";
              envoi();
              return true;
          } else {
            document.getElementById('email').value = "";
            document.querySelector("#emailErrorMsg").innerHTML = "Veuillez renseigner un E-Mail valide.";
          }
        }

        document.getElementById('address').onchange = function () {
          const address = document.getElementById('address').value;    
          contact.address = address;
          localStorage.setItem("contact", JSON.stringify(contact));
          envoi();
        }

        const aEnvoyer = {
          contact,
          products
        }

        function envoi() {
          if (contact.firstName != "" && contact.lastName != "" && contact.address != "" && contact.city != "" && contact.email != "" ) { 
            const promesse = fetch("http://localhost:3000/api/products/order", {
              method: "POST",
              body: JSON.stringify(aEnvoyer),
              headers: {
                "Content-Type": "application/json",
              },
            });
            promesse.then(async (response) => {
              try {
                const contenu = response.json();
                const contenuId = Promise.resolve(contenu);
                  contenuId.then((value) => {
                  let orderIdCommande = value.orderId;

                  document.getElementById('order').onclick = function (e) {
                    e.preventDefault()
                    window.location = `${window.location.origin}/front/html/confirmation.html?orderId=${orderIdCommande}`
                  }
                });
              } catch (e) {
              }
            })
          }
        }
      }

      controleFormulaire()

    }
  })
  .catch(err => console.log("Erreur : " + err));