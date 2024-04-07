  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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


document.getElementById('signup').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById("signup-username").value;
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    set(ref(database, 'users/' + user.uid),{
        username : username,
        email: email,
        password: password
    })
    alert('Đăng ký thành công!');
    document.getElementById('signupMessage').innerText = 'Đăng ký thành công! Vui lòng đăng nhập!';
    signupMessage.style.color = 'green';
    setTimeout(function() {
      window.location.href = 'login.html';
            // window.location.reload();
        }, 2000);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert('Đăng ký thất bại!');
    document.getElementById('signupMessage').innerText = 'Email hoặc username đã được sử dụng!';
    signupMessage.style.color = 'red';
  });
});
document.getElementById('signin').addEventListener('submit', function(event) {
  event.preventDefault();

  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  // Signed in 
  const user = auth.currentUser;
  const dt = new Date();
  update(ref(database, 'users/' + user.uid),{
      last_login : dt,
  })

  if (email === 'admin@gmail.com' && password === '123456') {
      document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi!';
      loginMessage.style.color = 'green';        // Đợi 2 giây trước khi tải lại trang
      setTimeout(function() {
        window.location.href = 'auth.admin.html';
      }, 2000);
      //alert('Chào mừng admin!');      
      }
  else {
    document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi!'; 
    loginMessage.style.color = 'green';       // Đợi 2 giây trước khi tải lại trang
      setTimeout(function() {
        window.location.href = 'auth.index.html';
      }, 2000); 
    //alert('Đăng nhập thành công!');
    }
  
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  //alert('Đăng nhập thất bại!');
  document.getElementById('loginMessage').innerText = 'Tên người dùng hoặc mật khẩu không đúng!';
  loginMessage.style.color = 'red';
});

let ForgotPasswd = () =>{
  sendPass
}
});


