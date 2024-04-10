  // Import the functions you need from the SDKs you need
  import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCnZzlFSm-61oaNvO2TTJyef2PMc6iU8DY",
    authDomain: "user-inifanshop.firebaseapp.com",
    databaseURL: "https://user-inifanshop-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "user-inifanshop",
    storageBucket: "user-inifanshop.appspot.com",
    messagingSenderId: "104690936940",
    appId: "1:104690936940:web:5398fbb0edae0c7a76bc49",
    measurementId: "G-NLBDR28748"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  const auth = getAuth();
  const firebaseApp = getApp();

  document.getElementById('addsp').addEventListener('submit', function(event) {
    event.preventDefault();
    AddSanPham();
  })

  function AddSanPham(){
    var tensanpham = document.getElementById('tensanpham').value;
    var dungluong = document.getElementById('dungluong').value;
    var giasale = document.getElementById('giasale').value;
    var giagoc = document.getElementById('giagoc').value;
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    console.log(tensanpham)
    console.log(dungluong)
    console.log(giasale)
    console.log(giagoc)
    console.log(file.name)

    set(ref(database, 'sanpham/' + tensanpham),{
        tensanpham: tensanpham,
        dungluong: dungluong,
        giagoc: giagoc,
        giasale: giasale,
        file: file.name
    })
    .then(() => {
        alert("cập nhật thành công!");
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    })
    .catch((error) => {
        alert("Đã xảy ra lỗi" + error.message);
    });
    
}