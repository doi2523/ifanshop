// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, ref, child, onValue, get, onChildAdded} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, deleteUser} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
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

var stdNo = 0;
function GetAll() {
  const database = getDatabase();
  const databaseRef = ref(database, "users");

  // Lắng nghe sự kiện child_added để nhận thông báo khi có tin nhắn mới được thêm vào
  onChildAdded(databaseRef,(snapshot) => {
    const getusers = snapshot.val();
    const uid = snapshot.key;
    console.log("All user data:", uid);
    displayUses(getusers, uid);
    },
    (error) => {
      console.error("Error getting users: ", error);
    }
  );
}
function displayUses(getusers, uid) {
  const showusers = document.getElementById("tbody1");
  const tr = document.createElement("tr"); // Thay đổi từ <li> thành <tr> để tạo hàng mới

  // Tạo các ô <td> trong hàng
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");
  const td6 = document.createElement("td");
  const td7 = document.createElement("td");
  const td8 = document.createElement("td");

// Tạo nút xoá
let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Xoá";
// deleteBtn.setAttribute("data-name", getusers.iduser); // Sử dụng email hoặc một trường khác của người dùng
// deleteBtn.addEventListener("click",deleteCurrentUser); // Truyền userId vào hàm deleteCurrentUser
deleteBtn.classList.add("btn", "btn-primary", "btn-sm");



  // Tạo nút sửa
  let editBtn = document.createElement("button");
  editBtn.textContent = "Sửa";
  // editBtn.setAttribute("data-name", userr.uid); // Lưu trữ tên của sản phẩm
  // editBtn.addEventListener("click", editSanPham);
  editBtn.classList.add("btn", "btn-primary", "btn-sm", "mx-2");

        // Create the button
        let showBtn = document.createElement("button");
        showBtn.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
        showBtn.setAttribute("data-name", uid); // Example UID, replace with userr.uid
        showBtn.addEventListener("click", showUser);
        showBtn.classList.add("btn", "btn-primary", "btn-sm");

  // Thiết lập nội dung cho các ô <td>
  td1.textContent = ++stdNo;
  td2.textContent = getusers.username;
  td3.textContent = getusers.hoten;
  td4.textContent = getusers.sdt;
  td5.textContent = getusers.email;
  td6.textContent = getusers.password;
  td7.textContent = getusers.userstatus;
  // td8.textContent = uid;
  // td8.appendChild(deleteBtn);
  // td8.appendChild(editBtn);
  td8.appendChild(showBtn);

  // Thêm các ô <td> vào hàng
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tr.appendChild(td7);
  tr.appendChild(td8);

  showusers.appendChild(tr);
}
GetAll();
        // Function to handle the click event
function showUser(event) {
  const dataName = event.currentTarget.getAttribute('data-name');
  console.log(dataName); // Print the value of data-name attribute
  localStorage.setItem("iduser", dataName);
  if (dataName) {
    AlertGet();
    setTimeout(() => {
      window.location.href = "auth.admin.chitietuser.html";
  }, 3000); // Redirect after 3 seconds
} else {
    console.error("Không có giá trị productId để lưu vào localStorage.");
}
}
function AlertGet(){
  const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
      //   toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "warning",
      title: "Đang lấy thông tin người dùng, chờ chuyển trang!",
      color: "#716add",
    });
} 