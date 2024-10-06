document.addEventListener("DOMContentLoaded", function () {
    const orderButtons = document.querySelectorAll('.order-button');

    orderButtons.forEach(button => {
        button.addEventListener('click', function () {
            const supplementCard = this.closest('.supplement-card'); // Updated class selector
            const name = supplementCard.getAttribute('data-name');
            const price = parseInt(supplementCard.getAttribute('data-price'), 10);
            const image = supplementCard.getAttribute('data-image');
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Validate data attributes
            if (!name || isNaN(price) || !image) {
                console.error('Invalid supplement data. Please check the data attributes.');
                return;
            }

            // Check if the item is already in the cart
            const existingItemIndex = cartItems.findIndex(item => item.name === name);
            if (existingItemIndex > -1) {
                // Increase quantity if item already exists
                cartItems[existingItemIndex].quantity++;
            } else {
                // Add new item with quantity 1 and image
                cartItems.push({ name, price, quantity: 1, image });
            }

            // Update localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Provide user feedback before redirecting
            this.textContent = "Added!";
            this.disabled = true;
            setTimeout(() => {
                this.textContent = "Order";
                this.disabled = false;
                // Redirect to cart page
                window.location.href = 'cart.html';
            }, 1000);
        });
    });
});