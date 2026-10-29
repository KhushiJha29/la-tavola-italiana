console.log("Welcome to La Tavola Italiana!");
const menuSection = document.querySelector(".menu");
const exploreButton = document.querySelector(".explore-btn");
document.querySelector(".explore-btn").onclick = function(){
    menuSection.scrollIntoView({behavior: "smooth"});
}
const deliverySection = document.querySelector(".delivery");
const orderButton = document.querySelector(".order-btn");
document.querySelector(".order-btn").onclick = function(){
    deliverySection.scrollIntoView({behavior: "smooth"});
}
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".navbar ul");

menuToggle.onclick = function() {
    navLinks.classList.toggle("active");

    const isExpanded = navLinks.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isExpanded);
};
const navItems = document.querySelectorAll(".navbar ul a");

navItems.forEach(function(link) {
    link.onclick = function() {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    };
});
const allNavLinks = document.querySelectorAll(".navbar ul a");

allNavLinks.forEach(function(link) {
    link.onclick = function() {
        allNavLinks.forEach(function(item) {
            item.classList.remove("active-link");
        });

        link.classList.add("active-link");
    };
});
const toggleMenuBtn = document.querySelector(".toggle-menu-btn");
const menuContent = document.querySelector(".menu-content");
toggleMenuBtn.onclick = function() {
    menuContent.hidden = !menuContent.hidden;

    if (menuContent.hidden) {
        toggleMenuBtn.textContent = "Show Menu";
    } else {
        toggleMenuBtn.textContent = "Hide Menu";
    }
};
const filterButtons = document.querySelectorAll(".filter-btn");
const allDishes = document.querySelectorAll(".pasta, .pizza, .drinks");

filterButtons.forEach(function(button) {
    button.onclick = function() {
        const category = button.dataset.category;

        allDishes.forEach(function(dish) {
            dish.hidden = category !== "all" &&
                          !dish.classList.contains(category);
        });
    };
});
console.log(filterButtons);
console.log(allDishes);

let cart = [];

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

addToCartButtons.forEach(function(button) {
    button.onclick = function() {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(function(item) {
            return item.name === name;
        });

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        displayCart();
    };
});

function displayCart() {
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(function(item) {
        const itemElement = document.createElement("div");

        const name = document.createElement("p");
        name.textContent = item.name;

        const details = document.createElement("p");
        details.textContent = "₹" + item.price + " × " + item.quantity +" = ₹" + (item.price * item.quantity);

        const decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "−";

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.onclick = function() {
            cart = cart.filter(function(cartItem) {
                return cartItem !== item;
            });

            displayCart();
        };

        decreaseBtn.onclick = function() {
            item.quantity--;

            if (item.quantity === 0) {
                cart = cart.filter(function(cartItem) {
                    return cartItem !== item;
                });
            }

            displayCart();
        };

        increaseBtn.onclick = function() {
            item.quantity++;
            displayCart();
        };

        itemElement.appendChild(name);
        itemElement.appendChild(details);
        itemElement.appendChild(decreaseBtn);
        itemElement.appendChild(quantity);
        itemElement.appendChild(increaseBtn);
        itemElement.appendChild(removeBtn);

        cartItems.appendChild(itemElement);

        total += item.price * item.quantity;
        count += item.quantity;
    });

    cartCount.textContent = count;
    cartTotal.textContent = total;
}

const proceedBtn = document.querySelector(".proceed-btn");

proceedBtn.onclick = function() {
    deliverySection.scrollIntoView({
        behavior: "smooth"
    });
};

const deliveryForm = document.querySelector(".delivery-form");
const confirmation =
    document.querySelector(".order-confirmation");

const confirmationDetails =
    document.querySelector(".confirmation-details");

const backToMenuBtn =
    document.querySelector(".back-to-menu-btn");

deliveryForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty! Please add some dishes first.");
        return;
    }

    const customerName = document.getElementById("customer-name").value.trim();
    const customerPhone = document.getElementById("customer-phone").value.trim();
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(customerPhone.trim())) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }
    const customerAddress = document.getElementById("customer-address").value.trim();

    const total = cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    confirmationDetails.innerHTML = "";

    const totalElement = document.createElement("p");
    totalElement.textContent = "Order Total: ₹" + total;
    confirmationDetails.appendChild(totalElement);

    cart.forEach(function (item) {
        const dishElement = document.createElement("p");

        dishElement.textContent =
            item.name + " × " + item.quantity +
            " — ₹" + (item.price * item.quantity);

        confirmationDetails.appendChild(dishElement);
    });

    const phoneElement = document.createElement("p");
    phoneElement.textContent = "Phone: " + customerPhone;
    confirmationDetails.appendChild(phoneElement);

    const addressElement = document.createElement("p");
    addressElement.textContent = "Delivery Address: " + customerAddress;
    confirmationDetails.appendChild(addressElement);

    const confirmationHeading =
        confirmation.querySelector("h2");

    confirmationHeading.textContent =
        "Thank You, " + customerName + "!";

        deliveryForm.hidden = true;
        confirmation.hidden = false;

        confirmation.scrollIntoView({ behavior: "smooth" });
        cart = [];
        displayCart();
        deliveryForm.reset();
    });

    backToMenuBtn.addEventListener("click", function () {
        confirmation.hidden = true;
        deliveryForm.hidden = false;

        menuSection.scrollIntoView({ behavior: "smooth" });
    });