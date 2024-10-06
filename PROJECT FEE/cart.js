document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout-button');

    // Function to format numbers with commas (e.g., 1,719)
    function formatCurrency(number) {
        if (typeof number !== 'number') {
            return '0';
        }
        return number.toLocaleString('en-IN', { maximumFractionDigits: 2 });
    }

    // Function to render the cart items
    function renderCart() {
        // Clear the current cart display
        cartContainer.innerHTML = '';

        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<p>No items in the cart.</p>';
            totalElement.textContent = 'Rs 0';
            checkoutButton.disabled = true;
            return;
        }

        let total = 0;

        // Create a container for all cart items
        const itemsList = document.createElement('div');
        itemsList.classList.add('items-list');

        // Loop through each item and create HTML without images
        cartItems.forEach((item, index) => {
            // Validate item.price
            const price = (typeof item.price === 'number') ? item.price : 0;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">Rs ${formatCurrency(price)}</span>
                </div>
                <div class="item-quantity">
                    <button class="quantity-button decrease-button" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-button increase-button" data-index="${index}">+</button>
                </div>
                <button class="remove-button" data-index="${index}">Remove</button>
            `;
            itemsList.appendChild(itemElement);
            total += price * item.quantity;
        });

        cartContainer.appendChild(itemsList);
        totalElement.textContent = `Rs ${formatCurrency(total)}`;
        checkoutButton.disabled = false;
    }

    // Function to attach event listeners to buttons
    function attachEventListeners() {
        const decreaseButtons = document.querySelectorAll('.decrease-button');
        const increaseButtons = document.querySelectorAll('.increase-button');
        const removeButtons = document.querySelectorAll('.remove-button');

        // Decrease quantity button functionality
        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                } else {
                    cartItems.splice(index, 1); // Remove item if quantity is 1
                }
                updateCart();
            });
        });

        // Increase quantity button functionality
        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cartItems[index].quantity++;
                updateCart();
            });
        });

        // Remove item button functionality
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cartItems.splice(index, 1); // Remove item
                updateCart();
            });
        });
    }

    // Function to update the cart display and localStorage
    function updateCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
        attachEventListeners();
    }

    // Function to handle Checkout button click
    function handleCheckout() {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Implement your checkout logic here
        alert('Proceeding to checkout!');
    }

    // Initial render and event listener attachment
    renderCart();
    attachEventListeners();

    // Event listener for Checkout button
    checkoutButton.addEventListener('click', handleCheckout);
});