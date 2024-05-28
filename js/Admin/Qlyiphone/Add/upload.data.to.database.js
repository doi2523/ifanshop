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

document.getElementById("addsp").addEventListener("submit", function (event) {
  event.preventDefault();
  setTimeout(AddSanPham, 2000);
});

function AddSanPham() {
  var idsanpham = document.getElementById("idsanpham").value;
  var soluong = document.getElementById("soluong").value;
  var tensanpham = document.getElementById("tensanpham").value;
  var dungluong = document.getElementById("dungluong").value;
  var giasale = document.getElementById("giasale").value;
  var giagoc = document.getElementById("giagoc").value;
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];
  // Lấy dữ liệu từ localStorage
  const imageUrl = localStorage.getItem("imageUrl");

  // Tham chiếu đến sản phẩm trong cơ sở dữ liệu
  var sanPhamRef = ref(database, "sanpham/" + idsanpham);

  // Kiểm tra xem sản phẩm đã tồn tại hay chưa
  get(sanPhamRef).then((snapshot) => {
    if (snapshot.exists()) {
      // Nếu sản phẩm đã tồn tại, hiển thị thông báo lỗi
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sản phẩm đã tồn tại!",
      });
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới sản phẩm vào cơ sở dữ liệu
      set(sanPhamRef, {
        idsanpham: idsanpham,
        tensanpham: tensanpham,
        soluong: soluong,
        dungluong: dungluong,
        giagoc: giagoc,
        giasale: giasale,
        picture: imageUrl,
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
        AlertSuccess(tensanpham);
        resetInputs();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Đã xảy ra lỗi: " + error.message,
        });
      });
    }
  }).catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Đã xảy ra lỗi khi kiểm tra sản phẩm: " + error.message,
    });
  });
}
// Sử dụng hàm resetInputs() khi cần làm mới các ô input
function resetInputs() {
  document.getElementById("idsanpham").value = ""; // Làm mới giá trị của ô input 'idsanpham'
  document.getElementById("soluong").value = ""; // Làm mới giá trị của ô input 'soluong'
  document.getElementById("tensanpham").value = ""; // Làm mới giá trị của ô input 'tensanpham'
  document.getElementById("dungluong").value = ""; // Làm mới giá trị của ô input 'dungluong'
  document.getElementById("giasale").value = ""; // Làm mới giá trị của ô input 'giasale'
  document.getElementById("giagoc").value = ""; // Làm mới giá trị của ô input 'giagoc'

  // Làm mới giá trị của ô input chứa file (nếu có)
  const fileInput = document.getElementById("file");
  fileInput.value = null;
  // Lấy thẻ <img> cần làm mới
  const imgElement = document.querySelector(".img-fluid");

  // Tạo một URL mới cho hình ảnh, ví dụ:
  const newImageUrl = "";

  // Gán giá trị mới cho thuộc tính src của thẻ <img>
  imgElement.src = newImageUrl;
}
function AlertSuccess(tensanpham){
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
    title: "Thêm sản phẩm '" + tensanpham + "' thành công!",
    color: "#716add",
  });
}