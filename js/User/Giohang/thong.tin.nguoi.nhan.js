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
  // Lắng nghe sự kiện click trên nút "Tiến hành đặt hàng"
document.getElementById("editthongtin").addEventListener("click", function() {
    // Ngăn form khỏi tải lại trang
    event.preventDefault();
    // Lấy giá trị từ các span
    const tenNguoiNhan = document.getElementById("tennguoinhan").textContent;
    const sdtNguoiNhan = document.getElementById("sdtnguoinhan").textContent;
    const emailNguoiNhan = document.getElementById("emailnguoinhan").textContent;
    const diaChiNguoiNhan = document.getElementById("diachinguoinhan").textContent;

    // Lưu giá trị vào localStorage
    localStorage.setItem('tenNguoiNhan', tenNguoiNhan);
    localStorage.setItem('sdtNguoiNhan', sdtNguoiNhan);
    localStorage.setItem('emailNguoiNhan', emailNguoiNhan);
    localStorage.setItem('diaChiNguoiNhan', diaChiNguoiNhan);
    AlertSuccess();
    setTimeout(function() {
      window.location.href = "auth.suathongtin.html";
  }, 3000); // 3000 milliseconds = 3 giây
})
function GetThongTin(){
  // Lấy thông tin từ localStorage
  const tenNguoiNhan = localStorage.getItem('tenNguoiNhan');
  const sdtNguoiNhan = localStorage.getItem('sdtNguoiNhan');
  const emailNguoiNhan = localStorage.getItem('emailNguoiNhan');
  const diaChiNguoiNhan = localStorage.getItem('diaChiNguoiNhan');

  // Đẩy thông tin vào các ô input
  document.getElementById('emailInput').value = emailNguoiNhan;
  document.getElementById('tenInput').value = tenNguoiNhan;
  document.getElementById('sdtInput').value = sdtNguoiNhan;
  document.getElementById('diaChiInput').value = diaChiNguoiNhan;
}
document.addEventListener("DOMContentLoaded", function() {
  // Gọi hàm GetThongTin() khi trang đã tải hoàn chỉnh
  GetThongTin();
});

  function GetData(){
    const databaseRef = ref(database);
    const userRef = child(databaseRef, "Donhang/" + uidProfile);
    get(userRef)
    .then((snapshot) => {
    if (snapshot.exists()) {
        const userData = snapshot.val();

        const ten_profile = userData.hoten;
        const sdt_profile = userData.sdt;
        const diachi_profile = userData.diachi;

        const Ten = document.getElementById("tennguoinhan");
        const Sdt = document.getElementById("sdtnguoinhan");
        const Diachi = document.getElementById("diachinguoinhan");

        Ten.textContent = ten_profile;
        Sdt.textContent = sdt_profile;
        Diachi.textContent = diachi_profile;
    }
})
}

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
    title: "Người dùng bấm sửa, chờ chuyển trang!",
    color: "#716add",
  });
}