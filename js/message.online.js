  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
  import { getDatabase, set, ref,push, onValue, get, child, update, onChildAdded } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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

  // Đọc giá trị từ cookie
  const userInfoStringFromCookie = Cookies.get('userInfo');
  // Chuyển chuỗi JSON thành đối tượng JavaScript
  if (userInfoStringFromCookie) {
    const userInfoFromCookie = JSON.parse(userInfoStringFromCookie);

    const uidProfile = userInfoFromCookie.id_profile; // ID
    const emailProfile = userInfoFromCookie.email_profile; //Email
    const hotenProfile = userInfoFromCookie.hoten_profile; //Họ tên
    const passwordProfile = userInfoFromCookie.password_profile; //Password
    const sdtProfile = userInfoFromCookie.sdt_profile; //Số điện thoại
    const usernameProfile = userInfoFromCookie.username_profile; //Username
    const URLProfile = userInfoFromCookie.url_profile; //Link ảnh
    const RoleProfile = userInfoFromCookie.role; //Vai trò người dùng
    const Status = userInfoFromCookie.userstatus; //Trạng thái

var fullname = document.getElementById("fullname"); // Lấy thẻ div có id là "fullname"
if (fullname) {
    // Kiểm tra xem fullname có tồn tại không trước khi gán giá trị cho thuộc tính 'textContent'
    fullname.textContent = userInfoFromCookie.hoten_profile;
}

function SetAvatar() {
var userAvatar = document.getElementById("user-avatar");
// Thay đổi thuộc tính src của thẻ <img> bằng URL mới
userAvatar.src = 'https://firebasestorage.googleapis.com/v0/b/user-inifanshop.appspot.com/o/Avatar%2FIMG_2017.jpg?alt=media&token=0fa4e8cf-a6bf-4faa-a07b-86fbdedef609';
}
SetAvatar();

//Sụe kiện khi người dùng bấm gửi tin nhắn
document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var message = document.getElementById("message-input").value;
    console.log(message);
    const database = getDatabase(app);
    const messagesRef = ref(database, 'messages');
    const userMessagesRef = child(messagesRef, uidProfile); // Tạo nút con cho từng người dùng
    const newMessageRef = push(userMessagesRef); // Tạo một khóa mới trong nút của người dùng
    const id = newMessageRef.key; // Lấy khóa mới được tạo
    let last_login_time = new Date();
    let formattedDateTime = last_login_time.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
    set(newMessageRef, {
        name: hotenProfile,
        message: message,
        time: formattedDateTime,
        userid: uidProfile,
        url: URLProfile,
        role: RoleProfile,
    }).then(() => {
        AlertSuccess();
        document.getElementById("message-input").value = "";
    }).catch((error) => {
        console.error('Error writing message to database: ', error);
    });
});


//Hàm hiển thị tin nhắn 
function GetMess() {
    const database = getDatabase();
    const databaseRef = ref(database, "messages/" + uidProfile);
    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(databaseRef, (snapshot) => {
        const message = snapshot.val();
        displayMessage(message);
    }, (error) => {
        console.error("Error getting messages: ", error);
    });
}

function displayMessage(message) {
    const messages = document.getElementById('hienthimessage');
    const div = document.createElement('div');

          // Tạo phần tử hiển thị thời gian
          const timeDiv = document.createElement('div');
          timeDiv.classList.add('message-time');
          timeDiv.textContent = message.time;
          messages.appendChild(timeDiv);
          
    div.classList.add('chat-message');
    //Điều kiện hiển thị nếu role là user thì sẽ hiển thị bên phải
    if (message.role === 'user') {
      div.classList.add('sent');
      div.innerHTML = `
        <div class="message-content">${message.message}</div>
        <img src="${message.url}" alt="User Avatar" class="avatar-icon">
      `;
    } //Nếu là role khác sẽ hiển thị bên trái
    else {
      div.classList.add('received');
      div.innerHTML = `
        <img src="${message.url}" alt="User Avatar" class="avatar-icon">
        <div class="message-content">${message.message}</div>

      `;
    }
    messages.appendChild(div);
}
GetMess();

} else {
    console.log('Cookies không tồn tại hoặc đã bị xoá?!');
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
    title: "Gửi tin nhắn thành công!",
    color: "#716add",
  });
}
document.addEventListener("DOMContentLoaded", function() {
  var iconClickBtn = document.getElementById("iconclick");
  var boxChat = document.getElementById("boxchat");
  var closeBtn = document.getElementById("closebuttonchat");

  iconClickBtn.addEventListener("click", function() {
    iconClickBtn.style.display = "none";
    boxChat.classList.remove("hide");
  });

  closeBtn.addEventListener("click", function() {
    iconClickBtn.style.display = "block";
    boxChat.classList.add("hide");
  });

  document.addEventListener("mousedown", function(event) {
    if (!boxChat.contains(event.target) && event.target !== iconClickBtn) {
      iconClickBtn.style.display = "block";
      boxChat.classList.add("hide");
    }
  });
});