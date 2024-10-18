document.addEventListener('DOMContentLoaded', function () {
    setupAddToCartButtons();
    updateCartCount(getCart()); 
});

// Handle the "Add to Cart" button click
function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const grandgrandParent = this.parentElement.parentElement.parentElement;
            const parent = this.parentElement;
            
            // Change from selecting 'h3' directly to using 'querySelector' for the product name
            const name = grandgrandParent.querySelector('h3').innerText;
            
            // Select the first and second 'p' elements for size and price
            const ounce = parent.querySelector('p:nth-child(1)').innerText;
            const price = parent.querySelector('p:nth-child(2)').innerText;

            const itemName = name + ` (${ounce})`;
            const itemPrice = parseFloat(price.replace('₱', ''));

            const item = {
                name: itemName,
                price: itemPrice
            };

            addToCart(item);
        });
    });
}

function addToCart(item) {
    let quantity = prompt("How many of " + item.name + " would you like to add?", "1");
    
    if (quantity === null) { // If the user cancels the prompt
        return; 
    }

    quantity = parseInt(quantity);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return; 
    }
    
    let cart = getCart();
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    const totalCost = item.price * quantity; // Calculate total cost

    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += totalCost; // Update total price for existing items
    } else {
        cart.push({ 
            ...item, 
            quantity: quantity, 
            totalPrice: totalCost // Add total price for new items
        }); 
    }

    saveCart(cart);
    alert(quantity + " of " + item.name + " added to cart! \nCost: ₱ " + totalCost);
}

// Get the current cart from localStorage
function getCart() {
    let cart = localStorage.getItem("cartRegular");
    if (cart) {
        return JSON.parse(cart);
    } else {
        return []; 
    }
}

// Save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem("cartRegular", JSON.stringify(cart));
    updateCartCount(getCart());
}

// Update the cart count in the HTML
function updateCartCount(cart) {
    const cartCountElement = document.getElementById("cart-count");
    
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity; 
    });
    
    cartCountElement.innerText = totalQuantity; 
}
