// recuperation de l'id des produits
const getProductId = () => {
  return new URL(document.location).searchParams.get("id");
};
let idProduct = getProductId();
// console.log(idProduct);

// Variables pour cibler les id afin d'implémener le html

const titKanap = document.getElementById("title");
// console.log(titKanap);
const elementImg = document.querySelector(".item__img");
// console.log(elementImg);
const prix = document.getElementById("price");
// console.log(prix);
const descript = document.getElementById("description");
// console.log(descript);
const addCart = document.getElementById("addToCart");
// console.log(addCart);
const selectOptColor = document.getElementById("colors");
// console.log(selectOptColor);
const quantitySelect = document.getElementById("quantity");
// console.log(quantitySelect);

// Recuperation de l'api et affichage par l'id des données du produit séléctionné.

fetch("http://localhost:3000/api/products/" + idProduct)
  .then((response) => {
    return response.json();
  })
  .then((product) => {
    displayArticle(product);
    addToCart(product);
  });

// Fonction pour l'affichage des données du produit sélectionné

function displayArticle(product) {
  document.querySelector("head > title").textContent = product.name;

  titKanap.textContent = `${product.name}`;

  elementImg.innerHTML = `
        <img src=${product.imageUrl} alt=${product.altTxt} "photo"/>`;
  prix.textContent = `${product.price}`;
  descript.textContent = `${product.description}`;

  //boucle pour afficher toutes les options couleur du produit

  product.colors.forEach((color) => {
    selectOptColor.innerHTML += `<option value="${color}">${color}</option>`;
  });
}

// Fonction pour l'ajout du produit dans le panier avec l'event
// et gestion du panier

function addToCart(product) {
  addCart.addEventListener("click", (event) => {
    event.preventDefault();

    // conditions si séléction couleur et quantité du produit

    if (selectOptColor.value == false) {
      confirm("Veuillez séléctionner une couleur !");
    } else if (quantitySelect.value == 0) {
      confirm("Veuillez séléctionner le nombre d'article souhaité.");
    } else {
      alert("Votre article a bien été ajouté au panier !");
    }

    // récupérer les données des produits à ajouter au panier
    let productCartObj = {
      _id: idProduct,
      color: selectOptColor.value,
      quantity: parseInt(quantitySelect.value, 10),
    };
    console.log(productCartObj);

    // Gestion du panier - LocalStorage

    // Récupération des données du localStorage
    let cartExist = JSON.parse(localStorage.getItem("cartLS"));
    // console.log(cartExist);

    // Si le localStorage existe

    if (cartExist) {
      // comparaison avec la méthode find() si l'id et la couleur d'un article est présent.
      let item = cartExist.find(
        (item) =>
          item._id === productCartObj._id && item.color === productCartObj.color
      );
      //   console.log(item);

      // Si oui, on incrémente la nouvelle quantity et la mise à jour du prix total de l'article

      if (item) {
        item.quantity = item.quantity + productCartObj.quantity;

        localStorage.setItem("cartLS", JSON.stringify(cartExist));
        alert("Quantité ajoutée");
        return;

        // Si non, alors on push le nouvel article séléctionné
      }
      cartExist.push(productCartObj);
      localStorage.setItem("cartLS", JSON.stringify(cartExist));
      alert("Le produit est ajouté au panier.");
    } else {
      //Sinon, création d'un tableau où l'on push l'objet produit
      let newcart = [];
      newcart.push(productCartObj);
      localStorage.setItem("cartLS", JSON.stringify(newcart));
      // console.table(newcart);
    }
  });
}
