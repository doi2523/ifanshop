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
  setTimeout(UpdateSanPham, 1500);
});

function GetToUpdate() {
  // Lấy dữ liệu từ localStorage
  const idsanpham_sua = localStorage.getItem("idsanpham_sua");
  console.log(idsanpham_sua);

  const databaseRef = ref(database);
  const userRef = child(databaseRef, "sanpham/" + idsanpham_sua);

  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();

      const edit_idsanpham = userData.idsanpham;
      const edit_soluong = userData.soluong;
      const edit_tensp = userData.tensanpham;
      const edit_dungluong = userData.dungluong;
      const edit_giagoc = userData.giagoc;
      const edit_giasale = userData.giasale;
      const edit_url = userData.picture;

      // Đẩy giá trị từ cơ sở dữ liệu vào các ô input
      document.getElementById("idsanpham").value = edit_idsanpham;
      document.getElementById("soluong").value = edit_soluong;
      document.getElementById("tensanpham").value = edit_tensp;
      document.getElementById("dungluong").value = edit_dungluong;
      document.getElementById("giasale").value = edit_giasale;
      document.getElementById("giagoc").value = edit_giagoc;

      // Lấy đối tượng div có id là "showimg"
      const showImgDiv = document.getElementById("showimg");
      // Tạo một thẻ img
      const imgElement = document.createElement("img");
      // Thiết lập thuộc tính src của thẻ img
      imgElement.src = edit_url;
      // Thêm thẻ img vào phần tử div
      showImgDiv.appendChild(imgElement);
      // Xoá idsanpham_sua từ localStorage
      ClearLocal();
    }
  });
}
function ClearLocal() {
  try {
    localStorage.removeItem("idsanpham_sua");
    console.log("Đã xoá thành công key 'idsanpham_sua' từ localStorage.");
  } catch (error) {
    console.error("Lỗi khi xoá key 'idsanpham_sua' từ localStorage:", error);
  }
}
GetToUpdate();
// Lấy đối tượng nút "Huỷ"
var cancelButton = document.getElementById("huy");

// Gắn hàm xử lý sự kiện khi nút được nhấn
cancelButton.addEventListener("click", function () {
  ClearLocal();
  window.location.href = "auth.admin.qlyiphone.html";
});

function UpdateSanPham() {
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

  update(ref(database, "sanpham/" + idsanpham), {
    idsanpham: idsanpham,
    tensanpham: tensanpham,
    soluong: soluong,
    dungluong: dungluong,
    giagoc: giagoc,
    giasale: giasale,
    file: "0",
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
      // console.log("OK");
      AlertSuccess(tensanpham);
      // alert("Cập nhật sản phẩm '" + tensanpham + "' thành công!");
      setTimeout(function() {
        resetInputs();
        window.location.href = "auth.admin.qlyiphone.html";
      }, 3000); // 3000 milliseconds = 3 seconds
      
    })
    .catch((error) => {
      alert("Đã xảy ra lỗi" + error.message);
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
    title: "Cập nhật sản phẩm '" + tensanpham + "' thành công!",
    color: "#716add",
  });
}