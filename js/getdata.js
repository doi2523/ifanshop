//Function lấy dữ liệu từ cookies
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

// Sử dụng hàm để lấy giá trị từ cookies
const uidProfile = getCookie("id_profile")
const emailProfile = getCookie("email_profile");
const hotenProfile = getCookie("hoten_profile");
const passwordProfile = getCookie("password_profile");
const sdtProfile = getCookie("sdt_profile");
const usernameProfile = getCookie("username_profile");
const filenameProfile = getCookie("filename_profile");
const URLProfile = getCookie("url");

// Sử dụng các giá trị đã lấy được từ cookies
// console.log(uidProfile)
// console.log(emailProfile);
// console.log(hotenProfile);
// console.log(passwordProfile);
// console.log(sdtProfile);
// console.log(usernameProfile);
// console.log(filenameProfile);
// console.log(URLProfile)




function AutoLoadText() {
const usernameElement = document.getElementById('txt-username');
usernameElement.textContent = "@"+ usernameProfile;
const filenameElement = document.getElementById('name-avatar');
    filenameElement.textContent = filenameProfile;
    
const uidd = document.getElementById('uid');
const usernm = document.getElementById('username');
const emaill = document.getElementById('email');
const passwd = document.getElementById('password');
const hotenn = document.getElementById('hoten');
const sdtt = document.getElementById('sdt');
// Gán giá trị cho phần tử
uidd.textContent = uidProfile;
usernm.textContent= usernameProfile;
emaill.textContent= emailProfile;
passwd.textContent= passwordProfile;
hotenn.textContent= hotenProfile;
sdtt.textContent = sdtProfile;



// Đẩy các giá trị vào các trường trong form để người dùng có thể sửa và tiếp tục update
document.getElementById("uid").value = uidProfile;
document.getElementById("username").value = usernameProfile;
document.getElementById("email").value = emailProfile;
document.getElementById("password").value = passwordProfile;
document.getElementById("hoten").value = hotenProfile;
document.getElementById("sdt").value = sdtProfile;
}

setInterval(AutoLoadText, 0);
function AutoLoadImage() {
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
setInterval(AutoLoadImage, 0);  




