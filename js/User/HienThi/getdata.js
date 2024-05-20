// Đọc giá trị từ cookie
const userInfoStringFromCookie = Cookies.get('userInfo');
// Chuyển chuỗi JSON thành đối tượng JavaScript
if (userInfoStringFromCookie) {
    const userInfoFromCookie = JSON.parse(userInfoStringFromCookie);
    console.log(userInfoFromCookie); // {name: "Đào Văn Đôi", age: 30, email: "daovandoi@example.com"}
    console.log(userInfoFromCookie.email_profile);
    console.log(userInfoFromCookie.sdt_profile);
    console.log(userInfoFromCookie.hoten_profile);
    console.log(userInfoFromCookie.password_profile);
    console.log(userInfoFromCookie.id_profile);
    console.log(userInfoFromCookie.username_profile);
    console.log(userInfoFromCookie.url_profile);
    console.log(userInfoFromCookie.role);
    console.log(userInfoFromCookie.userstatus);
    console.log(userInfoFromCookie.last_login);
    console.log(userInfoFromCookie.last_logout);

    // const usernameElement = document.getElementById('txt-username');
    // if (usernameElement) {
    //     usernameElement.innerText = "@" + userInfoFromCookie.username_profile;
    // } else {
    //     console.error("Không tìm thấy phần tử có id 'txt-username'.");
    // }

} else {
    console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}

// const filenameElement = document.getElementById('name-avatar');
// if (filenameElement) {
//     filenameElement.innerText = filenameProfile;
// } else {
//     console.error("Không tìm thấy phần tử có id 'name-avatar'.");
// }

    
// const uidd = document.getElementById('uid');
// const usernm = document.getElementById('username');
// const emaill = document.getElementById('email');
// const passwd = document.getElementById('password');
// const hotenn = document.getElementById('hoten');
// const sdtt = document.getElementById('sdt');
// const urlavatar = document.getElementById('url-avatar');
// // Gán giá trị cho phần tử
// uidd.textContent = uidProfile;
// usernm.textContent= usernameProfile;
// emaill.textContent= emailProfile;
// passwd.textContent= passwordProfile;
// hotenn.textContent= hotenProfile;
// sdtt.textContent = sdtProfile;



// Đẩy các giá trị vào các trường trong form để người dùng có thể sửa và tiếp tục update
// document.getElementById("uid").value = uidProfile;
// document.getElementById("username").value = usernameProfile;
// document.getElementById("email").value = emailProfile;
// document.getElementById("password").value = passwordProfile;
// document.getElementById("hoten").value = hotenProfile;
// document.getElementById("sdt").value = sdtProfile;

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
// AddAvatar();
