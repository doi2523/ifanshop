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


var hoten_profile; // Định nghĩa biến hoten_profile ở phạm vi toàn cục để có thể truy cập từ bên ngoài hàm GetName()
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

// Sử dụng hàm để lấy giá trị từ cookies
const uidProfile = getCookie("uid_user")
const emailProfile = getCookie("email");
const hotenProfile = getCookie("hoten");
const passwordProfile = getCookie("password");
const sdtProfile = getCookie("sdt");
const usernameProfile = getCookie("username");
const filenameProfile = getCookie("filename");
const URLProfile = getCookie("url");

// Sử dụng các giá trị đã lấy được từ cookies
console.log(emailProfile);
console.log(hotenProfile);
console.log(passwordProfile);
console.log(sdtProfile);
console.log(usernameProfile);
console.log(filenameProfile);
var fullname = document.getElementById("fullname"); // Lấy thẻ div có id là "fullname"
if (fullname) {
    // Kiểm tra xem fullname có tồn tại không trước khi gán giá trị cho thuộc tính 'textContent'
    fullname.textContent = hotenProfile;
}


document.getElementById('message-form-everyone').addEventListener('submit', function(event) {
    event.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    var message = document.getElementById("message-input-everyone").value; // Sửa đổi ở đây
    console.log(message);
    var name = hotenProfile; // Sử dụng giá trị hoten_profile ở đây
    const database = getDatabase(app);
    const messagesRef = ref(database, 'messageeveryone');
    const newMessageRef = push(messagesRef); // Tạo một khóa mới trong nút "messages"
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
        name: name,
        message: message,
        time: formattedDateTime,
        url: URLProfile,
        userid: uid
    }).then(() => {
        alert('Đã gửi tin nhắn thành công!');
        document.getElementById("message-input").value = ""; // Sửa đổi ở đây
    }).catch((error) => {
        console.error('Error writing message to database: ', error);
    });
});


function GetMess() {
    const database = getDatabase();
    const databaseRef = ref(database, "messageeveryone");

    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(databaseRef, (snapshot) => {
        const message = snapshot.val();
        displayMessage(message);
    }, (error) => {
        console.error("Error getting messageeveryone: ", error);
    });
}

function displayMessage(message) {
    const messages = document.getElementById('textchat-everyone');
    const li = document.createElement('li');
    li.innerHTML = `<img src="${message.url}" alt="User Image" style="width: 50px; height: 50px; border-radius: 100%;"> ${message.name}: ${message.message} - ${message.time}`;
    messages.appendChild(li);
}

GetMess();