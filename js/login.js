// document.getElementById('formm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Ngăn chặn hành vi mặc định của form

//     // Lấy giá trị người dùng nhập vào
//     var username = document.getElementById('login-email').value;
//     var password = document.getElementById('login-password').value;

//     // Kiểm tra nếu username và password là 'admin' và '12345'
//     if (username === 'admin' && password === '12345') {
//         // Nếu đúng, chuyển hướng sang trang HTML khác
//         document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi.';
//         // alert('Đăng nhập thành công! Vui lòng đợi.');
//         setTimeout(function() {
//             window.location.href = 'admin.html';
//         }, 2000); // 2000 milliseconds = 2 giây
//         errorMessage.style.color = 'green';
//     } else {
//         // Nếu sai, hiển thị thông báo lỗi
//         document.getElementById('loginMessage').innerText = 'Tên người dùng hoặc mật khẩu không đúng.';
//         alert('Tên người dùng hoặc mật khẩu không đúng.');
//         errorMessage.style.color = 'red';
//         // Đặt lại form để người dùng có thể nhập lại
//         document.getElementById('formm').reset();
//     }

//     // Xóa dữ liệu trong URL
//     window.history.replaceState({}, document.title, window.location.pathname);
// });

// document.getElementById('formm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Ngăn chặn hành vi mặc định của form

//     // Lấy giá trị người dùng nhập vào
//     var username = document.getElementById('login-email').value;
//     var password = document.getElementById('login-password').value;

//     // Kiểm tra nếu username và password là 'admin' và '12345'
//     if (username === 'admin' && password === '12345') {
//         // Nếu đúng, chuyển hướng sang trang HTML khác
//         window.location.href = 'another_page.html';
//     } else {
//         // Nếu sai, hiển thị thông báo lỗi
//         document.getElementById('loginMessage').innerText = 'Tên người dùng hoặc mật khẩu không đúng.';
//         // Đặt lại form để người dùng có thể nhập lại
//         document.getElementById('formm').reset();
//     }
// });


// document.getElementById('signup').addEventListener('submit', function(event) {
//     event.preventDefault(); // Ngăn chặn hành vi mặc định của form

//     // Lấy giá trị người dùng nhập vào
//         var username = document.getElementById("signup-username").value;
//         var email = document.getElementById("signup-email").value;
//         var password = document.getElementById("signup-password").value;

//         var formData = {
//             username: username,
//             email: email,
//             password: password
//         };

//             // Lấy danh sách người dùng từ Local Storage (nếu có)
//             var userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];

//             // Thêm người dùng mới vào danh sách
//             userList.push({ username: username, email: email, password: password });

//             // Lưu danh sách người dùng vào Local Storage
//             localStorage.setItem('userList', JSON.stringify(userList));

//             // Hiển thị thông báo đăng ký thành công (có thể thay đổi theo ý của bạn)
//             alert('Đăng ký thành công!');

//         // Reload trang
//         document.getElementById('signupMessage').innerText = 'Đăng ký thành công! Vui lòng đăng nhập!';        // Đợi 2 giây trước khi tải lại trang
//         setTimeout(function() {
//             window.location.reload();
//         }, 2000);

//         console.log("Username:", formData.username);
//         console.log("Email:", formData.email);
//         console.log("Password:", formData.password);

//         window.history.replaceState({}, document.title, window.location.pathname);

//     // Xóa dữ liệu trong URL
//     window.history.replaceState({}, document.title, window.location.pathname);
// });




// // Lấy danh sách người dùng từ Local Storage
// var userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];

// Hàm xử lý sự kiện đăng nhập
// document.getElementById('formm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Ngăn chặn hành vi mặc định của form
//     var username = document.getElementById("login-email").value;
//     var password = document.getElementById("login-password").value;
//     var found = false;
//     // Duyệt qua danh sách người dùng để kiểm tra thông tin đăng nhập
//     // userList.forEach(function(user) {
//     //     if (username === user.username && password === user.password) {
//     //         found = true;
//     //         return;
//     //     }
//     // });
//     if (found) {
//         document.getElementById('loginSuccessMessage').style.display = 'block';
//         document.getElementById('loginMessage').innerText = ''; // Xóa thông báo lỗi nếu có
//         // Chuyển đến trang thành công sau 2 giây
//         if (username === 'admin' && password === '12345') {
//             // Nếu đúng, chuyển hướng sang trang HTML khác
//             document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi.';
//             alert('Đăng nhập thành công! Vui lòng đợi.');
//             loginMessage.style.color = 'green';
//             window.location.href = "admin.html";
//             setTimeout(function() {
//                 window.location.href = 'admin.html';
//             }, 2000); // 2000 milliseconds = 2 giây
//             errorMessage.style.color = 'green';
//         }
//         setTimeout(function() {
//             window.location.href = "index.html"; // Đổi thành đường dẫn trang thành công của bạn
//         }, 2000);
//     } else {
//         document.getElementById('loginSuccessMessage').style.display = 'none';
//         document.getElementById('loginMessage').innerText = 'Tên người dùng hoặc mật khẩu không đúng.';
//         loginMessage.style.color = 'red';
//         var reset_all = document.getElementById('formm');
//         reset_all.reset();
//     }
//         // // Kiểm tra nếu username và password là 'admin' và '12345'
//         // if (username === 'admin' && password === '12345') {
//         //     // Nếu đúng, chuyển hướng sang trang HTML khác
//         //     document.getElementById('loginMessage').innerText = 'Đăng nhập thành công! Vui lòng đợi.';
//         //     alert('Đăng nhập thành công! Vui lòng đợi.');
//         //     loginMessage.style.color = 'green';
//         //     window.location.href = "admin.html";
//         //     setTimeout(function() {
//         //         window.location.href = 'admin.html';
//         //     }, 2000); // 2000 milliseconds = 2 giây
//         //     errorMessage.style.color = 'green';
//         // } else { 
//         // Xóa thông báo lỗi nếu có
//         //     // Nếu sai, hiển thị thông báo lỗi
//         //     document.getElementById('loginMessage').innerText = 'Tên người dùng hoặc mật khẩu không đúng.';
//         //     alert('Tên người dùng hoặc mật khẩu không đúng.');
//         //     errorMessage.style.color = 'red';
//         //     // Đặt lại form để người dùng có thể nhập lại
//         //     document.getElementById('formm').reset();
// });


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
        email: email
    })
    alert('thanh cong');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert('errorMessage');
  });
});
document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const dt = new Date();
    update(ref(database, 'users/' + user.uid),{
        last_login : dt,
    })
    alert('Đăng nhập thành công!');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('Đăng nhập thất bại!');
  });
});


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert('Đăng ký thất bại!');
  });
});


document.getElementById('sign-in').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const dt = new Date();
    update(ref(database, 'users/' + user.uid),{
        last_login : dt,
    })
    alert('Đăng nhập thành công!');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('Đăng nhập thất bại!');
  });
});
