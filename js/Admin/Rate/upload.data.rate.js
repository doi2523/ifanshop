// Import the functions you need from the SDKs you need
import {
  initializeApp,
  getApp,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  onValue,
  get,
  child,
  remove,
  update,
  push,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnZzlFSm-61oaNvO2TTJyef2PMc6iU8DY",
  authDomain: "user-inifanshop.firebaseapp.com",
  databaseURL:
    "https://user-inifanshop-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "user-inifanshop",
  storageBucket: "user-inifanshop.appspot.com",
  messagingSenderId: "104690936940",
  appId: "1:104690936940:web:5398fbb0edae0c7a76bc49",
  measurementId: "G-NLBDR28748",
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

document.getElementById("sendrate").addEventListener("submit", function (event) {
    event.preventDefault();
    setTimeout(AddRate, 2000);
  });

function AddRate() {
  var textarea = document.getElementById("txt-form").value;
  const fileInput = document.getElementById("file-form");
  const file = fileInput.files[0];
  // Lấy dữ liệu từ localStorage
  const imageUrl = localStorage.getItem("imageUrl");
  const ratingValue = localStorage.getItem("ratingValue");
  // Thêm dữ liệu mới với key tự động được tạo ra bằng phương thức push()
  const newPostRef = push(ref(database, "Rate"));
  const newPostKey = newPostRef.key;
  set(ref(database, "Rate/" + newPostKey), {
    people: hotenProfile,
    textarea: textarea,
    picture: imageUrl,
    profile: URLProfile,
    star: ratingValue
  })
    .then(() => {
      // Xoá dữ liệu từ localStorage sau khi sử dụng xong
      try {
        localStorage.removeItem("imageUrl");
        localStorage.removeItem("ratingValue");
        console.log("Đã xoá thành công key 'imageUrl' từ localStorage.");
        const imageUrl = localStorage.getItem("imageUrl");
        console.log("URL ảnh từ localStorage:", imageUrl);
      } catch (error) {
        console.error("Lỗi khi xoá key 'imageUrl' từ localStorage:", error);
      }
      Swal.fire({
        title: "Success!",
        text: "Đánh giá thành công.",
        icon: "success"
      });
      resetInputs();
    })
    .catch((error) => {
      alert("Đã xảy ra lỗi" + error.message);
    });
}
// Sử dụng hàm resetInputs() khi cần làm mới các ô input
function resetInputs() {
  document.getElementById("txt-form").value = ""; // Làm mới giá trị của ô input 'idRate'

  // Làm mới giá trị của ô input chứa file (nếu có)
  const fileInput = document.getElementById("file-form");
  fileInput.value = null;
}
} else {
  console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}
