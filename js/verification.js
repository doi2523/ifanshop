function sendVerificationCode() {
    // Lấy giá trị email từ form
    var email = document.getElementById("email").value;

    // Tạo mã xác thực ngẫu nhiên
    var authenticationCode = Math.floor(100000 + Math.random() * 900000);

    // Cấu hình thông tin email
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "doibncm@gmail.com",
        Password : "ED479B01FEFC128F5DF16D0D31E7DE7FEF20",
        To : email,
        From : "doibncm@gmail.com",
        Subject : "Verification Code",
        Body : "Your verification code is: " + authenticationCode
    }).then(
      message => alert(message)
    );
}


