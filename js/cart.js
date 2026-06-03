let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    const product = getProductById(id);
    if (!product) {
        alert("Không tìm thấy sản phẩm!");
        return;
    }

    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity += 1;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    alert(product.name + " đã được thêm vào giỏ hàng!");
}

function removeFromCart(id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function changeQuantity(id, change) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity += change;
            if (cart[i].quantity < 1) {
                cart[i].quantity = 1;
            }
            break;
        }
    }
    saveCart();
    renderCart();
    updateCartCount();
}

function calculateTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    return total;
}

function renderCart() {
    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Giỏ hàng trống!</p>";
        document.getElementById("totalPrice").textContent = 0;
        return;
    }

    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const subtotal = item.price * item.quantity;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <p>${item.name} x ${item.quantity} = ${subtotal} VNĐ</p>
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
            <button onclick="removeFromCart(${item.id})">Xóa</button>
        `;
        container.appendChild(div);
    }

    document.getElementById("totalPrice").textContent = calculateTotal();
}

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
    } else {
        localStorage.setItem("currentOrder", JSON.stringify(cart));
        window.location.href = "invoice.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    renderCart();
    updateCartCount();
});