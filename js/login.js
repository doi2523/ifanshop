  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref, get, child, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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

    var hoten = document.getElementById("signup-hoten").value;
    var sdt = document.getElementById("signup-sdt").value;
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
        password: password,
        hoten: hoten,
        sdt: sdt,
        last_login: "",
        last_logout: "",
        nameavatar: "",
        urlavatar: "",
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
///Ẩn hiện mật khảu ở ô đăng nhập
document.getElementById('password-toggle-btn').addEventListener('click', function() {
  var passwordInput = document.getElementById('login-password');
  var icon = document.getElementById('password-toggle-icon');

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  } else {
    passwordInput.type = "password";
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  }
});

function SavaToCookies() {
    const user = auth.currentUser;
    const databaseRef = ref(database);
    const userRef = child(databaseRef, "users/" + user.uid);
    get(userRef)
    .then((snapshot) => {
    if (snapshot.exists()) {
        const userData = snapshot.val();

        const email_profile = userData.email;
        const hoten_profile = userData.hoten;
        const password_profile = userData.password;
        const sdt_profile = userData.sdt;
        const username_profile = userData.username;
        const filename_profile = userData.nameavatar;
        const id_profile = user.uid;
        const url_profile = userData.urlavatar //Lấy giá trị của urlavatar
        const last_login = userData.last_login;
        const last_logout = userData.last_logout;


        console.log("Email:", email_profile);
        console.log("Password:", password_profile);
        console.log("Họ tên:", hoten_profile);
        console.log("Số điện thoại:", sdt_profile);
        console.log("Last login:", last_login);
        console.log("Last logout:", last_logout);
        console.log("Tên avatar:", filename_profile);
        console.log("URL avatar:", url_profile);
        console.log("UID:", id_profile);
      console.log("Username:", username_profile);
      
        const values = {
          id_profile,
          email_profile,
          hoten_profile,
          password_profile,
          sdt_profile,
          username_profile,
          filename_profile,
          url_profile
        };
        Object.keys(values).forEach(key => {
          document.cookie = `${key}=${values[key]}`;
        });
    } })  
}
document.getElementById('signin').addEventListener('submit', function(event) {
  event.preventDefault();

  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  // Signed in 
  const auth = getAuth();
  const user = auth.currentUser;

  let last_login_time = new Date();
  let formattedDateTime = last_login_time.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  let updates = {};
  updates['/users/' + user.uid + '/last_login'] = formattedDateTime;
  update(ref(database), updates)
      .then(() => {
          console.log('Đã cập nhật thời gian đăng nhập thành công.');
      })
      .catch((error) => {
          console.error('Lỗi khi cập nhật thời gian đăng nhập:', error);
      });
    
    SavaToCookies();  
  if (email === 'admin@gmail.com' && password === '123456') {
      document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi!';
      loginMessage.style.color = 'green';        // Đợi 2 giây trước khi tải lại trang
      setTimeout(function() {
        window.location.href = 'auth.admin.html';
      }, 3000);
      alert('Chào mừng admin!');      
      }
  else {
    document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi!'; 
    loginMessage.style.color = 'green';       // Đợi 2 giây trước khi tải lại trang
      setTimeout(function() {
        window.location.href = 'auth.index.html';
      }, 3000); 
    alert("Chào mừng '"+user.email +"' đăng nhập")
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


