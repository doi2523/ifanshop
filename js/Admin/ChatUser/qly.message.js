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
  // Tạo một ô cho hình ảnh
  let imgCell = document.createElement("td");
  imgCell.innerHTML = `<img class="image-avt" src="${urlavatar}" alt=""><br>${hoten}`;
  // Tạo một ô cho UID và Họ tên
  let infoCell = document.createElement("td");
  let statusDotClass =
    userstatus === "online" ? "dot dot-green" : "dot dot-gray";
  infoCell.innerHTML = `${userstatus} <span class="${statusDotClass}"></span> `;
  ///
  let numberCell = document.createElement("td");
  numberCell.innerHTML = `${messageCount}`;
  // Tạo một ô cho nút "Chat"
  let chatCell = document.createElement("td");
  let chatButton = document.createElement("button");
  chatButton.innerHTML = '<i class="fas fa-trash"></i>';
  chatButton.classList.add("btn", "btn-danger", "btn-sm");
  chatButton.addEventListener("click", function () {
    // Xử lý khi nút "Chat" được nhấn
    // Lấy thông tin hình ảnh và tên người dùng
    let imageSrc = urlavatar;
    let userName = hoten;
    let userid = uid;
    // GetAllDataOnce();
    confirmDelete(uid); // Gọi hàm hiển thị cảnh báo xác nhận xoá
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
function GetMess(userid) {
    const database = getDatabase();
    const databaseRef = ref(database, "messages/" + userid);
  
    // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
    onChildAdded(databaseRef,(snapshot) => {
        const message = snapshot.val();
      },
      (error) => {
        console.error("Error getting messages: ", error);
      }
    );
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
function confirmDelete(uid) {
    let confirmation = window.confirm("Bạn có chắc chắn muốn xoá tin nhắn này?");
    if (confirmation) {
      deleteProduct(uid); // Nếu chọn "OK", gọi hàm để xoá sản phẩm
    } else {
      console.log("Người dùng đã hủy bỏ thao tác xoá tin nhắn."); // Nếu chọn "Cancel", không làm gì cả
    }
  }
  
  // Hàm xoá sản phẩm
  function deleteProduct(uid) {
    let productRef = ref(database, "messages/" + uid);
    // Xoá hàng chứa sản phẩm có ID tương ứng
    // const rowToDelete = event.target.closest("tr");
    // rowToDelete.remove();
    remove(productRef)
      .then(() => {
        // Sau khi xoá thành công, cập nhật giao diện người dùng
        alert("Đã xoá tin nhắn");
      })
      .catch((error) => {
        alert("Lỗi khi xoá tin nhắn:", error);
      });
  }