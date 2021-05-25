function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector("#cartQuantity").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector("#cartQuantity").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector("#cartQuantity").textContent = 1;
  }
  setItem(product);
}

function setItem(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      product.inCart = 0;
      cartItems[product.tag] = product;
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  cartCost = Number(cartCost);
  if (cartCost != null) {
    cartCost = Number(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector("#productContainer");
  let cartCost = localStorage.getItem("totalCost");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      if (item) {
        productContainer.innerHTML += `
          <tr>
              <td>${item.name ? item.name : ""}</td>
              <td>$${item.price}</td>
              <td><button type="button" onclick='rmvFromCart("${
                item.tag
              }")' class="btn btn-sm btn-secondary"><i  class="fa fa-arrow-circle-o-down" data-unicode="f01a"></i></button> ${
          item.inCart
        } <button type="button" onclick='addItemToCart("${
          item.tag
        }")' class="btn btn-sm btn-secondary"><i class="fa fa-arrow-circle-o-up" data-unicode="f01b"></i></button></td>
              <td>${item.inCart * item.price}</td>
          </tr>
          `;
      }
    });
    productContainer.innerHTML += `
          <td class="basketTotalContainer">
              <h4 class="basketTotalTitle">
                  Basket Total
              </h4>
              <h4 class="basketTotal">
                  $${Number(cartCost).toFixed(2)}
              </h4>    
          </td>
          `;
  }
}

function rmvFromCart(tag) {
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartCost = localStorage.getItem("totalCost");
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  productNumbers = parseInt(productNumbers);
  if (productNumbers > 0) {
    localStorage.setItem("cartNumbers", productNumbers - 1);
    document.querySelector("#cartQuantity").textContent = productNumbers - 1;
    for (key of Object.keys(cartItems)) {
      if (key == tag) {
        if (cartCost) {
          localStorage.setItem(
            "totalCost",
            Number(cartCost) - cartItems[key].price
          );
        }
        if (cartItems[key].inCart > 1) {
          cartItems[key].inCart -= 1;
        } else {
          delete cartItems[key];
        }
        break;
      }
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  displayCart();
}

function addItemToCart(tags) {
  let productNumbers = localStorage.getItem("cartNumbers");
  let cartCost = localStorage.getItem("totalCost");
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  productNumbers = parseInt(productNumbers);
  if (productNumbers > 0) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector("#cartQuantity").textContent = productNumbers + 1;
  }
  for (key of Object.keys(cartItems)) {
    if (key == tags) {
      cartItems[key].inCart += 1;
    }
  }
  if (cartCost) {
    localStorage.setItem("totalCost", Number(cartCost) + cartItems[key].price);
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  displayCart();
}

onLoadCartNumbers();
displayCart();
