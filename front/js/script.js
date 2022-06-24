// Variable de pointage de l'id du Html
const itemsElt = document.getElementById("items");
// console.log(itemsElt);

// Récupération de l'api pour l'affichage des données des produits par Fetch et la méthode forEach

function getApi() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (products) {
      // console.log(products);
      products.forEach((product) => {
        // console.log(product);
        itemsElt.innerHTML += `
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}"  alt="${product.altTxt}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </article>
            </a>`;
      });
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}
getApi();
