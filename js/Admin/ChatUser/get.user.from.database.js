// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  child,
  onValue,
  get,
  onChildAdded,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import {
  getAuth,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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

var userList = document.getElementById("userList");
function AddItemToList(uid, hoten, urlavatar, userstatus) {
  // Tạo một hàng mới trong bảng
  let row = document.createElement("tr");
  // Tạo một ô cho hình ảnh
  let imgCell = document.createElement("td");
  imgCell.innerHTML = `<img class="image-avt" src="${urlavatar}" alt=""><br>${hoten}`;
  // Tạo một ô cho UID và Họ tên
  let infoCell = document.createElement("td");
  let statusDotClass =
    userstatus === "online" ? "dot dot-green" : "dot dot-gray";
  infoCell.innerHTML = `${userstatus} <span class="${statusDotClass}"></span>`;
  // Tạo một ô cho nút "Chat"
  let chatCell = document.createElement("td");
  let chatButton = document.createElement("button");
  chatButton.textContent = "Chat";
  chatButton.classList.add("btn", "btn-primary", "btn-sm");
  chatButton.addEventListener("click", function () {
    // Xóa nội dung của phần tử chatInfo và textchat trước khi thêm mới
    clearChatInfo();
    clearTextChat();
    DeleleData();
    // Xử lý khi nút "Chat" được nhấn
    // Lấy thông tin hình ảnh và tên người dùng
    let imageSrc = urlavatar;
    let userName = hoten;
    let Satus = userstatus;
    let userid = uid;

    // Tạo HTML cho hình ảnh và tên người dùng
    let chatInfoHTML = `<img class="image-avt" src="${imageSrc}" alt="${userName}"> ${userName} [${userstatus}]`;

    // In hình ảnh và tên người dùng ra div chatInfo
    document.getElementById("chatInfo").innerHTML = chatInfoHTML;
    //Luu vao Local
    localStorage.setItem("UserID", userid);
    GetMess(userid);
  });
  chatCell.appendChild(chatButton);
  // Thêm các ô vào hàng
  row.appendChild(imgCell);
  row.appendChild(infoCell);
  row.appendChild(chatCell);

  // Thêm hàng vào bảng
  userList.appendChild(row);
}

// Hàm để xóa nội dung của phần tử chatInfo
function clearChatInfo() {
  document.getElementById("chatInfo").innerHTML = "";
}
// Hàm để xóa nội dung của phần tử textchat
function clearTextChat() {
  document.getElementById("textchat").innerHTML = "";
}

function GetMess(userid) {
  const database = getDatabase();
  const databaseRef = ref(database, "messages/" + userid);

  // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
  onChildAdded(databaseRef,(snapshot) => {
      const message = snapshot.val();
      displayMessage(message);
    },
    (error) => {
      console.error("Error getting messages: ", error);
    }
  );
}

function displayMessage(message) {
  const messages = document.getElementById("textchat");
  const li = document.createElement("li");
  li.innerHTML = `
    <fieldset class="border p-2 mx-2 my-2">
        <legend class="w-auto legend-small"><img class="image-avt" src="${message.url}" alt="User Image" border-radius: 100%;"> ${message.name} </legend>
        <br>
        ${message.message}<br><br>
        <p style="margin-bottom: -18px; float: right; background-color: #fff;">${message.time}</p>
    </fieldset>
    <hr>
    `;
  messages.appendChild(li);
}

function AddAllItemsToList(userData) {
  userData.forEach((user) => {
    AddItemToList(user.uid, user.hoten, user.urlavatar, user.userstatus);
  });
}

function GetAllDataOnce() {
  const databaseRef = ref(database);

  get(child(databaseRef, "users"))
    .then((snapshot) => {
      const userData = [];
      snapshot.forEach((childSnapshot) => {
        const uid = childSnapshot.key;
        const userstatus = childSnapshot.val().userstatus;
        const urlavatar = childSnapshot.val().urlavatar;
        const hoten = childSnapshot.val().hoten; // Assuming "hoten" is a direct child of the snapshot
        userData.push({ uid, hoten, urlavatar, userstatus });
      });
      console.log("All user data:", userData);
      AddAllItemsToList(userData);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

GetAllDataOnce();
//Function lấy dữ liệu từ cookies
function getCookie(name) {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop() : "";
}

// Sử dụng hàm để lấy giá trị từ cookies
const uidProfile = getCookie("id_profile");
const filenameProfile = getCookie("filename_profile");
const avatarProfile = getCookie("url_profile");

document.getElementById("sedmess").addEventListener("submit", function (event) {
  event.preventDefault();

  var message = document.getElementById("txtchat").value;
  console.log(message);
  const database = getDatabase(app);
  const messagesRef = ref(database, "messages");
  // Lấy dữ liệu từ localStorage
  const UserID = localStorage.getItem("UserID");

  const userMessagesRef = child(messagesRef, UserID); // Tạo nút con cho từng người dùng
  const newMessageRef = push(userMessagesRef); // Tạo một khóa mới trong nút của người dùng
  const id = newMessageRef.key; // Lấy khóa mới được tạo
  let last_login_time = new Date();
  let formattedDateTime = last_login_time.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  set(newMessageRef, {
    name: "Admin",
    message: message,
    time: formattedDateTime,
    userid: UserID,
    url: avatarProfile,
  })
    .then(() => {
      // alert('Đã gửi tin nhắn thành công!');
      document.getElementById("txtchat").value = "";
    })
    .catch((error) => {
      console.error("Error writing message to database: ", error);
    });
});
function DeleleData() {
  // Xoá dữ liệu từ localStorage sau khi sử dụng xong
  try {
    localStorage.removeItem("UserID");
    console.log("Đã xoá thành công key 'UserID' từ localStorage.");
    const UserID = localStorage.getItem("UserID");
    console.log("URL ảnh từ localStorage:", UserID);
  } catch (error) {
    console.error("Lỗi khi xoá key 'UserID' từ localStorage:", error);
  }
}
