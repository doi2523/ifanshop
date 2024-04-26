// Lấy tham chiếu đến input số điện thoại
const sdtInput = document.getElementById("signup-sdt");

// Thêm sự kiện "input" để kiểm tra số điện thoại mỗi khi người dùng nhập vào
sdtInput.addEventListener("input", function () {
  const sdt = this.value; // Lấy giá trị số điện thoại từ input
  // Kiểm tra độ dài của số điện thoại
  if (sdt.length !== 10) {
    // Nếu độ dài khác 10
    this.setCustomValidity("Số điện thoại phải có đúng 10 số.");
  } else {
    this.setCustomValidity(""); // Xóa thông báo lỗi nếu độ dài là 10
  }
});

// Lấy tham chiếu đến input username
const usernameInput = document.getElementById("signup-username");

// Thêm sự kiện "input" để kiểm tra username mỗi khi người dùng nhập vào
usernameInput.addEventListener("input", function () {
  const username = this.value; // Lấy giá trị username từ input
  // Kiểm tra username
  if (/[\s\u0300-\u036f]/.test(username)) {
    // Kiểm tra dấu cách và chữ có dấu
    this.setCustomValidity(
      "Username không hợp lệ. Username chỉ được chứa chữ cái không dấu, số và dấu gạch dưới."
    );
  } else {
    this.setCustomValidity(""); // Xóa thông báo lỗi nếu username hợp lệ
  }
});

// Lấy tham chiếu đến input mật khẩu
const passwordInput = document.getElementById("signup-password");

// Thêm sự kiện "input" để kiểm tra mật khẩu mỗi khi người dùng nhập vào
passwordInput.addEventListener("input", function () {
  const password = this.value; // Lấy giá trị mật khẩu từ input

  // Kiểm tra độ dài của mật khẩu và xem mật khẩu có chứa dấu cách không
  if (password.length < 6 || /\s/.test(password)) {
    // Nếu mật khẩu có ít hơn 6 ký tự hoặc chứa dấu cách
    this.setCustomValidity(
      "Mật khẩu phải có ít nhất 6 ký tự và không chứa dấu cách."
    );
  } else {
    // Nếu mật khẩu hợp lệ
    this.setCustomValidity(""); // Xóa thông báo lỗi
  }
});

// Lấy tham chiếu đến input mật khẩu và nhập lại mật khẩu
const passwordInput1 = document.getElementById("signup-password");
const repeatPasswordInput = document.getElementById("repeat-passwd");

// Thêm sự kiện "input" vào cả hai ô input để kiểm tra mật khẩu nhập lại
passwordInput1.addEventListener("input", comparePasswords);
repeatPasswordInput.addEventListener("input", comparePasswords);

// Hàm so sánh giá trị của hai ô input mật khẩu
function comparePasswords() {
  const password = passwordInput1.value; // Lấy giá trị mật khẩu từ ô input mật khẩu
  const repeatPassword = repeatPasswordInput.value; // Lấy giá trị nhập lại mật khẩu từ ô input nhập lại mật khẩu

  // Kiểm tra xem hai mật khẩu có giống nhau không
  if (password !== repeatPassword) {
    // Nếu hai mật khẩu không giống nhau, thiết lập thông báo lỗi
    repeatPasswordInput.setCustomValidity("Mật khẩu nhập lại không khớp.");
  } else {
    // Nếu hai mật khẩu giống nhau, xóa thông báo lỗi
    repeatPasswordInput.setCustomValidity("");
  }
}
