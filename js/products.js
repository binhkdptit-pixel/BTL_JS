//1. MẢNG DỮ LIỆU SẢN PHẨM PHÂN NHÓM
const products = [
  // Món chính
  {
    id: 1,
    name: "Cơm niêu",
    price: 49000,
    img: "https://comnieuthienly.com/_next/image?url=https%3A%2F%2Fhos.comnieuthienly.com%2Fimages%2Fwebp%2F67dbda9cbdc46c5dbc693e0c.jpg&w=3840&q=75",
    category: "main",
  },
  {
    id: 2,
    name: "Gỏi cuốn tôm thịt",
    price: 49000,
    img: "https://www.cet.edu.vn/wp-content/uploads/2018/11/goi-cuon-tom-thit.jpg",
    category: "main",
  },
  {
    id: 3,
    name: "Thịt kho tàu",
    price: 49000,
    img: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/cach_nau_thit_kho_tau_mien_bac_f471b2d853.jpg",
    category: "main",
  },
  {
    id: 4,
    name: "Cá lóc kho tiêu",
    price: 49000,
    img: "https://cdn.tgdd.vn/2021/09/CookRecipe/GalleryStep/thanh-pham-1629.jpg",
    category: "main",
  },
  {
    id: 5,
    name: "Nem rán",
    price: 55000,
    img: "https://cooponline.vn/tin-tuc/wp-content/uploads/2025/12/cach-lam-nem-ran-mien-bac-chuan-vi-gion-lau-ngay-tet.jpg",
    category: "main",
  },
  {
    id: 6,
    name: "Đậu phụ tẩm hành",
    price: 49000,
    img: "https://www.huongnghiepaau.com/wp-content/uploads/2026/01/cach-lam-dau-phu-tam-hanh-thom-ngon.jpg",
    category: "main",
  },
  {
    id: 7,
    name: "Tôm rang thịt",
    price: 55000,
    img: "https://i.ytimg.com/vi/VeHk-RYqmNM/maxresdefault.jpg",
    category: "main",
  },
  {
    id: 8,
    name: "Bò xào măng",
    price: 55000,
    img: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/kien-thuc/cach-lam-mang-truc-xao-thit-bo/cach-lam-mang-truc-xao-thit-bo-1.jpg",
    category: "main",
  },
  {
    id: 9,
    name: "Cá diêu hồng sốt cà chua",
    price: 55000,
    img: "https://i.ytimg.com/vi/3n1z9wotWFg/maxresdefault.jpg",
    category: "main",
  },
  {
    id: 10,
    name: "Vịt quay",
    price: 55000,
    img: "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/06/cach-lam-vit-quay-bang-noi-chien-khong-dau.jpg",
    category: "main",
  },
  {
    id: 11,
    name: "Chả lá lốt thịt heo",
    price: 55000,
    img: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_10_3_638319644071888829_cach-lam-cha-la-lot-thumb.jpg",
    category: "main",
  },

  // Món rau
  {
    id: 12,
    name: "Rau muống xào tỏi",
    price: 29000,
    img: "https://bizweb.dktcdn.net/100/524/612/files/ban-sao-cua-chay-ngon-20.jpg?v=1745823180498",
    category: "veggie",
  },
  {
    id: 13,
    name: "Rau bí xào tỏi",
    price: 35000,
    img: "https://i.ytimg.com/vi/0Cjx1HP29Ds/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD3s6JWWIdaj_3pu8Pd-fzN9mZmKQ",
    category: "veggie",
  },
  {
    id: 14,
    name: "Su Su luộc",
    price: 35000,
    img: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/174579/Originals/cach-luoc-su-su-5.jpg",
    category: "veggie",
  },
  {
    id: 15,
    name: "Salad",
    price: 35000,
    img: "https://storage.googleapis.com/onelife-public/blog.onelife.vn/2026/03/8c9eec9a-salad-tron-dau-giam-4.jpg",
    category: "veggie",
  },
  {
    id: 16,
    name: "Dưa chua",
    price: 35000,
    img: "https://i-giadinh.vnecdn.net/2023/10/24/Thanh-pham-1-1-5790-1698131360.jpg",
    category: "veggie",
  },

  // Món canh
  {
    id: 17,
    name: "Canh chua cá lóc",
    price: 59000,
    img: "https://i-giadinh.vnecdn.net/2023/04/25/Thanh-pham-1-1-7239-1682395675.jpg",
    category: "soup",
  },
  {
    id: 18,
    name: "Canh rau đay cua đồng",
    price: 45000,
    img: "https://chefstudio.vn/uploads/r/canh-cua-rau-day-mong-toi.jpg",
    category: "soup",
  },
  {
    id: 19,
    name: "Canh rau ngót thịt băm",
    price: 45000,
    img: "https://static-images.vnncdn.net/vps_images_publish/000001/000003/2025/6/24/cach-nau-canh-rau-ngot-thit-bam-tai-nha-don-gian-ai-cung-lam-duoc-118182.png?width=0&s=l30SQl5zHj_ekjDrCXeULw",
    category: "soup",
  },
  {
    id: 20,
    name: "Canh khổ qua nhồi thịt",
    price: 45000,
    img: "https://cooponline.vn/tin-tuc/wp-content/uploads/2025/12/meo-nau-canh-kho-qua-nhoi-thit-khong-dang.jpg",
    category: "soup",
  },
  {
    id: 21,
    name: "Canh tôm bầu",
    price: 45000,
    img: "https://khosachcovan.com/wp-content/uploads/2025/03/canh-bau-nau-tom-kho.jpg",
    category: "soup",
  },
  {
    id: 22,
    name: "Canh sườn rau củ",
    price: 45000,
    img: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/cach_lam_suon_ham_rau_cu_thumb_c245c8d808.jpg",
    category: "soup",
  },

  //Món tráng miệng
  {
    id: 23,
    name: "Hoa quả",
    price: 25000,
    img: "https://bna.1cdn.vn/2016/07/17/uploaded-dataimages-201607-original-_resize_images1622613_hoa_qua.jpg",
    category: "dessert",
  },
  {
    id: 24,
    name: "Kem",
    price: 20000,
    img: "https://cdn.tgdd.vn/2020/07/CookProduct/41-1200x676.jpg",
    category: "dessert",
  },
  {
    id: 25,
    name: "Pudding À La Mode",
    price: 20000,
    img: "https://upload.wikimedia.org/wikipedia/commons/7/78/Pudin_a_la_moda_japones.jpg",
    category: "dessert",
  },
  {
    id: 26,
    name: "Dragon Jelly",
    price: 20000,
    img: "https://www.tv-asahi.co.jp/build/sclashjelly/whatis/img/02.png",
    category: "dessert",
  },
  {
    id: 27,
    name: "Sương sáo sữa dừa",
    price: 20000,
    img: "https://cdnv2.tgdd.vn/bhx-static/bhx/News/Images/2025/12/10/1586920/image5_202512100010283758.jpg",
    category: "dessert",
  },

  // Đồ uống
  {
    id: 28,
    name: "333",
    price: 15000,
    img: "https://sabelado.com.vn/upload/product/570x400x2/594198310266.png",
    category: "drink",
  },
  {
    id: 29,
    name: "Coca-Cola",
    price: 15000,
    img: "https://bizweb.dktcdn.net/100/514/431/products/nuoc-ngot-coca-cola-lon-320ml-202304131107525481.jpg?v=1716431193590",
    category: "drink",
  },
  {
    id: 30,
    name: "Pepsi",
    price: 15000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMHQKjt6kjbriJbyhprDvX5PPSEJpcsZ73-A&s",
    category: "drink",
  },
  {
    id: 31,
    name: "Trà chanh",
    price: 15000,
    img: "https://s3.remagan.com/pro.remagan.uploads/product/2025/06/tra-chanh-20250623133930_6858f6a291607.webp",
    category: "drink",
  },
  {
    id: 32,
    name: "Nước ép cam",
    price: 25000,
    img: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2023/11/7/uong-nuoc-cam-16993504421751885406385.jpg",
    category: "drink",
  },
];

