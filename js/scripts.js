let cart = [];

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function updateCartTotal() {
    let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            ${item.name} - ₹${(item.price * item.quantity).toFixed(2)}
            <span class="badge badge-primary badge-pill">${item.quantity}</span>
            <div>
                <button class="btn btn-sm btn-success" onclick="increaseQuantity(${index})">+</button>
                <button class="btn btn-sm btn-warning" onclick="decreaseQuantity(${index})">-</button>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(li);
    });
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    updateCartCount();
    renderCartItems();
    updateCartTotal();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    renderCartItems();
    updateCartTotal();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCartCount();
    renderCartItems();
    updateCartTotal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCartItems();
    updateCartTotal();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');
        addToCart(name, price);
    });
});

document.getElementById('checkout').addEventListener('click', () => {
    alert('Checkout functionality not implemented.');
});
