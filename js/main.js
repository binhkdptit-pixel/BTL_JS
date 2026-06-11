// Định dạng giá tiền Việt Nam
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " VNĐ";
}

// Cập nhật số lượng sản phẩm trên icon giỏ hàng
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (!el) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;
  cart.forEach((item) => (count += item.quantity));
  el.textContent = count;
}

// Render auth header (dùng chung cho mọi trang có id="authSection")
function renderUserHeader() {
  const authSection = document.getElementById("authSection");
  if (!authSection) return;
  // Kiểm tra nếu đã đăng nhập, hiển thị tên người dùng và nút đăng xuất
  const rawUser = localStorage.getItem("currentUser");

  if (rawUser) {
    let displayName = "";
    try {
      displayName = JSON.parse(rawUser).username;
    } catch {
      displayName = rawUser;
    }

    authSection.innerHTML = `
      <span class="user-welcome">👋 Xin chào, <strong>${displayName}</strong></span>
      <button id="btnLogout">Đăng xuất</button>
    `;

    // Thêm sự kiện đăng xuất
    const btn = document.getElementById("btnLogout");
    btn.addEventListener("click", () => {
      if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("cart");
        localStorage.removeItem("currentOrder");
        window.location.href = "index.html";
      }
    });
  } else {
    authSection.innerHTML = `
      <a href="login.html">Đăng nhập</a>
      <a href="register.html" class="nav-action">Đăng ký</a>
    `;
  }
}

// Khi trang được tải, cập nhật header và số lượng giỏ hàng
document.addEventListener("DOMContentLoaded", () => {
  renderUserHeader();
  updateCartCount();
});