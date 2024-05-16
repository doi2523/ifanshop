// Import the functions you need from the SDKs you need
import {
  initializeApp,
  getApp,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import {
  getDatabase,
  set,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  listAll,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
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

// Lắng nghe sự kiện khi người dùng nhấn nút submit trong form
document
  .getElementById("update-profile")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn việc tải lại trang
    UploadImageAndGetURL();
  });

function UploadImageAndGetURL() {
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0]; // Lấy tệp từ trường input
  if (!file) {
    console.log("Vui lòng chọn một tệp.");
    return;
  }
  let rowCount = 0;
  const storage = getStorage();
  const storageRef = ref(storage, "Avatar/" + file.name);
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Tải ảnh lên thành công!");
    const imageRef = ref(storage, "Avatar/" + file.name);
    getDownloadURL(imageRef)
      .then((url) => {
        // console.log("URL của ảnh:", url);
        // Lưu URL vào localStorage
        localStorage.removeItem("avatarUrl");
        localStorage.setItem("avatarUrl", url);
        //Cập nhật giá trị của tên file trong cookies
        function updateCookieWithurl(url) {
          // Kiểm tra xem url có tồn tại không
          if (url) {
            // Cập nhật giá trị của cookie url_profile thành url
            document.cookie = "url_profile=" + url;
            console.log(url);
            Alert();
            // alert('Tải lên thành công!');
          } else {
            console.error("Không có tên tệp được cung cấp.");
          }
        }
        // Gọi hàm để cập nhật giá trị mới cho url_profile
        updateCookieWithurl(url);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy URL ảnh:", error);
      });
  });
}
function Alert(){
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      // toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "Tải hình ảnh lên thành công!",
    color: "#716add",
  });
}