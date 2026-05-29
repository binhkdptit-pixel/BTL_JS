let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    saveCart();
    updateCartCount();
    alert("Đã thêm vào giỏ hàng!");
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
}

function changeQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function renderCart() {
    const container = document.getElementById("cartItems");
    container.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <p>${item.name} x ${item.quantity} = ${subtotal} VNĐ</p>
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button onclick="removeFromCart(${item.id})">Xóa</button>
        `;
        container.appendChild(div);
    });

    document.getElementById("totalPrice").textContent = total;
}

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }
    localStorage.setItem("currentOrder", JSON.stringify(cart));
    window.location.href = "invoice.html";
}

document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    renderCart();
    updateCartCount();
});