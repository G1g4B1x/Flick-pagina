document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            addProductToCart(productName, productPrice);
        });
    });

    function addProductToCart(name, price) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(product => product.name === name);

        if (productIndex > -1) {
            cart[productIndex].quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} ha sido agregado al carrito.`);
    }
});
