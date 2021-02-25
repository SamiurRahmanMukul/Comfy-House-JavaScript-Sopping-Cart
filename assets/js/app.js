/**
 * =====> TODO: ABOUT AUTHOR <=====
 *
 * @author : Md. Samiur Rahman (Mukul)
 * @education : B.Sc. Hons In CSE (SIBACS)
 * @profession : PROGRAMMER & SOFTWARE DEVELOPER
 * @email : sr.mukul9090@gmail.com
 *
 *      </> Happy Coding ☺ </>
 */

// define variable & select elements
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");

const productsDOM = document.querySelector(".products-center");

// let's cart
let cart = [];

// TODO: getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("assets/json/products.json");
      let data = await result.json();

      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;

        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// TODO: display products
class UI {
  displayProducts(products) {
    // console.log(products);

    let result = "";
    products.forEach((product) => {
      result += `
      <!-- single product start -->
        <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
            />

            <button class="bag-btn" data-id=${product.id}>
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              add to bag
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>Price: $ ${product.price}</h4>
        </article>
        <!-- single product end -->`;
    });
    try {
      // console.log(result);
      productsDOM.innerHTML = result;
    } catch (e) {
      console.log("Error = " + e);
    }
  }
}

// TODO: local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

// add event listener
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get all products
  products.getProducts().then((products) => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  });
});
