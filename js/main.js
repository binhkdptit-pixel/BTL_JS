// Quản lý header và cập nhật số lượng giỏ hàng
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (!el) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  el.textContent = count;
}

//Kiểm tra: Nó truy cập vào localStorage để tìm khóa currentUser
function renderUserHeader() {
  const authSection = document.getElementById("authSection");
  if (!authSection) return;

  const rawUser = localStorage.getItem("currentUser");

  if (rawUser) {
    let displayName = "";
    try {
      displayName = JSON.parse(rawUser).username;
    } catch {
      displayName = rawUser;
    }

    authSection.innerHTML = `
      <div class="user-logged-in">
        <span class="user-welcome">👋 Xin chào, <strong>${displayName}</strong></span>
        <button id="btnLogout" class="btn-logout">Đăng xuất</button>
      </div>
    `;

    document.getElementById("btnLogout").addEventListener("click", () => {
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

document.addEventListener("DOMContentLoaded", () => {
  renderUserHeader();
  updateCartCount();
});