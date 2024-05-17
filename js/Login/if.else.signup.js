// Kiểm tra số điện thoại
const sdtInput = document.getElementById("signup-sdt");
sdtInput.addEventListener("input", function () {
  const sdt = this.value;
  if (sdt.length !== 10) {
    this.setCustomValidity("Số điện thoại phải có đúng 10 số.");
  } else {
    this.setCustomValidity("");
  }
});

// Kiểm tra username
const usernameInput = document.getElementById("signup-username");
usernameInput.addEventListener("input", function () {
  const username = this.value;
  if (/[\s\u0300-\u036f]/.test(username)) {
    this.setCustomValidity("Username không hợp lệ. Username chỉ được chứa chữ cái không dấu, số và dấu gạch dưới.");
  } else {
    this.setCustomValidity("");
  }
});

// Kiểm tra mật khẩu
const passwordInput = document.getElementById("signup-password");
passwordInput.addEventListener("input", function () {
  const password = this.value;
  if (password.length < 6 || /\s/.test(password)) {
    this.setCustomValidity("Mật khẩu phải có ít nhất 6 ký tự và không chứa dấu cách.");
  } else {
    this.setCustomValidity("");
  }
});

// So sánh mật khẩu nhập lại
const passwordInput1 = document.getElementById("signup-password");
const repeatPasswordInput = document.getElementById("repeat-passwd");

function comparePasswords() {
  const password = passwordInput1.value;
  const repeatPassword = repeatPasswordInput.value;
  if (password !== repeatPassword) {
    repeatPasswordInput.setCustomValidity("Mật khẩu nhập lại không khớp.");
  } else {
    repeatPasswordInput.setCustomValidity("");
  }
}

passwordInput1.addEventListener("input", comparePasswords);
repeatPasswordInput.addEventListener("input", comparePasswords);
