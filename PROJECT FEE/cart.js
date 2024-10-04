document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalElement = document.getElementById('total');

    // Clear any previous content in the cart container
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>No items in the cart.</p>';
    } else {
        let total = 0;

        // Loop through each item and create HTML
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">Rs ${item.price}</span>
                    </div>
                </div>
                <div class="item-quantity">
                    <button class="decrease-button" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-button" data-index="${index}">+</button>
                </div>
                <button class="remove-button" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        totalElement.textContent = `Rs ${total}`;

        // Add event listeners for buttons
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
                    cartItems.splice(index, 1); // Remove item if quantity is 0
                }
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                location.reload(); // Refresh the cart display
            });
        });

        // Increase quantity button functionality
        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cartItems[index].quantity++;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                location.reload(); // Refresh the cart display
            });
        });

        // Remove item button functionality
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cartItems.splice(index, 1); // Remove item
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                location.reload(); // Refresh the cart display
            });
        });
    }
});
