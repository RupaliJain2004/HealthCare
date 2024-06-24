document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    const cartItemsContainer = document.querySelector('.cart-items');
    // const cartSubtotal = document.querySelector('.cart-subtotal');
    const cartTotal = document.querySelector('.cart-total');
    let cart = [];

    console.log("error");

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.box');
            const productId = product.getAttribute('data-id');
            const productName = product.getAttribute('data-name');
            const productPrice = parseFloat(product.getAttribute('data-price'));
            const productImg = product.getAttribute('data-img');

            addToCart(productId, productName, productPrice, productImg);
            updateCart();
        });
    });

    function addToCart(id, name, price, img) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, img, quantity: 1 });
        }
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('tr');
            cartItem.innerHTML = `
                <td><img src="${item.img}" alt="${item.name}" class="cart-item-img"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" class="cart-item-quantity" data-id="${item.id}">
                </td>
                <td class="cart-item-total">${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-item-button" data-id="${item.id}">Remove</button></td>
            `;

            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        // cartSubtotal.textContent = subtotal.toFixed(2);
        cartTotal.textContent = total.toFixed(2);

        const removeButtons = document.querySelectorAll('.remove-item-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                removeFromCart(id);
            });
        });

        const quantityInputs = document.querySelectorAll('.cart-item-quantity');
        quantityInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                const newQuantity = parseInt(e.target.value);
                updateItemQuantity(id, newQuantity);
            });
        });
    }

    function updateItemQuantity(id, newQuantity) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = newQuantity;
            updateCart();
        }
    }
});