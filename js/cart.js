// 1. Đồng bộ key lưu trữ chung trên LocalStorage là "cart"
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 2. Hàm lưu trạng thái giỏ hàng hiện tại vào LocalStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// 3. Hàm cập nhật số đếm hiển thị trên icon giỏ hàng ở thanh điều hướng
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

// 4. Hàm chức năng chính: Thêm sản phẩm được chọn vào giỏ hàng
function addToCart(id) {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  if (!currentUser) {
    alert("⚠️ Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
    return;
  }

  // Gọi hàm từ file products.js để bốc thông tin sản phẩm
  const product = getProductById(id);
  if (!product) {
    alert("Không tìm thấy sản phẩm!");
    return;
  }

  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity += 1; // Nếu món ăn đã có sẵn, cộng thêm số lượng lên 1
      found = true;
      break;
    }
  }

  if (!found) {
    // Nếu là món mới hoàn toàn, sao chép đối tượng sản phẩm và đính kèm số lượng = 1
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  alert("🎉 " + product.name + " đã được thêm vào giỏ hàng thành công!");
}

// 5. Hàm xóa bỏ một món ăn ra khỏi giỏ hàng hẳn
function removeFromCart(id) {
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
  }
}

// 6. Hàm tăng (+) hoặc giảm (-) số lượng món tại trang giỏ hàng
function changeQuantity(id, change) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity += change;
      if (cart[i].quantity < 1) {
        cart[i].quantity = 1; // Giới hạn số lượng tối thiểu phải là 1 món
      }
      break;
    }
  }
  saveCart();
  renderCart();
  updateCartCount();
}

// 7. Hàm tính tổng tiền của tất cả các món ăn trong giỏ
function calculateTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}

// 8. Hàm xuất danh sách sản phẩm giỏ hàng ra file cart.html (nếu thực khách đang mở trang giỏ hàng)
function renderCart() {
  const container = document.getElementById("cartItems");
  if (!container) return; // Nếu đang ở trang sản phẩm, bỏ qua khối này để không crash ứng dụng

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML =
      "<p style='text-align:center; padding: 20px;'>Giỏ hàng đang trống!</p>";
    const totalPriceEl = document.getElementById("totalPrice");
    if (totalPriceEl) totalPriceEl.textContent = "0đ";
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const subtotal = item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
            <p><strong>${item.name}</strong> x ${item.quantity} = ${formatPrice(subtotal)}</p>
            <div class="cart-item-actions">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})" style="color: red; margin-left: 10px;">Xóa</button>
            </div>
            <hr style="border: 0.5px solid #eee; margin: 10px 0;">
        `;
    container.appendChild(div);
  }

  const totalPriceEl = document.getElementById("totalPrice");
  if (totalPriceEl) {
    // Hàm formatPrice lấy từ file products.js kế thừa sang
    totalPriceEl.textContent = formatPrice(calculateTotal());
  }
}

// 9. Hàm xử lý chuyển đổi dữ liệu sang trang giao dịch
function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
  } else {
    localStorage.setItem("currentOrder", JSON.stringify(cart));
    window.location.href = "giaodich.html";
  }
}

// 10. Lắng nghe kích hoạt khi load trang
document.addEventListener("DOMContentLoaded", () => {
  if (typeof checkLoginStatus === "function") {
    checkLoginStatus();
  }
  renderCart();
  updateCartCount();
});
