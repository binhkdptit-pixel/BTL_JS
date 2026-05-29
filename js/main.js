function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = 0;
    cart.forEach(item => count += item.quantity);
}

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + " VNĐ";
}