// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
  update,
  child,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import {
  getAuth,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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
const user = auth.currentUser;

function UpdateThongtin() {
  var newhoten = document.getElementById("hoten").value;
  var newsdt = document.getElementById("sdt").value;
  var newusername = document.getElementById("username").value;

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const database = getDatabase(app);
  function updateCookieWithValues(newUsername, newHoten, newSdt) {
    // Kiểm tra xem các giá trị mới có tồn tại không
    if (newUsername && newHoten && newSdt) {
      // Cập nhật giá trị của cookie username
      document.cookie = "username_profile=" + newUsername;
      // Cập nhật giá trị của cookie hoten
      document.cookie = "hoten_profile=" + newHoten;
      // Cập nhật giá trị của cookie sdt
      document.cookie = "sdt_profile=" + newSdt;
      console.log("Cập nhật các giá trị thành công!");
      // alert('Tải lên thành công!');
    } else {
      console.error("Không có giá trị mới được cung cấp.");
    }
  }

  // Lấy giá trị mới cho các cookie từ các biến newUsername, newHoten, và newSdt
  var newUsername = newusername;
  var newHoten = newhoten;
  var newSdt = newsdt;

  // Gọi hàm để cập nhật giá trị mới cho các cookie
  updateCookieWithValues(newUsername, newHoten, newSdt);

  update(ref(database, "users/" + uid), {
    username: newusername,
    hoten: newhoten,
    sdt: newsdt,
  })
    .then(() => {
      alert("Thông tin đã được cập nhật thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })

    .catch((error) => {
      alert("Đã xảy ra lỗi khi cập nhật thông tin: " + error.message);
    });
}

document.getElementById("update-profile").addEventListener("submit", function (event) {
    event.preventDefault();
    UpdateThongtin();
    UpdateURL();
  });
function UpdateURL() {
  function getCookie(name) {
    const auth = getAuth();
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  }
  // Sử dụng hàm để lấy giá trị từ cookies
  const uidProfile = getCookie("id_profile");
  const emailProfile = getCookie("email_profile");
  const hotenProfile = getCookie("hoten_profile");
  const passwordProfile = getCookie("password_profile");
  const sdtProfile = getCookie("sdt_profile");
  const usernameProfile = getCookie("username_profile");
  const filenameProfile = getCookie("filename_profile");
  const URLProfile = getCookie("url_profile");
  const user = auth.currentUser;
  const database = getDatabase(app);
  update(ref(database, "users/" + uidProfile), {
    hoten: hotenProfile,
    sdt: sdtProfile,
    username: usernameProfile,
  });
}
