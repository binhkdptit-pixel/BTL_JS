function updateCartCount() {
  const cartCountElement = document.getElementById("cartCount");
  if (!cartCountElement) return;
  
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;
  cart.forEach((item) => (count += item.quantity));
  cartCountElement.textContent = count;
}

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " VNĐ";
}

// Hàm kiểm tra đăng nhập và render header phù hợp
function renderUserHeader() {
  const authSection = document.getElementById("authSection");
  if (!authSection) return;

  const rawUserData = localStorage.getItem("currentUser");

  if (rawUserData) {
    let displayName = "";
    try {
      const parsedUser = JSON.parse(rawUserData);
      displayName = parsedUser.username;
    } catch (error) {
      displayName = rawUserData;
    }

    authSection.innerHTML = `
            <span class="user-welcome" style="color: #6b9e2f; font-weight: bold; margin-right: 15px; font-size: 16px;">
                👋 Xin chào, <span style="color: #333;">${displayName}</span>
            </span>
            <button id="btnLogout" style="
                background-color: #ff5722; 
                color: white; 
                border: none; 
                padding: 6px 14px; 
                border-radius: 20px; 
                font-weight: bold; 
                cursor: pointer;
                font-size: 14px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                transition: background 0.2s;
            ">Đăng xuất</button>
        `;

    const btnLogout = document.getElementById("btnLogout");
    btnLogout.addEventListener(
      "mouseover",
      () => (btnLogout.style.backgroundColor = "#e64a19"),
    );
    btnLogout.addEventListener(
      "mouseout",
      () => (btnLogout.style.backgroundColor = "#ff5722"),
    );

    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("cart");
        localStorage.removeItem("currentOrder");
        window.location.href = "index.html";
      }
    });
  } else {
    authSection.innerHTML = `
            <a href="login.html" style="color: #6b9e2f; text-decoration: none; font-weight: bold; margin-right: 20px;">Đăng Nhập</a>
            <a href="register.html" style="color: #6b9e2f; text-decoration: none; font-weight: bold;">Đăng Ký</a>
        `;
  }
}

//Thanh tìm kiếm
const searchElement = document.getElementById("searchInput");
if (searchElement) {
  searchElement.addEventListener("input", function (e) {
    let fromKhoa = e.target.value.toLowerCase();
    let cacMonAn = document.querySelectorAll(".product-card");

    cacMonAn.forEach((mon) => {
      let tenMon = mon.querySelector("h4").textContent.toLowerCase();

      if (tenMon.includes(fromKhoa)) {
        mon.style.display = "block";
      } else {
        mon.style.display = "none";
      }
    });
  });
}

// Khởi động khi trang load
document.addEventListener("DOMContentLoaded", () => {
  renderUserHeader();
});
