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

document.getElementById("file-input").addEventListener("change", function () {
  var fileInput = document.getElementById("file-input");
  var loadingBar = document.getElementById("loading-bar");
  var loadingProgress = document.getElementById("loading-progress");
  var fileNameLabel = document.getElementById("file-name");

  // Lấy tên của tập tin đã chọn
  var fileName = fileInput.files[0].name;
  // Hiển thị tên tập tin
  fileNameLabel.innerText = fileName;
  fileNameLabel.style.display = "block";

  // Hiển thị thanh loading khi bắt đầu tải
  loadingBar.style.display = "block";

  // Tạo một FormData để tải file
  var formData = new FormData();
  formData.append("file", fileInput.files[0]);

  // Xử lý việc tải file ở đây (ví dụ: sử dụng AJAX hoặc Fetch API)
  // Ví dụ: mô phỏng việc tải file trong 5 giây
  var progress = 0;
  var interval = setInterval(function () {
    progress += 10;
    loadingProgress.style.width = progress + "%";
    loadingProgress.innerHTML = progress + "%";

    // Lấy tham chiếu đến phần tử <img> để hiển thị ảnh xem trước
    var previewImage = document.getElementById("preview");
    if (progress >= 100) {
      clearInterval(interval);
      // Giữ lại thanh loading ở trạng thái 100%
      setTimeout(function () {
        loadingProgress.style.width = "100%";
        loadingProgress.innerHTML = "100%";
        // Hiển thị thông báo thành công
        // Ẩn thanh loading
        // loadingBar.style.display = 'none';

        // Lấy URL của ảnh đã tải lên
        var imageURL = URL.createObjectURL(fileInput.files[0]);

        // Gán URL của ảnh vào thuộc tính src của phần tử <img> để hiển thị ảnh xem trước
        previewImage.src = imageURL;

        // Lấy tham chiếu đến nút "label" trong HTML
        const nameLabel = document.getElementById("name-avatar");

        // Function để cập nhật giao diện người dùng với thông tin mới
        function updateLabel(newName) {
          nameLabel.textContent = newName;
        }
      }, 500);
    }
  }, 500);
});
