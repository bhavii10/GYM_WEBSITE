document.querySelectorAll('.order-button').forEach(button => {
    button.addEventListener('click', function () {
        const supplement = this.closest('.supplements'); // Get the closest .supplements parent
        const name = supplement.getAttribute('data-name'); // Get the name from data-name
        const price = parseInt(supplement.getAttribute('data-price')); // Get the price and convert to integer
        const image = supplement.getAttribute('data-image'); // Get the image from data-image
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Check if the item is already in the cart
        const existingItemIndex = cartItems.findIndex(item => item.name === name);
        if (existingItemIndex > -1) {
            // Increase quantity if item already exists
            cartItems[existingItemIndex].quantity++;
        } else {
            // Add new item with quantity 1 and image
            cartItems.push({ name, price, quantity: 1, image });
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Redirect to cart page
        window.location.href = 'cart.html';
    });
});



