const form = document.querySelector('form');
const email = document.getElementById("email");

function sendEmail(verificationCode) {
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "ifanshopmail@gmail.com",
    Password : "E7F0319C5DD68A220A8069A1681B6CB57ED2",
    To : email.value,
    From : "ifanshopmail@gmail.com",
    Subject : "iFanShop Verification",
    Body : "Mã xác thực của bạn là: " + verificationCode
  }).then(
  message => alert(message)
  );
}
form.addEventListener("submit" , (e) => {
  e.preventDefault();
  sendEmail(verificationCode)
});
/////
function generateVerificationCode(length) {
  var code = '';
  var characters = '0123456789'; // Các ký tự có thể sử dụng cho mã xác thực
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}
var verificationCode = generateVerificationCode(6); // Ví dụ: Tạo mã xác thực có 6 chữ số
console.log("Verification Code:", verificationCode);
///////
document.getElementById("verificationForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Ngăn chặn form submit

  // Lấy mã xác thực từ trường nhập liệu
  var verificationCode = document.getElementById("verification").value;

  // So sánh với mã xác thực được gửi đến email
  if (verificationCode === localStorage.getItem("verificationCode")) {
      window.location.href = "index.html"; // Chuyển hướng tới trang index.html nếu mã xác thực đúng
  } else {
      alert("Mã xác thực không đúng. Vui lòng nhập lại.");
  }
});