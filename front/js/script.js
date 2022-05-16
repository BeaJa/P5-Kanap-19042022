const itemsElt = document.getElementById("items");
// console.log(itemsElt);

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
            <a href="">
                <article>
                    <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>`;
    });
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

/* <a href="./product.html?id=42">
  <article>
    <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
    <h3 class="productName">Kanap name1</h3>
    <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
  </article>
</a> -->*/
