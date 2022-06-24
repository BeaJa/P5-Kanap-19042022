// récuperation des données API
const urlApi = "http://localhost:3000/api/products/";
// console.log(urlApi);

// récupération du panier converti
let cart = JSON.parse(localStorage.getItem("cartLS"));
// console.log(cart);
// let form = document.getElementsByClassName("cart__order__form");
// console.log(form);

// Variable tableau pour récupération des promesses
const promises = [];
// console.log(promises);

cart.forEach((product) => {
  promises.push(
    fetch(urlApi + product._id)
      .then((res) => res.json())
      .then((product) => product)
  );
});

Promise.all(promises).then((products) => {
  console.table(products);
  displayProducts(products);
  getTotal(products);
  modifQuantity(products);
  deleteItem(products);
  //   sendToServer(products);
});

let idProduct = [];
for (let i = 0; i < cart.length; i++) {
  idProduct.push(cart[i]._id);
}
console.log(idProduct);

function displayProducts(products) {
  let cartItems = document.getElementById("cart__items");
  // console.log(cartItems);

  // création de l'affichage dynamique
  // si le panier est rempli
  if (cart.length !== 0) {
    products.forEach((product, index) => {
      let totalPriceItem = (product.price *= +cart[index].quantity);
      // console.log(index);

      cartItems.innerHTML += `
          <article
                  class="cart__item"
                  data-id="${cart[index]._id}"
                  data-color="${cart[index].color}">
                  <div class="cart__item__img">
                    <img
                      src="${product.imageUrl}"
                      alt="Photographie d'un canapé"/>
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${product.name}</h2>
                      <p>${cart[index].color}</p>
                      <p class="price">${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input
                          type="number"
                          class="itemQuantity"
                          name="itemQuantity"
                          min="1"
                          max="100"
                          value="${cart[index].quantity}"/>
                      </div>
                      <p class="sousTotal""${totalPriceItem}" </p>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`;
    });
  } else {
    document.querySelector("h1").innerHTML = "Votre panier est vide";
  }
}

// Fonction Total quantity et Total Price

function getTotal(products) {
  let cart = JSON.parse(localStorage.getItem("cartLS"));
  // console.table(cart);

  let totalArticle = 0;
  console.log(totalArticle);
  let totalPrice = 0;
  console.log(products);
  products.forEach((product, index) => {
    totalArticle += parseInt(cart[index].quantity);
    console.log(totalArticle);
    document.getElementById("totalQuantity").innerHTML = totalArticle;

    totalPrice += parseInt(product.price);
    console.log(product.price);

    document.getElementById("totalPrice").innerHTML = totalPrice;
  });
}

// Fonction : modification de quantity avec event

function modifQuantity(products) {
  let cartItem = document.getElementsByClassName("itemQuantity");
  // console.log(cartItem);

  for (let i = 0; i < cartItem.length; i++) {
    cartItem[i].addEventListener("change", (event) => {
      event.preventDefault();

      let inputValue = event.target.valueAsNumber;
      console.log(inputValue);

      let inputId = cart[i]._id;
      // console.log(inputId);

      let inputColor = cart[i].color;
      // console.log(inputColor);

      cart = cart.map((item) => {
        if (item._id === inputId && item.color === inputColor) {
          item.quantity = inputValue;
        }
        return item;
      });

      // MaJ Local Storage
      let newCart = JSON.stringify(cart);
      localStorage.setItem("cartLS", newCart);
      // rafraichi le panier
      location.reload();
    });
  }
}

// Fonction Suppression d'un article

function deleteItem() {
  let deleteBtns = document.getElementsByClassName("deleteItem");
  // console.log(deleteBtns);

  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", (event) => {
      event.preventDefault();

      let deleteId = cart[i]._id;
      // console.log(deleteId);
      let deleteColor = cart[i].colors;
      // console.log(deleteColor);

      cart = cart.filter(
        (elt) => !(elt._id == deleteId && elt.colors == deleteColor)
      );
      // console.log(cart);

      // Maj  du local Storage

      localStorage.setItem("cartLS", JSON.stringify(cart));

      // Rafraichissement du panier
      location.reload();
      alert("Article supprimé du panier.");
    });
  }
}

