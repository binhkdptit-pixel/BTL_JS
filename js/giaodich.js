// ===== Thông tin nhận thanh toán VietQR (Quick Link) =====
// Tham khảo: https://vietqr.io/danh-sach-api/link-tao-ma-nhanh/
const VIETQR_CONFIG = {
  bankId: "MB",                 // Mã/tên viết tắt ngân hàng (MB Bank)
  accountNo: "0983322928",      // Số tài khoản nhận tiền
  accountName: "BBT QUAN AN VIET", // Tên chủ tài khoản hiển thị trên QR
  template: "compact2",         // Giao diện ảnh QR: compact2 | compact | qr_only | print
};

// Lưu lại tổng tiền + mã đơn hàng để dùng khi tạo mã QR
let currentInvoiceTotal = 0;
let currentInvoiceId = "";

// Tạo và hiển thị hóa đơn
function generateInvoice() {
  const order = JSON.parse(localStorage.getItem("currentOrder"));
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!order || order.length === 0) {
    window.location.href = "cart.html";
    return;
  }
  
// Tạo mã hóa đơn đơn giản dựa trên timestamp để đảm bảo tính duy nhất
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

  // Lưu lại để dùng cho mã QR thanh toán
  currentInvoiceTotal = total;
  currentInvoiceId = invoiceId;
}

// Tạo URL ảnh QR VietQR (Quick Link) dựa trên tổng tiền & mã đơn hàng
function buildVietQRUrl(amount, invoiceId) {
  const { bankId, accountNo, accountName, template } = VIETQR_CONFIG;
  // Nội dung chuyển khoản: tối đa 50 ký tự, không dấu đặc biệt
  const addInfo = `Thanh toan don hang ${invoiceId}`;
  const base = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png`;
  const params = new URLSearchParams({
    amount: String(Math.round(amount)),
    addInfo: addInfo,
    accountName: accountName,
  });
  return `${base}?${params.toString()}`;
}

// Hiển thị mã QR thanh toán (thay cho in hóa đơn)
function showPaymentQR() {
  if (!currentInvoiceTotal || currentInvoiceTotal <= 0) {
    alert("Không tìm thấy thông tin hóa đơn để tạo mã QR.");
    return;
  }

  const qrUrl = buildVietQRUrl(currentInvoiceTotal, currentInvoiceId);
  const overlay = document.getElementById("qrOverlay");
  const qrImg = document.getElementById("qrImage");
  const qrAmount = document.getElementById("qrAmount");
  const qrInfo = document.getElementById("qrInfo");

  qrImg.src = qrUrl;
  qrAmount.textContent = formatPrice(currentInvoiceTotal);
  qrInfo.textContent = `Thanh toan don hang ${currentInvoiceId}`;
  overlay.classList.add("active");
}

// Đóng popup mã QR
function closePaymentQR() {
  document.getElementById("qrOverlay").classList.remove("active");
}

// Xóa hóa đơn, làm sạch giỏ hàng khi quay về trang chủ
function backToHome() {
  localStorage.removeItem("currentOrder");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", generateInvoice);
