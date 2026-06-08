function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;
  cart.forEach((item) => (count += item.quantity));
  document.getElementById("cartCount").textContent = count;
}

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " VNĐ";
}

//Thanh tìm kiếm
document.getElementById("search-input").addEventListener("input", function (e) {
  let từKhóa = e.target.value.toLowerCase();
  let cácMónĂn = document.querySelectorAll(".product-card");

  cácMónĂn.forEach((món) => {
    let tênMón = món.querySelector("h4").textContent.toLowerCase();

    if (tênMón.includes(từKhóa)) {
      món.style.display = "block";
    } else {
      món.style.display = "none";
    }
  });
});
