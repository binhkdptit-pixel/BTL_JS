const cart = [];
const cartCount = document.getElementById('cart-count');
const cartList = document.getElementById('cart-list');
const totalPrice = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');

function formatCurrency(value) {
    return value.toLocaleString('vi-VN') + 'đ';
}

function updateCartDisplay() {
    cartList.innerHTML = '';
    if (cart.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.className = 'empty-cart-msg';
        emptyItem.textContent = 'Chưa có món nào trong giỏ.';
        cartList.appendChild(emptyItem);
        cartCount.textContent = '0';
        totalPrice.textContent = '0đ';
        return;
    }

    let sum = 0;
    cart.forEach((item, index) => {
        const itemElement = document.createElement('li');
        itemElement.className = 'cart-item';

        const itemText = document.createElement('span');
        itemText.textContent = `${item.name} x${item.quantity} · ${formatCurrency(item.price * item.quantity)}`;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Xóa';
        removeBtn.addEventListener('click', () => {
            cart.splice(index, 1);
            updateCartDisplay();
        });

        itemElement.appendChild(itemText);
        itemElement.appendChild(removeBtn);
        cartList.appendChild(itemElement);

        sum += item.price * item.quantity;
    });

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    totalPrice.textContent = formatCurrency(sum);
}

function addItemToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
}

function setupMenuButtons() {
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.food-item');
            const name = card.dataset.name;
            const price = Number(card.dataset.price);
            addItemToCart(name, price);
        });
    });
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Giỏ hàng đang trống. Vui lòng thêm món trước khi thanh toán.');
        return;
    }
    alert(`Cảm ơn bạn đã đặt hàng! Tổng thanh toán là ${totalPrice.textContent}.`);
    cart.length = 0;
    updateCartDisplay();
});

setupMenuButtons();
updateCartDisplay();
