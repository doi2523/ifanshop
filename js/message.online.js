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


function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

// Sử dụng hàm để lấy giá trị từ cookies
    // Sử dụng hàm để lấy giá trị từ cookies
    const uidProfile = getCookie("id_profile");
    const emailProfile = getCookie("email_profile");
    const hotenProfile = getCookie("hoten_profile");
    const passwordProfile = getCookie("password_profile");
    const sdtProfile = getCookie("sdt_profile");
    const usernameProfile = getCookie("username_profile");
    const filenameProfile = getCookie("filename_profile");
    const URLProfile = getCookie("url_profile");

    // Sử dụng các giá trị đã lấy được từ cookies
    // console.log(emailProfile);
    // console.log(hotenProfile);
    // console.log(passwordProfile);
    // console.log(sdtProfile);
    // console.log(usernameProfile);
    // console.log(filenameProfile);

var fullname = document.getElementById("fullname"); // Lấy thẻ div có id là "fullname"
if (fullname) {
    // Kiểm tra xem fullname có tồn tại không trước khi gán giá trị cho thuộc tính 'textContent'
    fullname.textContent = hotenProfile;
}

function SetAvatar() {
var userAvatar = document.getElementById('user-avatar');

// Thay đổi thuộc tính src của thẻ <img> bằng URL mới
userAvatar.src = URLProfile;
}
SetAvatar();

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
        url: URLProfile
    }).then(() => {
        // alert('Đã gửi tin nhắn thành công!');
        document.getElementById("message-input").value = "";
    }).catch((error) => {
        console.error('Error writing message to database: ', error);
    });
});



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
    const messages = document.getElementById('textchat');
    const li = document.createElement('li');
    li.innerHTML = `
    <fieldset class="border p-2 mx-2 my-2">
        <legend class="w-auto legend-small"><img src="${message.url}" alt="User Image"
                style="width: 40px; height: 40px; border-radius: 100%;"> ${message.name} </legend>
        ${message.message}<br><br>
        <p style="margin-bottom: -18px; float: right; background-color: #fff;">${message.time}</p>
    </fieldset>
    <hr>
    `
    messages.appendChild(li);
}

GetMess();