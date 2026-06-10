// Tạo và hiển thị hóa đơn
function generateInvoice() {
  const order = JSON.parse(localStorage.getItem("currentOrder"));
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!order || order.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  const invoiceId = "BBT-" + Date.now().toString().slice(-8);
  document.getElementById("customerName").textContent = user
    ? user.username
    : "Khách";
  document.getElementById("invoiceDate").textContent =
    new Date().toLocaleString("vi-VN");
  document.getElementById("invoiceId").textContent = invoiceId;
  // tính tổng tiền và số lượng món ăn
  let html = "";
  let total = 0;
  let itemCount = 0;

  order.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    itemCount += item.quantity;

    html += `
      <tr>
        <td data-label="Món ăn">
          <div class="item-name">${item.name}</div>
          <div class="item-unit-price">Đơn giá: ${formatPrice(item.price)}</div>
        </td>
        <td class="col-qty" data-label="SL">${item.quantity}</td>
        <td class="col-subtotal" data-label="Thành tiền">${formatPrice(subtotal)}</td>
      </tr>
    `;
  });

  document.getElementById("invoiceItems").innerHTML = html;
  document.getElementById("invoiceTotal").textContent = formatPrice(total);
  document.getElementById("itemCount").textContent = itemCount;
}

// Xóa hóa đơn, làm sạch giỏ hàng khi quay về trang chủ
function backToHome() {
  localStorage.removeItem("currentOrder");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", generateInvoice);
