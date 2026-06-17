// Lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Thêm món — bắt buộc đăng nhập
function addToCart(id) {
  if (!requireLogin()) return;

  const product = getProductById(id);
  if (!product) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }

  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartCount(); // dùng hàm từ main.js
  alert("🎉 " + product.name + " đã được thêm vào giỏ hàng!");
}

// Xóa món khỏi giỏ hàng
function removeFromCart(id) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
  }
}

// Thay đổi số lượng món
function changeQuantity(id, change) {
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity = Math.max(1, item.quantity + change);
  }
  saveCart();
  renderCart();
  updateCartCount();
}

// Cập nhật tổng tiền và tóm tắt giỏ hàng
function updateCartSummary() {
  const totalCount = cart.reduce((s, i) => s + i.quantity, 0);
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const totalPriceEl = document.getElementById("totalPrice");
  if (totalPriceEl) totalPriceEl.textContent = formatPrice(total);

  const summaryCount = document.getElementById("summaryCount");
  if (summaryCount) summaryCount.textContent = totalCount;

  const cartItemLabel = document.getElementById("cartItemLabel");
  if (cartItemLabel) cartItemLabel.textContent = totalCount + " món";

  const cartSummary = document.getElementById("cartSummary");
  if (cartSummary) cartSummary.style.display = cart.length === 0 ? "none" : "block";
}

// Render giỏ hàng
function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Giỏ hàng đang trống</h3>
        <p>Hãy chọn món ngon từ thực đơn và thêm vào giỏ nhé!</p>
        <a class="btn-continue" href="products.html">Xem thực đơn</a>
      </div>
    `;
    updateCartSummary();
    return;
  }

  container.innerHTML = "";
  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img class="cart-item-image" src="${item.img || "assets/images/do an.png"}" alt="${item.name}" />
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="cart-item-price">Đơn giá: ${formatPrice(item.price)}</p>
        <p class="cart-item-subtotal">Thành tiền: ${formatPrice(subtotal)}</p>
      </div>
      <div class="cart-item-actions">
        <div class="qty-control">
          <button type="button" onclick="changeQuantity(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button type="button" onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
        <button type="button" class="btn-remove" onclick="removeFromCart(${item.id})">Xóa món</button>
      </div>
    `;
    container.appendChild(div);
  });

  updateCartSummary();
}

// Thanh toán
function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }
  localStorage.setItem("currentOrder", JSON.stringify(cart));
  window.location.href = "giaodich.html";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});