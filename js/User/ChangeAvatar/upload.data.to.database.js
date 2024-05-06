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

//Function lấy dữ liệu từ cookies
function getCookie(name) {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
}

// Sử dụng hàm để lấy giá trị từ cookies
const uidProfile = getCookie("id_profile");
const filenameProfile = getCookie("filename_profile");
const avatarProfile = getCookie("url_profile");

// Lắng nghe sự kiện khi người dùng nhấn nút submit trong form
document
  .getElementById("update-profile")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn việc tải lại trang
    setTimeout(UpdateThongTin, 2000);
  });

function UpdateThongTin() {
  // Lấy dữ liệu từ localStorage
  const avatarUrl = localStorage.getItem("avatarUrl");
  update(ref(database, "users/" + uidProfile), {
    // nameavatar: filenameProfile,
    urlavatar: avatarUrl,
  })
    .then(() => {
      console.log("ok");
      // Xoá dữ liệu từ localStorage sau khi sử dụng xong
      // try {
      //   localStorage.removeItem("avatarUrl");
      //   console.log("Đã xoá thành công key 'avatarUrl' từ localStorage.");
      //   const avatarUrl = localStorage.getItem("avatarUrl");
      //   console.log("URL ảnh từ localStorage:", avatarUrl);
      // } catch (error) {
      //   console.error("Lỗi khi xoá key 'avatarUrl' từ localStorage:", error);
      // }
        alert("Thông tin đã được cập nhật thành công! Vui lòng tải lại trang");
      setTimeout(() => {
          window.location.reload();
      }, 2000);
    })

    .catch((error) => {
      alert("Đã xảy ra lỗi khi cập nhật thông tin: " + error.message);
    });
}
