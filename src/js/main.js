'use strict'



/*    MOBILE NAV LOGIC   */
const mobileMenuBtn = document.getElementById("mobile-menu");
mobileMenuBtn.addEventListener("click", openNav);
function openNav() {
    document.getElementById("side-mobile-nav").style.width = "100%";
    document.getElementById("mobile-nav-content").style.width = "250px";
}

function closeNav() {
    document.getElementById("side-mobile-nav").style.width = "0";
    document.getElementById("mobile-nav-content").style.width = "0";
}

/*     OPEN CART LOCIG    */
const cartIcon = document.getElementById("cart-icon");
const cart =  document.getElementById("cart");
let cartOpen = false;
cartIcon.addEventListener("click", showHideCart);

// this needs to be set, otherwise the cart doesn't show up on first click (issue?)
cart.style.display = "none";

function showHideCart() {
    cartOpen = !cartOpen;
    if (cart.style.display === "none") {
        cart.style.display = "grid";
    } else {
        cart.style.display = "none"
    }
}

document.querySelectorAll("main, .navigation").forEach(element => element.addEventListener("click", e => {
        if( cartOpen) {
            showHideCart();
        }
    })
)


/*    THUMBNAILS LOGIC    */
const mainPicture = document.getElementById("product-main-picture");
const images = new Map;
images.set("0", "src/images/image-product-1.jpg");
images.set("1","src/images/image-product-2.jpg");
images.set("2", "src/images/image-product-3.jpg");
images.set("3", "src/images/image-product-4.jpg");

const thumbnails = document.querySelectorAll(".thumb");
thumbnails.forEach(element => element.addEventListener("click", showPicture));

function showPicture(thumbnail) {
    const picture = thumbnail.target.parentElement.classList.contains("lightbox-thumbnail") ? lightBoxMainPicture : mainPicture;
    picture.style.backgroundImage = 'url("' + images.get(thumbnail.target.dataset.value) +'")';
    thumbnails.forEach(element => {
        element.classList.remove("active-img");
    });
    thumbnail.target.classList.add("active-img");
}

/*    MOBILE PICTURE SLIDE LOGIC    */
const lightBoxMainPicture = document.querySelector(".lightbox-main-picture");
const prevImg = document.querySelectorAll(".previous-arrow");
const nextImg = document.querySelectorAll(".next-arrow");

prevImg.forEach(prev => prev.addEventListener("click", showMobilePicture));
nextImg.forEach(next => next.addEventListener("click", showMobilePicture));


let imageId = 0;
function showMobilePicture(direction) {
    const picture = window.innerWidth > 768 ? lightBoxMainPicture : mainPicture;

    if (direction.target.parentElement.classList.contains("next-arrow")) {
        imageId = (imageId + images.size + 1) % images.size;
    } else  {
        imageId = (imageId + images.size - 1) % images.size;
    }
    picture.style.backgroundImage = 'url("' + images.get(imageId.toString()) +'")';

}

/*     LIGHTBOX LOGIC*/

mainPicture.addEventListener("click", showLightbox);
const lightBox = document.querySelector(".lightbox-container");
const closeLightboxBtn = document.querySelector(".lightbox-container > .closebtn");

function showLightbox() {
    if (window.innerWidth > 768) {
        if (lightBox.classList.contains("hide")) {
            lightBox.classList.remove("hide");
        } else {
            lightBox.classList.add("hide");
        }
    }
}

closeLightboxBtn.addEventListener("click", closeLightbox);

function closeLightbox() {
    lightBox.classList.add("hide");
}


/*   QUANTITY LOGIC    */
const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");
const quantityValue = document.querySelector(".quantity > p");
const cartQuantity = document.getElementById("cart-quantity");


function hideShowCartQunatity() {
    if (parseInt(cartQuantity.innerHTML) === 0) {
        cartQuantity.style.display = "none";
    } else {
        cartQuantity.style.display = "flex";
    }
}
hideShowCartQunatity();


decrease.addEventListener("click", changeQuantity);
increase.addEventListener("click", changeQuantity);

function changeQuantity(e) {
    let value = parseInt(quantityValue.innerHTML);
    if (e.target.id === "decrease" && value > 0) {
        quantityValue.parentElement.style.outline = "none";
        value -= 1;
    } else if (e.target.id === "increase") {
        quantityValue.parentElement.style.outline = "none";
        value += 1;
    } else {
        quantityValue.parentElement.style.outline = "1px solid red";
    }
    quantityValue.innerHTML = value.toString();
}

/*    PRODUCT LOGIC     */

const product = {
    brand: "sneaker company",
    name: "Fall Limited Edition Sneakers",
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a\n" +
        "          durable rubber outer sole, they’ll withstand everything the weather can offer.",
    originalPrice: 250.00,
    actualPrice: 125.00,
    priceOff: 50,
    thumbnail: "src/images/image-product-1-thumbnail.jpg"
}

const addToCartBtn = document.querySelector(".add-to-cart-btn");
const cartItem = document.querySelector(".cart-item");
const cartItemThumb = document.querySelector(".cart-item-thumb");
const cartItemTitle = document.querySelector(".cart-item-content-titel");
const cartItemDelete = document.querySelector(".cart-item-delete");
// prevent User from clicking addToCartButton twice and only refresh the product (there could also be a logic to increase the product in the cart)
let addToCartButtonClicked = false;

addToCartBtn.addEventListener("click", addToCart);

function addToCart() {
    if (quantityValue.innerHTML === "0") {
        quantityValue.parentElement.style.outline = "1px solid red"
    } else {
        addToCartButtonClicked = true;
        const quantity = parseInt(quantityValue.innerHTML);
        document.querySelector(".checkout-button").classList.remove("hide");
        document.querySelector(".empty-cart").classList.add("hide");
        cartItem.classList.add("visible");

        cartItemThumb.style.background = 'url("' +  product.thumbnail + '") no-repeat center';
        cartItemThumb.style.backgroundSize = "contain"
        cartItemTitle.innerHTML = product.name;
        document.querySelector(".cart-item-content-pricing span:first-of-type").innerHTML = "$" + product.actualPrice + ".00 x " + quantityValue.innerHTML;
        document.querySelector(".cart-item-content-pricing span:last-of-type").innerHTML = "$" +  (product.actualPrice * quantity).toString() + ".00";
        cartQuantity.innerHTML = quantityValue.innerHTML;
        hideShowCartQunatity();
        quantityValue.innerHTML = "0";
    }
}

cartItemDelete.addEventListener("click", deleteItem);

function deleteItem() {
    addToCartButtonClicked = false;
    document.querySelector(".checkout-button").classList.add("hide");
    document.querySelector(".empty-cart").classList.remove("hide");
    cartItem.classList.remove("visible");
    cartQuantity.innerHTML = "0";
    hideShowCartQunatity();
}


