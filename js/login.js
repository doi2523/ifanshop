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