//2. HÀM BỔ TRỢ

//Định dạng số thành tiền Việt Nam
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}
//Lấy sản phẩm theo ID
function getProductById(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      return products[i];
    }
  }
  return null;
}

//3. HIỂN THỊ SẢN PHẨM THEO DANH MỤC

//Hiển thị sản phẩm lên giao diện
function renderProducts(filteredProducts) {
  const container = document.getElementById("productList");
  if (!container) return;

  container.innerHTML = "";

  const mainGroup = [];
  const veggieGroup = [];
  const soupGroup = [];
  const dessertGroup = [];
  const drinkGroup = [];

  for (let i = 0; i < filteredProducts.length; i++) {
    const item = filteredProducts[i];
    if (item.category === "main") mainGroup.push(item);
    else if (item.category === "veggie") veggieGroup.push(item);
    else if (item.category === "soup") soupGroup.push(item);
    else if (item.category === "dessert") dessertGroup.push(item);
    else if (item.category === "drink") drinkGroup.push(item);
  }
  // Hàm tạo HTML cho từng nhóm sản phẩm
  function createCategoryHTML(titleElement, groupList) {
    if (groupList.length === 0) return "";

    let html = `${titleElement}<div class="product-grid">`;
    for (let i = 0; i < groupList.length; i++) {
      const p = groupList[i];
      html += `
                <div class="product-card">
                    <img src="${p.img}" alt="${p.name}" />
                    <div class="product-info">
                        <h4>${p.name}</h4>
                        <p class="price">${formatPrice(p.price)}</p>
                        <button class="btn-add" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
                    </div>
                </div>
            `;
    }
    html += `</div>`;
    return html;
  }

  let finalHTML = "";
  finalHTML += createCategoryHTML(
    '<h3 class="group-title">🍗 Món Chính</h3>',
    mainGroup,
  );
  finalHTML += createCategoryHTML(
    '<h3 class="group-title" style="margin-top: 35px;">🌱 Món Rau</h3>',
    veggieGroup,
  );
  finalHTML += createCategoryHTML(
    '<h3 class="group-title" style="margin-top: 35px;">🥣 Món Canh</h3>',
    soupGroup,
  );
  finalHTML += createCategoryHTML(
    '<h3 class="group-title" style="margin-top: 35px;">🍮 Tráng Miệng</h3>',
    dessertGroup,
  );
  finalHTML += createCategoryHTML(
    '<h3 class="group-title" style="margin-top: 35px;">🥤 Đồ Uống</h3>',
    drinkGroup,
  );

  container.innerHTML = finalHTML;
}

//4. TÍNH NĂNG TÌM KIẾM
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

//5. XỬ LÝ ĐĂNG NHẬP / LỜI CHÀO USER
function renderUserHeader() {
  const authSection = document.getElementById("authSection");
  if (!authSection) return;

  const rawUserData =
    localStorage.getItem("username") || localStorage.getItem("currentUser");

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
        localStorage.removeItem("username");
        localStorage.removeItem("currentUser");
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

//6. KHỞI CHẠY TRANG
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  renderUserHeader();

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", searchProducts);
  }
});
