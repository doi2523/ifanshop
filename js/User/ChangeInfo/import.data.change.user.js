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
//Đổ dữ liệu email vào
const EmailElement = document.getElementById('current-email');
EmailElement.textContent = emailProfile;

const usernm = document.getElementById('username');
const hotenn = document.getElementById('hoten');
const sdtt = document.getElementById('sdt');
const urlavatar = document.getElementById('url-avatar');
// Gán giá trị cho phần tử

usernm.textContent= usernameProfile;
hotenn.textContent= hotenProfile;
sdtt.textContent = sdtProfile;



// Đẩy các giá trị vào các trường trong form để người dùng có thể sửa và tiếp tục update
document.getElementById("username").value = usernameProfile;
document.getElementById("hoten").value = hotenProfile;
document.getElementById("sdt").value = sdtProfile;

function AddAvatar() {
    //Phương thức thêm ảnh vào trang thông qua url đã lấy từ cookie
const img = document.createElement('img');

// Thiết lập thuộc tính src của thẻ <img> bằng URL lấy từ cookie
img.src = URLProfile;
// Thêm các thuộc tính khác nếu cần thiết
img.alt = "Avatar";
img.classList.add('image-thumbnail');
// Chèn thẻ <img> vào trong div có id là "imageContainer"
const imageContainer = document.getElementById('imageContainer');
imageContainer.innerHTML = ''; // Xóa bỏ nội dung cũ của div trước khi chèn mới
imageContainer.appendChild(img);  
}
AddAvatar();

    var userAvatar = document.getElementById("user-avatar");
    
    // URL mới bạn muốn thay thế
    var newImageUrl = URLProfile;
    
    // Thay đổi thuộc tính src của thẻ img thành URL mới
    userAvatar.src = newImageUrl;

} else {
    console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}