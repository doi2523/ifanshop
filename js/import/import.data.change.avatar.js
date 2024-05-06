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
const URLProfile = getCookie("url_profile");

// Sử dụng các giá trị đã lấy được từ cookies
// console.log(uidProfile)
// console.log(emailProfile);
// console.log(hotenProfile);
// console.log(passwordProfile);
// console.log(sdtProfile);
// console.log(usernameProfile);
// console.log(filenameProfile);
// console.log(URLProfile)


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
const urlavatar = document.getElementById('url-avatar');
// Gán giá trị cho phần tử
uidd.textContent = uidProfile;
usernm.textContent= usernameProfile;
emaill.textContent= emailProfile;
passwd.textContent= passwordProfile;
hotenn.textContent= hotenProfile;
sdtt.textContent = sdtProfile;
urlavatar.textContent = URLProfile;



// Đẩy các giá trị vào các trường trong form để người dùng có thể sửa và tiếp tục update
document.getElementById("uid").value = uidProfile;
document.getElementById("username").value = usernameProfile;
document.getElementById("email").value = emailProfile;
document.getElementById("password").value = passwordProfile;
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

function printAllCookies() {
    // Tách các cookie thành mảng dựa trên dấu chấm phẩy và khoảng trắng
    const cookiesArray = document.cookie.split('; ');

    // Duyệt qua mảng các cookie và in ra từng cookie
    cookiesArray.forEach(cookie => {
        // Tách tên và giá trị của cookie
        const [cookieName, cookieValue] = cookie.split('=');
        // In ra tên và giá trị của cookie
        console.log(`${cookieName}: ${decodeURIComponent(cookieValue)}`);
    });
}
        printAllCookies();
    // Lấy thẻ img có id là "user-avatar"
    var userAvatar = document.getElementById("user-avatar");
    
    // URL mới bạn muốn thay thế
    var newImageUrl = URLProfile;
    
    // Thay đổi thuộc tính src của thẻ img thành URL mới
    userAvatar.src = newImageUrl;

