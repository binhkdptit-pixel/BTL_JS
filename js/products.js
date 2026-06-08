const products = [
  { id: 1, name: "Khoai Tây Chiên", price: 25000 },
  { id: 2, name: "Bánh Mì Que", price: 15000 },
  { id: 3, name: "Trà Sữa", price: 30000 },
  { id: 4, name: "Gà Rán", price: 35000 },
  { id: 5, name: "Kem Ốc Quế", price: 20000 },
];

function renderProducts(filteredProducts) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  for (let i = 0; i < filteredProducts.length; i++) {
    const product = filteredProducts[i];
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)}</p>
            <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
        `;
    container.appendChild(div);
  }
}

function searchProducts() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  if (keyword === "") {
    renderProducts(products);
  } else {
    const filtered = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].name.toLowerCase().includes(keyword)) {
        filtered.push(products[i]);
      }
    }
    renderProducts(filtered);
  }
}

function getProductById(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  checkLoginStatus();
  document
    .getElementById("searchInput")
    .addEventListener("input", searchProducts);
});
