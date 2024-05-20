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

const roler = document.getElementById('roler');
roler.textContent = RoleProfile;


const usernameElement = document.getElementById('txt-username');
usernameElement.textContent = "@"+ usernameProfile;
    
const uidd = document.getElementById('uid');
const usernm = document.getElementById('username');
const emaill = document.getElementById('email');
const passwd = document.getElementById('password');
const hotenn = document.getElementById('hoten');
const sdtt = document.getElementById('sdt');
const urlavatar = document.getElementById('url-avatar');
// Gán giá trị cho phần tử
emaill.textContent= emailProfile;
hotenn.textContent= hotenProfile;

function AddAvatar() {
    const img = document.createElement('img');
    img.src = URLProfile;
    img.alt = "Avatar";
    img.classList.add('image-thumbnail');
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Xóa bỏ nội dung cũ của div trước khi chèn mới
    imageContainer.appendChild(img);  
}
AddAvatar();
    var userAvatar = document.getElementById("user-avatar");
    var newImageUrl = URLProfile;
    userAvatar.src = newImageUrl;

} else {
    console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}