const products = [
    { id: 1, name: "Bún chả", price: 25000 },
    { id: 2, name: "Bánh mì BBT", price: 15000 },
    { id: 3, name: "Trà Sữa siêu to", price: 30000 },
    { id: 4, name: "Gà Rán BBT", price: 35000 },
    { id: 5, name: "Nước ngọt Monster", price: 20000 }
];

function renderProducts(filteredProducts) {
    const container = document.getElementById("productList");
    container.innerHTML = "";
    filteredProducts.forEach(product => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)}</p>
            <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        `;
        container.appendChild(div);
    });
}

function searchProducts() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
    renderProducts(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts(products);
    checkLoginStatus();
    document.getElementById("searchInput").addEventListener("input", searchProducts);
});