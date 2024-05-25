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
  
  document.getElementById("formdanhmuc").addEventListener("submit", function (event) {
    event.preventDefault();
    AddDanhMuc();
  });
  
  function AddDanhMuc() {
    var iddanhmuc = document.getElementById("categoryId").value;
    var tendanhmuc = document.getElementById("categoryName").value;
  
    // Tham chiếu đến nút con trong cơ sở dữ liệu
    var danhMucRef = ref(database, "Danhmuc/" + iddanhmuc);
  
    // Kiểm tra xem danh mục đã tồn tại hay chưa
    get(danhMucRef).then((snapshot) => {
      if (snapshot.exists()) {
        // Nếu danh mục đã tồn tại, hiển thị thông báo lỗi
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Danh mục đã tồn tại!",
        });
      } else {
        // Nếu danh mục chưa tồn tại, thêm mới danh mục vào cơ sở dữ liệu
        set(danhMucRef, {
          iddanhmuc: iddanhmuc,
          Tendanhmuc: tendanhmuc,
        })
        .then(() => {
          // Hiển thị thông báo thành công
          AlertSuccess(tendanhmuc);
          resetInputs();
        })
        .catch((error) => {
          // Hiển thị thông báo lỗi
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Đã xảy ra lỗi: " + error.message,
          });
        });
      }
    }).catch((error) => {
      // Hiển thị thông báo lỗi nếu không thể kiểm tra sự tồn tại của danh mục
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Đã xảy ra lỗi khi kiểm tra danh mục: " + error.message,
      });
    });
  }
  
  function resetInputs(){
    document.getElementById("categoryId").value = "";
    document.getElementById("categoryName").value = "";
  }
  function AlertSuccess(tendanhmuc){
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
      title: "Thêm danh mục '" + tendanhmuc + "' thành công!",
      color: "#716add",
    });
  }  