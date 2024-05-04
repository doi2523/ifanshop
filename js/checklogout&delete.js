// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import {
  getDatabase,
  update,
  ref,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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

function deleteAllCookies() {
  //Lấy các biến có trong cookies đang có
  const cookiesToDelete = [
    "id_profile",
    "email_profile",
    "hoten_profile",
    "password_profile",
    "sdt_profile",
    "username_profile",
    "filename_profile",
    "url_profile",
  ];
  // console.log(cookiesToDelete);
  cookiesToDelete.forEach((cookieName) => {
    // Thiết lập thời gian hết hạn của cookie thành thời điểm trước đó
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    console.log(`Đã xóa cookie ${cookieName}`);
  });
}

function deleteAllCookiess() {
  // Tách các cookie thành mảng dựa trên dấu chấm phẩy và khoảng trắng
  const cookiesArray = document.cookie.split("; ");

  // Duyệt qua mảng các cookie và thiết lập thời gian hết hạn của từng cookie
  cookiesArray.forEach((cookie) => {
    // Tách tên của cookie
    const cookieName = cookie.split("=")[0];
    // Thiết lập thời gian hết hạn của cookie thành thời điểm trước đó
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  });
}
function printAllCookies() {
  // Tách các cookie thành mảng dựa trên dấu chấm phẩy và khoảng trắng
  const cookiesArray = document.cookie.split("; ");

  // Duyệt qua mảng các cookie và in ra từng cookie
  cookiesArray.forEach((cookie) => {
    // Tách tên và giá trị của cookie
    const [cookieName, cookieValue] = cookie.split("=");
    // In ra tên và giá trị của cookie
    console.log(`${cookieName}: ${decodeURIComponent(cookieValue)}`);
  });
}

function Logout() {
  signOut(auth)
    .then(() => {
      alert("Đăng xuất thành công!");
      // Sign-out successful.
      // setTimeout(function() {
          window.location.href = 'login.html';
      // }, 2000);
    })
    .catch((error) => {
      // Xử lý lỗi khi đăng xuất
      console.error("Lỗi khi đăng xuất:", error);
    });
}

function AddLastLogout() {
  // Lấy thời gian hiện tại
  let last_logout_time = new Date();
  let formattedDateTime = last_logout_time.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const user = auth.currentUser;
  update(ref(database, "users/" + user.uid), {
    last_logout: formattedDateTime,
  });
    update(ref(database, "users/" + user.uid), {
    userstatus: "offline",
  });

}
document.getElementById("logout").addEventListener("click", function (event) {
  // Ngăn chặn hành động mặc định của nút (nếu có)
  event.preventDefault();
  printAllCookies();
  deleteAllCookies();
  deleteAllCookiess();
  AddLastLogout();
  Logout();
  alert("Bạn đã đăng xuất thành công!");
  // Ví dụ: Redirect hoặc thực hiện các thao tác đăng xuất khác
});

// Tính toán thời gian mỗi ngày trong milliseconds
var oneDayInMillis = 24 * 60 * 60 * 1000;

// Thiết lập setInterval để chạy hàm kiểm tra và đăng xuất mỗi ngày
setInterval(function() {
  deleteAllCookies();
  deleteAllCookiess();
  AddLastLogout();
  Logout();
}, oneDayInMillis); // Kiểm tra mỗi ngày



// Bắt sự kiện trước khi người dùng rời đi
// window.addEventListener("beforeunload", function(event) {
//   // Gọi hàm Logout khi người dùng rời đi
//   printAllCookies();
//   deleteAllCookies();
//   deleteAllCookiess();
//   AddLastLogout();
//   Logout();
// });
