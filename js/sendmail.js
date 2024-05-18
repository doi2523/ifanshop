
const email = document.getElementById("email");

function sendEmail() {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "ifanshopmail@gmail.com",
    Password: "E7F0319C5DD68A220A8069A1681B6CB57ED2",
    To: email.value,
    From: "ifanshopmail@gmail.com",
    Subject: "Cám ơn !",
    Body: "Cám ơn bạn đã quan tâm đến nội dung website"
  }).then(
    message => alert(message)
  );
}
document.getElementById("emailForm").addEventListener("submit", function() {
  // Ngăn form khỏi tải lại trang
  event.preventDefault();
  sendEmail();
  Alert();
})


function Alert() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "Gửi thành công"
  });
}
