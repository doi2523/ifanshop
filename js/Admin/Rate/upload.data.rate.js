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

//Function lấy dữ liệu từ cookies
function getCookie(name) {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
}

// Sử dụng hàm để lấy giá trị từ cookies
const hotenProfile = getCookie("hoten_profile");
const URLProfile = getCookie("url_profile");

document
  .getElementById("sendrate")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    setTimeout(AddSanPham, 2000);
  });

function AddSanPham() {
  var textarea = document.getElementById("txt-form").value;
  const fileInput = document.getElementById("file-form");
  const file = fileInput.files[0];
  // Lấy dữ liệu từ localStorage
  const imageUrl = localStorage.getItem("imageUrl");
  // Thêm dữ liệu mới với key tự động được tạo ra bằng phương thức push()
  const newPostRef = push(ref(database, "Rate"));
  const newPostKey = newPostRef.key;
  set(ref(database, "Rate/" + newPostKey), {
    people: hotenProfile,
    textarea: textarea,
    picture: imageUrl,
    profile: URLProfile,
  })
    .then(() => {
      // Xoá dữ liệu từ localStorage sau khi sử dụng xong
      try {
        localStorage.removeItem("imageUrl");
        console.log("Đã xoá thành công key 'imageUrl' từ localStorage.");
        const imageUrl = localStorage.getItem("imageUrl");
        console.log("URL ảnh từ localStorage:", imageUrl);
      } catch (error) {
        console.error("Lỗi khi xoá key 'imageUrl' từ localStorage:", error);
      }
      console.log("OK");
      alert("Thêm thành công!");
      resetInputs();
    })
    .catch((error) => {
      alert("Đã xảy ra lỗi" + error.message);
    });
}
// Sử dụng hàm resetInputs() khi cần làm mới các ô input
function resetInputs() {
  document.getElementById("txt-form").value = ""; // Làm mới giá trị của ô input 'idsanpham'

  // Làm mới giá trị của ô input chứa file (nếu có)
  const fileInput = document.getElementById("file-form");
  fileInput.value = null;
  // Lấy thẻ <img> cần làm mới
  // const imgElement = document.querySelector(".img-fluid");

  // Tạo một URL mới cho hình ảnh, ví dụ:
  // const newImageUrl = "";

  // // Gán giá trị mới cho thuộc tính src của thẻ <img>
  // imgElement.src = newImageUrl;
}
