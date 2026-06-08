// 1. Cập nhật mảng sản phẩm chứa đầy đủ thông tin và hình ảnh thực tế
const products = [
  {
    id: 1,
    name: "Gỏi cuốn tôm thịt",
    price: 49000,
    img: "https://www.cet.edu.vn/wp-content/uploads/2018/11/goi-cuon-tom-thit.jpg",
  },
  {
    id: 2,
    name: "Thịt kho tàu",
    price: 49000,
    img: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/cach_nau_thit_kho_tau_mien_bac_f471b2d853.jpg",
  },
  {
    id: 3,
    name: "Cá lóc kho tiêu",
    price: 49000,
    img: "https://cdn.tgdd.vn/2021/09/CookRecipe/GalleryStep/thanh-pham-1629.jpg",
  },
  {
    id: 4,
    name: "Nem rán",
    price: 55000,
    img: "https://cooponline.vn/tin-tuc/wp-content/uploads/2025/12/cach-lam-nem-ran-mien-bac-chuan-vi-gion-lau-ngay-tet.jpg",
  },
  {
    id: 5,
    name: "Đậu phụ tẩm hành",
    price: 49000,
    img: "https://www.huongnghiepaau.com/wp-content/uploads/2026/01/cach-lam-dau-phu-tam-hanh-thom-ngon.jpg",
  },
  {
    id: 6,
    name: "Tôm rang thịt",
    price: 55000,
    img: "https://i.ytimg.com/vi/VeHk-RYqmNM/maxresdefault.jpg",
  },
];

// 2. Hàm định dạng tiền tệ (Ví dụ: 49000 -> 49.000đ)
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

// 3. Hàm render danh sách sản phẩm chuẩn theo class CSS của trang cũ
function renderProducts(filteredProducts) {
  const container = document.getElementById("productList");
  if (!container) return;

  // Xóa nội dung cũ trước khi render mới
  container.innerHTML = "";

  // Sinh ra cấu trúc thẻ card chuẩn CSS để nhận giao diện đẹp
  for (let i = 0; i < filteredProducts.length; i++) {
    const product = filteredProducts[i];
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" />
            <div class="product-info">
                <h4>${product.name}</h4>
                <p class="price">${formatPrice(product.price)}</p>
                <button class="btn-add" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
            </div>
        `;
    container.appendChild(card);
  }
}

// 4. Hàm tìm kiếm sản phẩm theo tên
function searchProducts() {
  const keyword = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

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

// 5. Khởi chạy khi trang tải xong
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);

  if (typeof checkLoginStatus === "function") {
    checkLoginStatus();
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", searchProducts);
  }
});
