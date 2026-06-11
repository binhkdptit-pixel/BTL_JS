// Đăng ký tài khoản mới
function registerUser(username, password) {
  if (!username || !password) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((u) => u.username === username)) {
    alert("Tài khoản đã tồn tại!");
    return;
  }
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Đăng ký thành công!");
  window.location.href = "login.html";
}

// Đăng nhập
function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Đăng nhập thành công!");
    window.location.href = "products.html";
  } else {
    alert("Sai tài khoản hoặc mật khẩu!");
  }
}

// Kiểm tra đăng nhập — dùng cho các trang cần bảo vệ
function requireLogin() {
  if (!localStorage.getItem("currentUser")) {
    if (confirm("Bạn cần đăng nhập để tiếp tục!\nNhấn OK để đến trang đăng nhập.")) {
      window.location.href = "login.html";
    }
    return false;
  }
  return true;
}