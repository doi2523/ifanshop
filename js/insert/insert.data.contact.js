  // Import the functions you need from the SDKs you need
  import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref, onValue, get, child, remove, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCnZzlFSm-61oaNvO2TTJyef2PMc6iU8DY",
    authDomain: "user-inifanshop.firebaseapp.com",
    databaseURL: "https://user-inifanshop-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "user-inifanshop",
    storageBucket: "user-inifanshop.appspot.com",
    messagingSenderId: "104690936940",
    appId: "1:104690936940:web:5398fbb0edae0c7a76bc49",
    measurementId: "G-NLBDR28748"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  const auth = getAuth();
const firebaseApp = getApp();
  

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


document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    InsertContact();
})
function InsertContact() {
    // Lấy nội dung của nhãn
    var hoten = document.getElementById('hoten').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var newId = generateNewId(); // Hàm generateNewId() để tạo một ID mới, bạn cần thay thế bằng cách bạn muốn tạo ID

    set(ref(database, 'contact/' + newId), {
        hoten: hoten,
        email: email,
        message: message
    })
    .then(() => {
    alert("Đã gửi phản hồi thành công!");
        // setTimeout(() => {
        //     window.location.reload();
        // }, 1000);
        resetInput();
    })
    .catch((error) => {
        alert("Đã xảy ra lỗi" + error.message);
    });
}
function generateNewId() {
    // Lấy timestamp hiện tại
    const timestamp = new Date().getTime();
    // Tạo một ID dựa trên timestamp
    const newId = 'contact_' + timestamp; // Bạn có thể thêm tiền tố hoặc hậu tố để phân biệt với các loại ID khác
    return newId;
}


function resetInput() {
    // Lấy tham chiếu đến ô input
    var inputElement1 = document.getElementById("hoten");
    var inputElement2 = document.getElementById("email");
    var inputElement3 = document.getElementById("message")
    // Đặt lại giá trị của ô input về giá trị mặc định hoặc trống
    inputElement1.value = ""; // Đặt về giá trị trống
    inputElement2.value = ""; // Đặt về giá trị mặc định nếu có
    inputElement3.value = "";
}
} else {
    console.log('Cookies không tồn tại hoặc đã bị xoá?!');
  }