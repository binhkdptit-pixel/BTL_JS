// 1. Lấy dữ liệu giỏ hàng từ LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 2. Lưu giỏ hàng hiện tại vào LocalStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 3. Cập nhật số lượng món trên biểu tượng giỏ hàng
function updateCartCount() {
  const cartCountElement =
    document.getElementById("cartCount") ||
    document.getElementById("cart-count");
  if (!cartCountElement) return;

  let totalCount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalCount += cart[i].quantity;
  }
  cartCountElement.textContent = totalCount;
}

// 4. Thêm sản phẩm vào giỏ hàng
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
  alert("🎉 " + product.name + " đã được thêm vào giỏ hàng thành công!");
}

// 5. Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(id) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
  }
}

// 6. Thay đổi số lượng sản phẩm trong giỏ hàng
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

// 7. Tính tổng tiền đơn hàng
function calculateTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}

// Cập nhật thông tin tổng tiền và số lượng món trong giỏ hàng
function updateCartSummary() {
  let totalCount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalCount += cart[i].quantity;
  }

  const totalPriceEl = document.getElementById("totalPrice");
  if (totalPriceEl) {
    totalPriceEl.textContent = formatPrice(calculateTotal());
  }

  const summaryCount = document.getElementById("summaryCount");
  if (summaryCount) summaryCount.textContent = totalCount;

  const cartItemLabel = document.getElementById("cartItemLabel");
  if (cartItemLabel) {
    cartItemLabel.textContent = totalCount + " món";
  }

  const cartSummary = document.getElementById("cartSummary");
  if (cartSummary) {
    cartSummary.style.display = cart.length === 0 ? "none" : "block";
  }
}

// 9. Hiển thị danh sách sản phẩm trong giỏ hàng
function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  container.innerHTML = "";

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

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const subtotal = item.price * item.quantity;
    const imageSrc = item.img || "assets/images/do an.png";
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img class="cart-item-image" src="${imageSrc}" alt="${item.name}" />
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="cart-item-price">Đơn giá: ${formatPrice(item.price)}</p>
        <p class="cart-item-subtotal">Thành tiền: ${formatPrice(subtotal)}</p>
      </div>
      <div class="cart-item-actions">
        <div class="qty-control">
          <button type="button" onclick="changeQuantity(${item.id}, -1)" aria-label="Giảm số lượng">−</button>
          <span>${item.quantity}</span>
          <button type="button" onclick="changeQuantity(${item.id}, 1)" aria-label="Tăng số lượng">+</button>
        </div>
        <button type="button" class="btn-remove" onclick="removeFromCart(${item.id})">Xóa món</button>
      </div>
    `;
    container.appendChild(div);
  }

  updateCartSummary();
}

// 10. Chuyển sang trang thanh toán
function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
  } else {
    localStorage.setItem("currentOrder", JSON.stringify(cart));
    window.location.href = "giaodich.html";
  }
}

// 11. Khởi tạo dữ liệu khi trang được tải xong
document.addEventListener("DOMContentLoaded", () => {
  if (typeof checkLoginStatus === "function") {
    checkLoginStatus();
  }
  renderCart();
  updateCartCount();
});
