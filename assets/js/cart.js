document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.querySelector('.total p');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');

            productElement.innerHTML = `
                <p>${product.name}</p>
                <input type="number" value="${product.quantity}" min="1" data-index="${index}">
                <span>$${(product.price * product.quantity).toFixed(2)}</span>
                <button class="btn btn-success btn-lg" data-index="${index}">Eliminar</button>
            `;

            cartItemsContainer.appendChild(productElement);
            total += product.price * product.quantity;
        });

        totalElement.innerText = `Total: $${total.toFixed(2)}`;
    }

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.type === 'number') {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity = parseInt(e.target.value);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    });

    renderCart();
});
