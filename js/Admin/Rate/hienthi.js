// Đọc giá trị từ cookie
const userInfoStringFromCookie = Cookies.get('userInfo');
// Chuyển chuỗi JSON thành đối tượng JavaScript
if (userInfoStringFromCookie) {
  const userInfoFromCookie = JSON.parse(userInfoStringFromCookie);

  const uidProfile = userInfoFromCookie.id_profile; // ID
  const emailProfile = userInfoFromCookie.email_profile; //Email
  const hotenProfile = userInfoFromCookie.hoten_profile; //Họ tên
  const passwordProfile = userInfoFromCookie.password_profile; //Password
  const sdtProfile = userInfoFromCookie.sdt_profile; //Số điện thoại
  const usernameProfile = userInfoFromCookie.username_profile; //Username
  const URLProfile = userInfoFromCookie.url_profile; //Link ảnh
  const RoleProfile = userInfoFromCookie.role; //Vai trò người dùng
  const Status = userInfoFromCookie.userstatus; //Trạng thái
  const TimeLogin = userInfoFromCookie.last_login; //Time đăng nhập
  const TimeLogout = userInfoFromCookie.last_logout; //Time đăng xuất

function UploadData() {
  const cxcx = document.getElementById("name-form");
  cxcx.textContent = hotenProfile;

  //Phương thức thêm ảnh vào trang thông qua url đã lấy từ cookie
  const img = document.createElement("img");

  // Thiết lập thuộc tính src của thẻ <img> bằng URL lấy từ cookie
  img.src = URLProfile;
  // Thêm các thuộc tính khác nếu cần thiết
  img.alt = "Avatar";
  img.classList.add("image-form");
  // Chèn thẻ <img> vào trong div có id là "imageContainer"
  const imageContainer = document.getElementById("avt-form");
  imageContainer.innerHTML = ""; // Xóa bỏ nội dung cũ của div trước khi chèn mới
  imageContainer.appendChild(img);
}
UploadData();

// Lấy thẻ input
const rateInput = document.getElementById("rate-input");
rateInput.innerHTML = hotenProfile + "," + " bạn đang nghĩ gì?";
// Lấy phần tử cần hiển thị
const fixedForm = document.querySelector(".fixed-form");

// Thêm sự kiện click cho ô input

document.addEventListener("DOMContentLoaded", function () {
  var InputClick = document.getElementById("rate-input");
  const fixedForm = document.querySelector(".fixed-form");
  var CloseBtn = document.getElementById("close-form");
  // Lấy phần tử background-dark
  const backgroundDark = document.getElementById("background-dark");

  InputClick.addEventListener("click", function () {
    fixedForm.classList.remove("hide");
    backgroundDark.classList.add("dark-mode");
  });

  CloseBtn.addEventListener("click", function () {
    fixedForm.classList.add("hide");
    backgroundDark.classList.remove("dark-mode");
  });

  document.addEventListener("mousedown", function (event) {
    if (!fixedForm.contains(event.target) && event.target !== InputClick) {
      fixedForm.classList.add("hide");
      backgroundDark.classList.remove("dark-mode");
    }
  });
});
function UploadData1() {
  // const cxcx = document.getElementById('txt-1');
  // cxcx.textContent = hotenProfile;

  //Phương thức thêm ảnh vào trang thông qua url đã lấy từ cookie
  const img = document.createElement("img");

  // Thiết lập thuộc tính src của thẻ <img> bằng URL lấy từ cookie
  img.src = URLProfile;
  // Thêm các thuộc tính khác nếu cần thiết
  img.alt = "Avatar";
  img.classList.add("image-form");
  // Chèn thẻ <img> vào trong div có id là "imageContainer"
  const imageContainer = document.getElementById("avt-1");
  imageContainer.innerHTML = ""; // Xóa bỏ nội dung cũ của div trước khi chèn mới
  imageContainer.appendChild(img);
}
UploadData1();
} else {
  console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}