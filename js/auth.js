//khởi tạo biến lưu thông tin người dùng hiện tại
let currentUser = null;

function registerUser(username, password) {
  if (!username || !password) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((u) => u.username === username)) {
    alert("Tài khoản đã tồn tại!");
    return;
  }
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Đăng ký thành công!");
  window.location.href = "login.html";
}
//hàm đăng nhập
function loginUser(username, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Đăng nhập thành công!");
    window.location.href = "products.html";
  } else {
    alert("Sai tài khoản hoặc mật khẩu!");
  }
}
//hàm đăng xuất
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
//hàm kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    currentUser = user;
  }
}
