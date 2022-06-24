// Récupération du contenu du locat storage
const orderId = localStorage.getItem("order");
console.log(orderId);

// Implémentation du numéro de commane dans le html
const orderIdElt = document.getElementById("orderId");
orderIdElt.innerHTML = orderId;

// Vidage du local storage
localStorage.clear();
