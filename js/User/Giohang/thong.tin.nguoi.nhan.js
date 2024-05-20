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
    onChildAdded,
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
      const uidProfile = getCookie("id_profile");
function GetThongTin(){
  const MadonhangEdit = localStorage.getItem('MadonhangEdit');
  
  const emailInput = document.getElementById('emailInput').value;
  const tenInput = document.getElementById('tenInput').value;
  const sdtInput = document.getElementById('sdtInput').value;
  const diaChiInput = document.getElementById('diaChiInput').value ;

  update(ref(database, "Donhang/" + uidProfile + "/"+ MadonhangEdit), {
    hoten: tenInput,
    mail: emailInput,
    diachi: diaChiInput,
    sdt: sdtInput
  })
  .then(() => {
    AlertSuccess();
    try {
      localStorage.removeItem("tenNguoiNhan");
      localStorage.removeItem("sdtNguoiNhan");
      localStorage.removeItem("emailNguoiNhan");
      localStorage.removeItem("diaChiNguoiNhan");
    } catch (error) {
      console.error("Lỗi khi xoá từ localStorage:", error);
    }
    
  })
  .catch((error) => {
    alert("Đã xảy ra lỗi" + error.message);
  });
}

function GetData(){
  // Lấy thông tin từ localStorage
  const MadonhangEdit = localStorage.getItem('MadonhangEdit');
  const tenNguoiNhan = localStorage.getItem('tenNguoiNhan');
  const sdtNguoiNhan = localStorage.getItem('sdtNguoiNhan');
  const emailNguoiNhan = localStorage.getItem('emailNguoiNhan');
  const diaChiNguoiNhan = localStorage.getItem('diaChiNguoiNhan');
  // Đẩy thông tin vào các ô input
  document.getElementById('span-madonhang').textContent = MadonhangEdit;
  document.getElementById('emailInput').value = emailNguoiNhan;
  document.getElementById('tenInput').value = tenNguoiNhan;
  document.getElementById('sdtInput').value = sdtNguoiNhan;
  document.getElementById('diaChiInput').value = diaChiNguoiNhan;
}
GetData();
document.getElementById("thaydoithongtin").addEventListener("submit", function (event) {
  event.preventDefault();
  GetThongTin()
});
function AlertSuccess(){
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
    title: "Cập nhật thông tin thành công!",
    color: "#716add",
  });
}