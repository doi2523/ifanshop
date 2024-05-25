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
  remove
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
  databaseURL:"https://user-inifanshop-default-rtdb.asia-southeast1.firebasedatabase.app",
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

var userList = document.getElementById("Manage-list");
function AddItemToList(uid, hoten, urlavatar, userstatus, messageCount) {
  // Tạo một hàng mới trong bảng
  let row = document.createElement("tr");
  // Tạo một ô cho hình ảnh
  let imgCell = document.createElement("td");
  imgCell.innerHTML = `<img class="image-avt" src="${urlavatar}" alt=""><br>${hoten}`;
  // Tạo một ô cho UID và Họ tên
  let infoCell = document.createElement("td");
  let statusDotClass =userstatus === "online" ? "dot dot-green" : "dot dot-gray";
  infoCell.innerHTML = `${userstatus} <span class="${statusDotClass}"></span> `;
  ///
  let numberCell = document.createElement("td");
  numberCell.innerHTML = `${messageCount}`;
  numberCell.id = `number-${uid}`;
  // Tạo một ô cho nút "Chat"
  let chatCell = document.createElement("td");
  let chatButton = document.createElement("button");
  chatButton.innerHTML = '<i class="fas fa-trash"></i> Xoá';
  chatButton.classList.add("btn", "btn-danger", "btn-sm");
  chatButton.addEventListener("click", function () {
    // Xử lý khi nút "Chat" được nhấn
    confirmDelete(uid, numberCell);
  });
  chatCell.appendChild(chatButton);
  // Thêm các ô vào hàng
  row.appendChild(imgCell);
  row.appendChild(infoCell);  
  row.appendChild(numberCell)
  row.appendChild(chatCell);
  // Thêm sự kiện hover và thay đổi con trỏ chuột
  row.addEventListener("mouseover", function() {
    row.style.backgroundColor = "#f0f0f0"; // Thay đổi màu nền khi hover
    row.style.cursor = "pointer"; // Thay đổi con trỏ chuột
  });
  row.addEventListener("mouseout", function() {
    row.style.backgroundColor = ""; // Trở lại màu nền ban đầu khi không hover
    row.style.cursor = "default"; // Trở lại con trỏ chuột ban đầu
  });

  row.addEventListener("click", function () {
    document.getElementById("hienthimanage").innerHTML = "";
    document.getElementById("chatInfo-manage").innerHTML = "";
    // Tạo HTML cho hình ảnh và tên người dùng
    let chatInfoHTML = `<img class="image-avt" src="${urlavatar}" alt="${hoten}"> ${hoten} [${userstatus}] <span class="${statusDotClass}"></span>`;
    // In hình ảnh và tên người dùng ra div chatInfo
    document.getElementById("chatInfo-manage").innerHTML = chatInfoHTML;
    GetMess(uid, numberCell)
  });

  // Thêm hàng vào bảng
  userList.appendChild(row);
}
function GetMess(uid, numberCell) {
    const database = getDatabase();
    const databaseRef = ref(database, "messages/" + uid);
  
    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(databaseRef,(snapshot) => {
        const message = snapshot.val();
        const keymess = snapshot.key;
        displayMessage(message, keymess, uid, numberCell);
      },
      (error) => {
        console.error("Error getting messages: ", error);
      }
    );
}
function displayMessage(message, keymess, uid, numberCell) {
  const messages = document.getElementById('hienthimanage');
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
    <button class="btn btn-danger btn-sm delete-message"><i class="fas fa-trash"></i></button>
    <img src="${message.url}" alt="User Avatar" class="avatar-icon">
    <div class="message-content">${message.message}</div>
    `;
  } //Nếu là role khác sẽ hiển thị bên trái
  else {
    div.classList.add('sent');
    div.innerHTML = `
    <div class="message-content">${message.message}</div>
    <img src="${message.url}" alt="User Avatar" class="avatar-icon">
    <button class="btn btn-danger btn-sm delete-message"><i class="fas fa-trash"></i></button>
    `;
  }
  messages.appendChild(div);

  // Thêm sự kiện click cho nút xoá
  const deleteButton = div.querySelector('.delete-message');
  deleteButton.addEventListener('click', function() {
    // Gọi hàm để xử lý việc xoá tin nhắn
    Swal.fire({
      title: "Are you sure?",
      text: "Tin nhắn này sẽ bị xoá!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Tin nhắn này đã được xoá.",
          icon: "success"
        });
        let productRef = ref(database, "messages/" + uid + "/" + keymess);
        remove(productRef)
          .then(() => {
            // numberCell.innerHTML='0';
            div.remove();
            timeDiv.remove();
            // Trừ đi 1 ở ô numberCell
            let currentCount = parseInt(numberCell.innerHTML);
            if (!isNaN(currentCount)) {
              numberCell.innerHTML = currentCount > 0 ? currentCount - 1 : 0;
            }
          })
          .catch((error) => {
            alert("Lỗi khi xoá tin nhắn:", error);
          });
      }
    });
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
              console.log(messageCount)
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
// Hàm xác nhận xoá sản phẩm
function confirmDelete(uid, numberCell) {
  Swal.fire({
    title: "Are you sure?",
    text: "Bạn sẽ xoá tất cả tin nhắn với người dùng này!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Tất cả tin nhắn với người dùng này đã được xoá.",
        icon: "success"
      });
      deleteProduct(uid, numberCell);
    }
  });
}
  
// Hàm xoá sản phẩm
function deleteProduct(uid, numberCell) {
  let productRef = ref(database, "messages/" + uid);
  remove(productRef)
    .then(() => {
      numberCell.innerHTML='0';
      // alert("Đã xoá tin nhắn");
    })
    .catch((error) => {
      alert("Lỗi khi xoá tin nhắn:", error);
    });
}