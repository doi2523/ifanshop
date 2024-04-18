  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, update, ref } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth, signOut, } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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


logout.addEventListener('click', (e) => {
    // Lấy thời gian hiện tại
  let last_logout_time = new Date();
  let formattedDateTime = last_logout_time.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  let updates = {};
  const user = auth.currentUser;
  updates['/users/' + user.uid + '/last_logout'] = formattedDateTime;
  update(ref(database), updates)
      .then(() => {
          console.log('Đã cập nhật thời gian đăng nhập cuối cùng thành công.');
      })
      .catch((error) => {
          console.error('Lỗi khi cập nhật thời gian đăng nhập cuối cùng:', error);
      });

  signOut(auth).then(() => {
  // Sign-out successful.
  alert('Đang đăng xuất, vui lòng đợi!');
  setTimeout(function() {
          window.location.href = 'login.html';
  }, 2000);
  const user = userCredential.user;
  // const lg = new Date();
  //   update(ref(database, 'users/' + user.uid),{
  //       last_logout : lg,
  // })      
}).catch((error) => {
  // An error happened.
});
});