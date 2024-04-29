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
const avatarProfile = getCookie("url_profile");

console.log(uidProfile)
console.log(emailProfile);
console.log(hotenProfile);
console.log(passwordProfile);
console.log(sdtProfile);
console.log(usernameProfile);
console.log(filenameProfile);
console.log(avatarProfile)

function AddText() {
    const txt = document.getElementById('txt-username');
    txt.innerText= "@" +usernameProfile
}

AddText();
function AddAvatar() {
    //Phương thức thêm ảnh vào trang thông qua url đã lấy từ cookie
const img = document.createElement('img');

// Thiết lập thuộc tính src của thẻ <img> bằng URL lấy từ cookie
img.src = avatarProfile;
// Thêm các thuộc tính khác nếu cần thiết
img.alt = "Avatar";
img.classList.add('image-thumbnail');
// Chèn thẻ <img> vào trong div có id là "imageContainer"
const imageContainer = document.getElementById('imageContainer');
imageContainer.innerHTML = ''; // Xóa bỏ nội dung cũ của div trước khi chèn mới
imageContainer.appendChild(img);  
}
AddAvatar();