// Formulaire
//---------recupération des données

let btnValid = document.getElementById("order");
console.log(btnValid);

btnValid.addEventListener("click", (e) => {
  e.preventDefault();

  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  console.log(contact);

  //---RegEx de test du prenom, nom et ville
  const prenomNomVilleRegEx = new RegExp("^[a-zA-Zéèêâ ,.'-]+$");
  console.log(prenomNomVilleRegEx);

  //--- Regex de test de l'adresse
  const addressRegEx = new RegExp(
    "^[0-9]{1,3}[ ,.-]{1}[a-zA-Zàâäéèëïîôöùûüç ,.'-]+$"
  );
  console.log(addressRegEx);

  // //---Regex de controle de l'email
  const emailRegEx = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  // console.log(emailRegEx);

  // Fonction de controle du champ Prénom
  function controlFirstName() {
    let firstName = contact.firstName;
    console.log(firstName);

    //---RegEx de controle du prenom, nom et ville
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

    if (prenomNomVilleRegEx.test(firstName)) {
      firstNameErrorMsg.innerHTML = "";
      return true;
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez saisir votre prénom.";
      return false;
    }
  }

  // Fonction de controle du champ nom
  function controlLastName() {
    let lastName = contact.lastName;
    console.log(lastName);

    //---RegEx de controle du prenom, nom et ville
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

    if (prenomNomVilleRegEx.test(lastName)) {
      lastNameErrorMsg.innerHTML = "";
      return true;
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez saisir votre nom.";
      return false;
    }
  }

  // Fonction de controle du champ Adresse
  function controlAddress() {
    let address = contact.address;
    console.log(address);

    //---RegEx de controle address
    let addressErrorMsg = document.getElementById("addressErrorMsg");

    if (addressRegEx.test(address)) {
      addressErrorMsg.innerHTML = "";
      return true;
    } else {
      addressErrorMsg.innerHTML = "Veuillez saisir votre adresse.";
      return false;
    }
  }

  // Fonction de controle du champ Ville
  function controlCity() {
    let city = contact.city;
    console.log(city);

    //---RegEx de controle ville
    let cityErrorMsg = document.getElementById("cityErrorMsg");

    if (prenomNomVilleRegEx.test(city)) {
      cityErrorMsg.innerHTML = "";
      return true;
    } else {
      cityErrorMsg.innerHTML = "Veuillez saisir votre ville.";
      return false;
    }
  }

  // Fonction de controle du champ email
  function controlEmail() {
    let email = contact.email;
    console.log(email);

    //---RegEx de controle email
    let emailErrorMsg = document.getElementById("emailErrorMsg");

    if (emailRegEx.test(email)) {
      emailErrorMsg.innerHTML = "";
      return true;
    } else {
      emailErrorMsg.innerHTML = "Veuillez saisir votre Email.";
      return false;
    }
  }

  // Controle validité du formulaire avant envoi

  if (
    controlFirstName() &&
    controlLastName() &&
    controlAddress() &&
    controlCity() &&
    controlEmail()
  ) {
    // Enregistrer le formulaire dans le localstorage
    localStorage.setItem("contact", JSON.stringify(contact));
    document.getElementById("order").value = "Formulaire valide";
    sendToServer();
  } else {
    alert("Veuillez remplir le formulaire");
  }

  /* FIN GESTION DU FORMULAIRE */

  /* REQUÊTE DU SERVEUR ET POST DES DONNÉES */
  function sendToServer() {
    const sendToServer = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({ contact, products: idProduct }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // Récupération et stockage de la réponse de l'API (orderId)
      .then((response) => {
        return response.json();
      })
      .then((order) => {
        let orderId = order;
        console.log(orderId);
        localStorage.setItem("order", order.orderId);

        document.location.href = "confirmation.html";
      });
  }
});
