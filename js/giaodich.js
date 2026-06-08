function generateInvoice() {
    const order = JSON.parse(localStorage.getItem("currentOrder"));
    const user = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!order) {
        window.location.href = "index.html"; 
        return;
    }

    document.getElementById("customerName").textContent = user ? user.username : "Khách";
    document.getElementById("invoiceDate").textContent = new Date().toLocaleString("vi-VN");

    let html = "";
    let total = 0;

    order.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        html += `<p>${item.name} x ${item.quantity} = ${formatPrice(subtotal)}</p>`;
    });

    document.getElementById("invoiceItems").innerHTML = html;
    document.getElementById("invoiceTotal").textContent = formatPrice(total);
}

function backToHome() {
    localStorage.removeItem("currentOrder");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", generateInvoice);