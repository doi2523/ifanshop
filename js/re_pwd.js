// Lấy tham chiếu đến các ô nhập mật khẩu
var passwordInput = document.getElementById("signup-password");
var confirmPasswordInput = document.getElementById("form3Example4cd");

// Thêm sự kiện "input" để kiểm tra mỗi khi người dùng nhập
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validatePassword);

// Hàm kiểm tra tính hợp lệ của mật khẩu
function validatePassword() {
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    // Kiểm tra xem hai mật khẩu có giống nhau không
    if (password === confirmPassword) {
        // Nếu giống nhau, hiển thị thông báo "Mật khẩu khớp"
        confirmPasswordInput.setCustomValidity("");
    } else {
        // Nếu không giống nhau, hiển thị thông báo "Mật khẩu không khớp"
        confirmPasswordInput.setCustomValidity("Mật khẩu không khớp");
    }
}


function validate() {
    var checkbox = document.getElementById("form2Example3c");
    var submitBtn = document.getElementById("signup");
    
    if (checkbox.checked) {
      signup.disabled = false;
    } else {
      signup.disabled = true;
    }
  }


  