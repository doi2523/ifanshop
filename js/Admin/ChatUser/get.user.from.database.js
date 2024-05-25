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
function AddItemToList(uid, hoten, urlavatar, userstatus, messageCount) {
  // Tạo một hàng mới trong bảng
  let row = document.createElement("tr");
  row.id = `user-${uid}`;
  // Tạo một ô cho hình ảnh
  let imgCell = document.createElement("td");
  imgCell.innerHTML = `<img class="image-avt" src="${urlavatar}" alt=""><br>${hoten}`;
  // Tạo một ô cho UID và Họ tên
  let infoCell = document.createElement("td");
  let statusDotClass = userstatus === "online" ? "dot dot-green" : "dot dot-gray";
  infoCell.innerHTML = `${userstatus} <span class="${statusDotClass}"></span> `;
  ///
  let numberCell = document.createElement("td");
  numberCell.innerHTML = `${messageCount}`;
  numberCell.classList.add("number-mess");
  numberCell.id = `message-count-${uid}`;
  // Tạo một ô cho nút "Chat"
  let chatCell = document.createElement("td");
  let chatButton = document.createElement("button");
  chatButton.innerHTML = '<i class="fas fa-comment"></i> Chat now';
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
    let userid = uid;
    // Tạo HTML cho hình ảnh và tên người dùng
    let chatInfoHTML = `<img class="image-avt" src="${imageSrc}" alt="${userName}"> ${userName} [${userstatus}] <span class="${statusDotClass}"></span>`;

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
  row.appendChild(numberCell)
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
  document.getElementById("hienthimessage").innerHTML = "";
}
function GetMess(userid) {
  const database = getDatabase();
  const databaseRef = ref(database, "messages/" + userid);
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
    div.classList.add('received');
    div.innerHTML = `
    <img src="${message.url}" alt="User Avatar" class="avatar-icon">
    <div class="message-content">${message.message}</div>
    `;
  } //Nếu là role khác sẽ hiển thị bên trái
  else {
    div.classList.add('sent');
    div.innerHTML = `
    <div class="message-content">${message.message}</div>
    <img src="${message.url}" alt="User Avatar" class="avatar-icon">
    `;
  }
  messages.appendChild(div);
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

        // Đếm số lượng tin nhắn cho mỗi người dùng
        const messagesRef = ref(database, "messages");
        const userMessagesRef = child(messagesRef, uid); // Tham chiếu tới nút con của mỗi người dùng
        get(userMessagesRef)
          .then((messageSnapshot) => {
            // Sử dụng forEach để lặp qua mỗi tin nhắn và đếm số lượng
            let messageCount = 0;
            messageSnapshot.forEach((childSnapshot) => {
              messageCount++; // Tăng số lượng cho mỗi tin nhắn được lặp qua
            });
            userData.push({ uid, hoten, urlavatar, userstatus, messageCount });
            AddItemToList(uid, hoten, urlavatar, userstatus, messageCount);

          })
          .catch((error) => {
            console.error("Lỗi khi đếm số lượng tin nhắn cho người dùng", uid, ":", error);
          });        
      });
      // AddAllItemsToList(userData);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
} 


GetAllDataOnce();
//Function lấy dữ liệu từ cookies
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
  const TimeLogin = userInfoFromCookie.last_login; //Time đăng nhập
  const TimeLogout = userInfoFromCookie.last_logout; //Time đăng xuất

document.getElementById("send").addEventListener("submit", function (event) {
  event.preventDefault();

  var message = document.getElementById("message-input").value;
  console.log(message);
  const database = getDatabase(app);
  const messagesRef = ref(database, "messages");
  // Lấy dữ liệu từ localStorage
  const UserID = localStorage.getItem("UserID");
  if (!UserID || UserID.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vui lòng chọn người để nhắn tin!",
    });
  return; // Ngắt dòng lệnh nếu UserID không tồn tại hoặc rỗng
  }
  // Kiểm tra xem chọn người dùng để nhắn tin chưa
  var chatInfoElement = document.getElementById("chatInfo");
  if (!chatInfoElement || !chatInfoElement.innerHTML.trim()) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please select a user to chat with!",
    });
    DeleleData();
  } else {

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
    url: URLProfile,
    role: RoleProfile,
  })
  .then(() => {
        // Cập nhật số lượng tin nhắn trong danh sách người dùng
        const messageCountCell = document.getElementById(`message-count-${UserID}`);
        if (messageCountCell) {
          let currentCount = parseInt(messageCountCell.innerHTML, 10);
          messageCountCell.innerHTML = currentCount + 1;
        }
    AlertSuccess();
    document.getElementById("message-input").value = "";
  })
  .catch((error) => {
    console.error("Error writing message to database: ", error);
  });
};
});
} else {
  console.log('Cookies không tồn tại hoặc đã bị xoá?!');
}
function DeleleData() {
  // Xoá dữ liệu từ localStorage sau khi sử dụng xong
  try {
    localStorage.removeItem("UserID");
    // console.log("Đã xoá thành công key 'UserID' từ localStorage.");
    const UserID = localStorage.getItem("UserID");
    // console.log("URL ảnh từ localStorage:", UserID);
  } catch (error) {
    console.error("Lỗi khi xoá key 'UserID' từ localStorage:", error);
  }
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