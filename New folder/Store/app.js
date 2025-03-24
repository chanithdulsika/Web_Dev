// Selecting elements from the DOM
let openShopping = document.querySelector('.shopping'); // Selecting the shopping cart opener button
let closeShopping = document.querySelector('.closeShopping'); // Selecting the shopping cart closer button
let list = document.querySelector('.list'); // Selecting the list to display available products
let listCart = document.querySelector('.listCart'); // Selecting the list to display items in the shopping cart
let body = document.querySelector('body'); // Selecting the body element
let total = document.querySelector('.total'); // Selecting the element to display total price
let quantity = document.querySelector('.quantity'); // Selecting the element to display quantity of items in the cart

// Adding event listeners to open and close the shopping cart
openShopping.addEventListener('click', () => {
    body.classList.add('active'); // Adding 'active' class to the body to show the shopping cart
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active'); // Removing 'active' class from the body to hide the shopping cart
});

// Array of products available for purchase
let products = [
    {id: 1, name: 'Learn English', image: 'english.jpg', price: 10},
    {id: 2, name: 'English Grammer', image: 'grammer.jpg', price: 20},
    {id: 4, name: 'World History', image: 'history.jpg', price:20 },
    {id: 5, name: 'Learning Mathematics', image: 'maths 1.jpeg', price:25 },
    {id: 6, name: 'Good Health', image: 'health.jpg', price:15 },
    {id: 7, name: 'The Biology Book', image: 'bio.jpg', price:25 },
    {id: 8, name: 'Square-Rule Books', image: 'promate square rule.jpg', price:5 },
    {id: 9, name: 'Single-Rule Books', image: 'promate.jpg', price:5 },
    {id: 10, name: 'Pens', image: 'pens.jpg', price:1 },
    {id: 11, name: 'Mathematical Box', image: 'mathematical.jpg', price:5 },
    {id: 12, name: 'A4 Bundle Pack', image: 'a4.jpg', price:15 },
    {id: 13, name: 'School Bags', image: 'bags.jpg', price:25 },
    {id: 14, name: 'Combo Pack 1', image: 'combo1.jpg', price:30 },
    {id: 15, name: 'Combo Pack 2', image: 'combo2.jpg', price:35 },
];

// Array to store items in the shopping cart
let listCarts  = [];

// Function to initialize the application by displaying available products
function initApp(){
    products.forEach((value, key) =>{
        // Creating a new div element for each product
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        // Populating the new div with product information and an "Add to Cart" button
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>`;
        list.appendChild(newDiv); // Appending the new div to the list of available products
    })
}
initApp(); // Calling the function to initialize the application

// Function to add a product to the shopping cart
function addToCart(key){
    if(listCarts[key] == null){
        // If the product is not already in the cart, add it with a quantity of 1
        listCarts[key] = JSON.parse(JSON.stringify(products[key]));
        listCarts[key].quantity = 1;
    }
    reloadCart(); // Reload the shopping cart display
}

// Function to reload the shopping cart display
function reloadCart(){
    listCart.innerHTML = ''; // Clearing the list of items in the shopping cart
    let count = 0;
    let totalPrice = 0;
    // Iterating over items in the shopping cart
    listCarts.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            // Creating a new list item for each item in the shopping cart
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCart.appendChild(newDiv); // Appending the new list item to the shopping cart list
        }
    })
    total.innerText = `$${totalPrice.toLocaleString()}`; // Displaying the total price
    quantity.innerText = count; // Displaying the total quantity of items in the cart
}

// Function to change the quantity of an item in the shopping cart
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCarts[key]; // If quantity is 0, remove the item from the shopping cart
    }else{
        // Otherwise, update the quantity and price of the item
        listCarts[key].quantity = quantity;
        listCarts[key].price = quantity * products[key].price;
    }
    reloadCart(); // Reload the shopping cart display
}

// Selecting the proceed button
let proceedButton = document.querySelector('.proceed');

// Add event listener to the proceed button
proceedButton.addEventListener('click', () => {
    // Check if the cart is empty
    if (Object.keys(listCarts).length === 0) {
        // If the cart is empty, display an alert
        alert('Your cart is empty. Please add items before proceeding.');
    } else {
        // If the cart is not empty, proceed to another web page
        window.location.href = 'checkout/checkoutpg.html'; // Replace 'another_page.html' with the URL of the page you want to navigate to
    }
});
